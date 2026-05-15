# DynamoDB Single-Table Design for KoraID

> In the context of the KoraID MVP data layer, facing a choice between relational and NoSQL storage, I decided to use a DynamoDB single-table design to achieve zero infrastructure cost at launch scale, accepting the upfront complexity of designing all access patterns before writing code.

## Context

KoraID needs to store: player profiles, drill videos, card tiers, court inventory, slot availability, bookings (with atomic double-booking protection), match board posts, squad memberships, peer ratings, and parent-child account links. The PRD targets free-tier infrastructure until 5K MAU.

Key constraints:
- Must run on AWS free tier at 500–5K MAU
- Slot booking must be atomic — two simultaneous bookings for the same slot must resolve to exactly one success
- Video metadata must be queryable by player and by drill type
- Future scout search requires filtering players by city + tier (Phase 2 GSI)
- Solo founder, 6-week build — no time for RDS migrations mid-build

## Options Considered

| Option | Pros | Cons |
|--------|------|------|
| **DynamoDB single-table** | Free tier, no RDS cost, Lambda-native, atomic conditional writes, scales to 25K MAU at < $50/mo | Complex upfront design; no ad-hoc SQL queries; access-pattern changes require GSI additions |
| DynamoDB multi-table (one per entity) | Simpler mental model | Same complexity as single-table but loses cross-entity query efficiency; still no SQL |
| PostgreSQL / RDS | Familiar SQL, easy joins, easy ad-hoc | Minimum $12–15/mo for RDS instance even at 0 MAU; cold starts without RDS Proxy |
| PlanetScale / Supabase | Free tier, SQL | PlanetScale free tier ended 2024; Supabase free tier pauses after 1 week inactivity |

## Decision

Chosen: **DynamoDB single-table design**, because the access patterns are fully known from the PRD and all required queries map cleanly to PK/SK range patterns without requiring joins. The free tier covers the full launch scale. The atomic conditional write for slot booking is a first-class DynamoDB feature.

---

## Entity Model

### Player Profile
```
PK: PLAYER#<uid>
SK: PROFILE
Attributes: name, age, city, position[], dominantFoot, tier (BRONZE|SILVER|GOLD),
            overallRating, pac, sho, pas, dri, def, phy, cardImageUrl,
            openToTrials, profileVisibility (PUBLIC|PRIVATE), parentId (if < 13)
GSI attrs:  gsi1pk = CITY#<city>, gsi1sk = TIER#<tier>#PLAYER#<uid>
```

### Drill Upload
```
PK: PLAYER#<uid>
SK: DRILL#<tier>#<drillId>
Attributes: videoUrl, s3Key, stat (raw value), recordedAt, courtId (optional),
            recordingContext (BOOKED_SESSION|TRAINING_MODE), status (PROCESSING|READY|FAILED)
```

### Player Session (check-ins)
```
PK: PLAYER#<uid>
SK: SESSION#<ISO-date>#<sessionId>
Attributes: courtId, courtName, checkInType (BOOKING|QR_SCAN), startTime
```

### Peer Rating
```
PK: PLAYER#<uid>   ← the player being rated
SK: RATING#<sessionId>#<raterId>
Attributes: effort, skill, fairPlay (1–5 each), createdAt
```

### Court Profile
```
PK: COURT#<courtId>
SK: PROFILE
Attributes: name, city, surface, hasFloodlights, ownerId, lat, lng, priceRange, rating, qrCode
```

### Court Slot
```
PK: COURT#<courtId>
SK: SLOT#<ISO-date>#<HH:MM>
Attributes: price, status (AVAILABLE|BOOKED|BLOCKED), bookingId, duration
TTL: slotTtl = epoch of slot + 48h
```

### Booking
```
PK: BOOKING#<bookingId>
SK: DETAIL
Attributes: playerId, courtId, slotDate, slotTime, amountEGP,
            status (PENDING_PAYMENT|CONFIRMED|CANCELLED|REFUNDED),
            paymobOrderId, paymobTxId, createdAt
```

### Player Booking Index (reverse lookup)
```
PK: PLAYER#<uid>
SK: BOOKING#<ISO-date>#<bookingId>
Attributes: courtId, courtName, slotTime, status
```

