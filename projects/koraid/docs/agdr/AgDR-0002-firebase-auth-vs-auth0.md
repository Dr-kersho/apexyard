# Auth Provider: Firebase Auth vs Auth0

> In the context of the KoraID MVP auth layer, facing a choice between Auth0 and Firebase Auth for phone OTP + social login, I decided to use Firebase Auth to achieve truly free phone OTP at launch scale, accepting tighter coupling to the Google/Firebase ecosystem.

## Context

KoraID requires phone OTP as the primary signup method (Egyptian users are phone-first), Google OAuth as secondary, an age gate at signup (under-13 → parent flow), and zero auth cost on the free tier.

The PRD listed Auth0. The Head of Engineering flagged a cost trap: Auth0 phone OTP requires Twilio at $0.05–0.09/SMS. At 500 signups, that's $25–45 in auth costs — breaking the "$22 total MVP cost" premise.

## Options Considered

| Option | Pros | Cons |
|--------|------|------|
| **Firebase Auth** | Phone OTP ~$0.01–0.02/SMS (Egypt); native FCM integration; Google OAuth built-in; no MAU cap on Spark plan | Google ecosystem coupling; firebase-admin SDK on Lambda |
| Auth0 | Polished DX; strong RBAC | Phone OTP via Twilio ($0.05–0.09/SMS); free tier caps at 7,500 MAU |
| Supabase Auth | Postgres-native; open source | Free tier pauses after 1 week inactivity; phone OTP still Twilio |
| AWS Cognito | Native AWS; free tier 50K MAU; SNS SMS $0.00645/SMS | Complex DX; painful phone OTP flow on mobile PWA |
| Self-hosted (NextAuth/Keycloak) | Full control | Operational burden; Twilio still needed for SMS |

## Decision

Chosen: **Firebase Auth**, because:
1. Phone OTP is ~5× cheaper than Auth0+Twilio at every volume
2. FCM already in stack — one SDK (`firebase/app`, `firebase/auth`, `firebase/messaging`) instead of two vendors
3. Google OAuth is first-class — zero extra configuration
4. No MAU cap on Spark free plan
5. Age gate is application logic, not auth-provider logic — both handle it equally

## Implementation Notes

### Phone OTP (PWA)
```javascript
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth'
const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', { size: 'invisible' })
const result = await signInWithPhoneNumber(auth, '+20' + localNumber, verifier)
const credential = await result.confirm(otpCode)
const idToken = await credential.user.getIdToken()
// Send idToken to Lambda
```

### Lambda token verification
```javascript
import { getAuth } from 'firebase-admin/auth'
const decoded = await getAuth().verifyIdToken(idToken)
// decoded.uid → PLAYER#<uid> in DynamoDB
```

### Age gate
Age is self-declared at profile creation. If age < 13: prompt for parent phone, create parent Firebase account (phone OTP), link child UID to parent UID in DynamoDB.

## Cost Model

| Volume | Firebase Auth (~$0.015/SMS Egypt) | Auth0 + Twilio (~$0.07/SMS) |
|--------|------|------|
| 500 signups | ~$7.50 | ~$35 |
| 5,000 signups | ~$75 | ~$350 |
| 25,000 signups | ~$375 | ~$1,750 |

## Consequences

- PRD updated: "Auth0" → "Firebase Auth" throughout
- Lambda functions use `firebase-admin` for JWT verification (one middleware module)
- Firebase project must be created and phone provider enabled before Week 1
- RecaptchaVerifier requires invisible reCAPTCHA container in PWA
- DynamoDB PK uses Firebase UID: `PLAYER#<firebase_uid>`

## Artifacts

- PRD: `projects/koraid/prd-mvp.md` — update Auth0 → Firebase Auth
- Related: AgDR-0001 (DynamoDB uses Firebase UID as PK)