### Open Match Post
```
PK: CITY#<city>
SK: MATCH#<expiresAtEpoch>#<postId>
Attributes: creatorId, courtId, courtName, matchDate, matchTime,
            positionsNeeded[], spotsLeft, skillNote, createdAt
TTL: matchTtl = expiresAtEpoch + 1h
```

### Match Participant
```
PK: MATCH#<postId>
SK: PARTICIPANT#<playerId>
Attributes: status (REQUESTED|ACCEPTED|DECLINED), requestedAt, respondedAt
```

### Squad Profile
```
PK: SQUAD#<squadId>
SK: PROFILE
Attributes: name, city, emoji, createdBy, aggregateRating, memberCount
```

### Squad Member
```
PK: SQUAD#<squadId>
SK: MEMBER#<playerId>
Attributes: joinedAt
```

### Player Squad Index
```
PK: PLAYER#<uid>
SK: SQUAD#<squadId>
Attributes: squadName
```

### Parent Account
```
PK: PARENT#<parentId>
SK: PROFILE
Attributes: name, phone, createdAt
```

### Parent → Child Link
```
PK: PARENT#<parentId>
SK: CHILD#<playerId>
Attributes: childName, linkedAt
```

### Court Owner
```
PK: OWNER#<ownerId>
SK: PROFILE
Attributes: name, phone, courtIds[]
```

---

## GSI Design

### GSI-1: CityTierIndex
- **GSI1PK**: `CITY#<city>` (sparse — only on PLAYER#PROFILE items)
- **GSI1SK**: `TIER#<tier>#PLAYER#<uid>`
- **Use**: Scout search by city + tier (Phase 2)
- **Projected**: name, overallRating, position, openToTrials, cardImageUrl

### GSI-2: CourtOwnerIndex
- **GSI2PK**: `OWNER#<ownerId>` (on COURT#PROFILE items)
- **GSI2SK**: `COURT#<courtId>`
- **Use**: All courts owned by a specific owner (dashboard)

---

## Atomic Booking — Conditional Write

```javascript
// TransactWriteItems — both or neither
[
  {
    Update: {
      Key: { PK: `COURT#${courtId}`, SK: `SLOT#${date}#${time}` },
      UpdateExpression: 'SET #status = :booked, bookingId = :bid',
      ConditionExpression: '#status = :available',
      ExpressionAttributeValues: { ':booked': 'BOOKED', ':available': 'AVAILABLE', ':bid': bookingId }
    }
  },
  {
    Put: {
      Item: { PK: `BOOKING#${bookingId}`, SK: 'DETAIL', ... },
      ConditionExpression: 'attribute_not_exists(PK)'  // idempotency guard
    }
  }
]
// Concurrent second booking hits ConditionalCheckFailed → 409 Conflict
```

---

## Access Pattern Summary

| Pattern | Query |
|---------|-------|
| Get player profile | `GetItem(PLAYER#uid, PROFILE)` |
| All drills for a player | `Query(PK=PLAYER#uid, SK begins_with DRILL#)` |
| Player's bookings | `Query(PK=PLAYER#uid, SK begins_with BOOKING#)` |
| All slots for a court on a date | `Query(PK=COURT#courtId, SK begins_with SLOT#2026-06-15)` |
| Book a slot (atomic) | `TransactWriteItems` (above) |
| Active match posts in a city | `Query(PK=CITY#Alexandria, SK between MATCH#<now_epoch> and MATCH#<+7days_epoch>)` |
| Squad members | `Query(PK=SQUAD#squadId, SK begins_with MEMBER#)` |
| Player's peer ratings | `Query(PK=PLAYER#uid, SK begins_with RATING#)` |
| All courts for an owner | `Query(GSI2, PK=OWNER#ownerId)` |
| GOLD players in city (Phase 2) | `Query(GSI1, PK=CITY#Alexandria, SK begins_with TIER#GOLD)` |

---

## Consequences

- All Lambda functions must use this entity model — no ad-hoc designs mid-build
- New access patterns require GSI additions (15–60 min backfill at launch scale)
- Booking conditional write must be load-tested before soft launch
- Percentile recalibration uses a Scan + batch update (acceptable < 5K items; revisit at 50K)

## Artifacts

- PRD: `projects/koraid/prd-mvp.md`
- Related: AgDR-0002 (auth provider)
