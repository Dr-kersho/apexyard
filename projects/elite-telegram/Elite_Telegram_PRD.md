# ELITE TELEGRAM

Product Requirements Document (PRD)

Version 1.0 | May 2026 | Confidential

Founder & CFO: Mazen | Partner: Adam (Youssef)

## 1. Executive Summary

Elite Telegram is a trusted USD-to-EGP currency exchange and remote work community ecosystem built over 3 years, serving Egyptian freelancers and remote workers. Founded and operated solely by Mazen, the platform has processed over $2 million USD in volume across 10,000+ transactions and grown to 5,200 channel followers — entirely through word-of-mouth with zero paid advertising.

This PRD defines the full product system to be built on Cursor, transforming Elite Telegram from a manual operation into a fully automated, AI-powered business operating system.

## 2. Business Portfolio

### 2.1 Elite Telegram Exchange (Core Revenue)

- USD to EGP currency exchange for freelancers via Payoneer, Wise, PayPal, ACH, Mercury
- Settlement via two traders: Superfast (OKX P2P) and Jo (direct EGP disbursement)
- Profit from spread between client rate and actual USDT sell rate on OKX
- Current monthly revenue: ~$1,000 USD — massively undermonetized given volume
- 8,000+ transactions, $2M+ total volume processed to date

### 2.2 Elite Jobs Marketplace (Community Asset)

- Free job posting service for recruiters targeting Egyptian remote workers
- Sources: Facebook groups, LinkedIn, Upwork, Fiverr, direct recruiter outreach
- 100+ agents hired through channel posts to date
- Currently fully free — monetization planned via featured listings and subscriptions

### 2.3 Lead Investors (Partnership with Adam)

- Real estate wholesale lead generation business (equal partnership, word-of-mouth agreement)
- Uses Tod and Logan (US-based agents) for cold calling via their CRM
- Current split: 60% to Tod/Logan on net profit after tax/fees, remainder split with Adam minus cold caller commission
- Restructuring planned: build independent wholesaling operation under Elite brand

### 2.4 Real Estate Wholesaling (Launching This Month)

- Full A-to-Z wholesale operation under Mazen's name
- Hiring acquisition managers and disposition managers on commission-only basis
- Sourcing from Egyptian remote cold caller community on Telegram channel
- Wyoming LLC and Mercury bank account already established
- Adam as Client Relations Manager

### 2.5 Virtual Credit Card Service (Coming Soon)

- New service for existing exchange clients enabling online payments
- Natural upsell to currency exchange client base

### 2.6 Cold Calling Training (Community Service)

- Training sessions of ~25 participants with excellent feedback
- Currently free — monetization opportunity identified

## 3. Product Vision & Goals

### 3.1 Vision Statement

Transform Elite Telegram from a manually operated solo business into a fully automated, AI-powered ecosystem that serves Egypt's remote work community across currency exchange, job placement, real estate, and financial services — generating 1000X current monthly revenue.

### 3.2 Strategic Goals (90 Days)

- Automate 80% of daily client interactions via AI agent
- Populate full CRM with all 5,200+ existing client data
- Launch real estate wholesaling first deal within 30 days
- Reactivate Telegram channel to 2,000+ daily views
- Begin monetizing job posting service
- Go live with virtual credit card offering

## 4. System Architecture

### 4.1 Core Stack

- Frontend/Bot: Telegram Bot API via BotFather
- Automation: Make.com (scenarios connecting Telegram to Airtable)
- CRM: Airtable (client profiles, transactions, pipeline)
- AI Agent: Claude API (Sonnet) with Elite Telegram system prompt
- Rate Data: OKX Public API (live USDT/EGP price feed)
- Development: Cursor IDE
- Banking: Mercury (USD), InstaPay (EGP disbursement)

### 4.2 Data Flow

- Client messages Telegram bot → Make.com triggers → AI agent generates reply → Response sent back
- Transaction data extracted → Airtable record created/updated → Profit calculated automatically
- Telegram chat export (JSON) → AI analysis script → Airtable bulk population
- OKX API → Live rate fetched → Rate calculator updated every 60 seconds

## 5. AI Agent Specifications

### 5.1 Agent Identity

The AI agent acts as Mazen's voice — warm, confident, Franco Arabic speaking, calling clients 'king', using fire and money emojis, and following Elite Telegram's exact transaction flow. It is NOT a generic chatbot.

### 5.2 Core Capabilities

- Answer rate inquiries with live or manual rate
- Guide clients through full transaction flow step by step
- Handle new client onboarding with +0.25 EGP welcome bonus rate
- Manage competitor rate comparisons confidently
- Send delay apologies and transaction confirmations
- Request channel feedback after successful transactions
- Re-engage dormant clients with personalized messages
- Announce rate changes and new services

### 5.3 Business Intelligence

- Aware of all business verticals: exchange, jobs, wholesaling, virtual card, training
- Knows full transaction fee structure: Payoneer flat $4 below $400, 1% above $400
- Understands trader network: Superfast (OKX P2P) and Jo (direct EGP)
- Knows conversion divisor range: 1.008 to 1.010 depending on trader
- Never reveals Superfast, Jo, or internal margin calculations to clients

### 5.4 Escalation Rules

- Escalate to Mazen: transactions above $2,000
- Escalate to Mazen: any payment dispute or missing funds
- Escalate to Mazen: new client with complex questions
- Escalate to Mazen: any situation agent is not 100% confident handling

### 5.5 Key Phrases (Franco Arabic)

- Morning: 'sabah el foll'
- Greeting regular: 'eh el a5bar ya king'
- Asking amount: 'kam el amount?'
- Confirmation received: 'Received / Done'
- EGP sent: 'Done - hayewsalak halan'
- Delay: 'sorry for the delay, halan hayewsalak'
- Rate announcement: 'Current Payoneer rate is X Special offers for Elite family'
- Post-transaction: 'taht amrak anytime ya king — yeshrafna law te3mel comment b ra2yak'
- Winning back dormant client: 'enta za3lan menena fe haga walla eh?'
- Competitor handling: 'enta eh ahsan rate galak fel market? ana wallahy adeek a3la meno'

## 6. CRM Specifications (Airtable)

### 6.1 Client Profile Table

| Feature | Priority | Description |
|---------|----------|-------------|
| Full Name | P0 - Critical | Primary identifier |
| Email Address | P0 - Critical | For future email marketing |
| Birthdate | P1 - High | Birthday marketing and gifts |
| Age | P1 - High | Client segmentation |
| Country | P1 - High | Compliance and targeting |
| InstaPay Phone | P0 - Critical | EGP disbursement destination |
| Agencies Worked With | P1 - High | Professional background |
| Job Position | P1 - High | Income level indicator |
| Typical Transfer Range | P0 - Critical | Volume segmentation |
| Transfer Frequency | P1 - High | Loyalty classification |
| Previous Transfers Count | P1 - High | Relationship depth |
| Using Competitors | P1 - High | Risk and retention flag |
| Willing to Promote | P2 - Medium | Ambassador identification |
| Language Preference | P1 - High | Arabic / English / Franco |
| Communication Style | P2 - Medium | Formal vs casual |
| First Transaction Date | P0 - Critical | Tenure tracking |
| Last Transaction Date | P0 - Critical | Dormancy detection |
| Lifetime Value (EGP) | P0 - Critical | Auto-calculated from transactions |
| Client Tier | P1 - High | VIP / Regular / Occasional / Dormant |

### 6.2 Transaction Table

| Feature | Priority | Description |
|---------|----------|-------------|
| Date & Time | P0 - Critical | Full timestamp |
| Client Name | P0 - Critical | Linked to Client Profile |
| USD Amount Sent | P0 - Critical | Gross client send amount |
| Platform Used | P0 - Critical | Payoneer / Wise / PayPal / ACH |
| Platform Fee Deducted | P0 - Critical | Auto-calc: $4 or 1% |
| Net USD Received | P0 - Critical | After platform fee |
| Trader Used | P0 - Critical | Superfast or Jo |
| Conversion Divisor | P0 - Critical | 1.008 / 1.009 / 1.010 |
| USDT Received | P0 - Critical | Net USD / divisor |
| Settlement Method | P0 - Critical | OKX P2P or Jo direct |
| Client Rate (EGP/$) | P0 - Critical | Rate quoted to client |
| USDT Sell Rate (EGP) | P0 - Critical | Actual OKX sell price |
| EGP Paid to Client | P0 - Critical | USD amount x client rate |
| EGP Received from Sale | P0 - Critical | USDT x sell rate |
| Profit (EGP) | P0 - Critical | Auto-calculated margin |
| Profit Margin % | P0 - Critical | Auto-calculated percentage |
| Transaction Status | P0 - Critical | Pending / Confirmed / Complete |
| End of Day Batch | P1 - High | Superfast or Jo batch settlement |

### 6.3 Client Filters & Segments

- VIP: weekly transfers above $1,000
- High Value: average transfer above $500
- Dormant: no activity in 30 / 60 / 90 days
- New Lead: messaged but never transacted
- Ambassador: willing to promote channel
- Job Seeker: asked for job posts, no exchange transactions
- Favour Seeker: asked for free services without transacting
- Slow Reply Risk: Mazen typically replies after 6+ hours
- Competitor Shopper: comparing rates with others
- Referral Source: brought new clients

## 7. Telegram Bot Specifications

### 7.1 New Client Flow

1. Client starts bot or sends first message
2. Bot greets warmly and offers +0.25 EGP welcome bonus rate
3. Bot asks onboarding questions one at a time with button choices
4. Answers populate Airtable client profile automatically
5. Bot presents current rate and invites first transaction

### 7.2 Onboarding Questions (Button Format)

- What is your full name?
- What country are you based in? Egypt / Other
- What is your job? Cold Caller / VA / Developer / Other
- Which platform do you receive your salary on? Payoneer / Wise / PayPal / Other
- How much do you usually transfer? Under $200 / $200-$500 / $500-$1000 / Above $1000
- How often do you need to exchange? Weekly / Monthly / Occasionally
- Have you used our service before? Yes / No
- Are you working with any other exchange services? Yes / No
- Would you share our channel with your colleagues? Yes / No

### 7.3 Existing Client Broadcast

- Send personalized DM to all 300-400 existing chats manually
- Message: friendly request to update their profile via bot
- Bot captures answers and updates/creates Airtable record

## 8. Telegram Chat Export & Analysis

### 8.1 Export Process

- Desktop: Settings → Advanced → Export Telegram Data
- Format: JSON (all personal chats)
- Include: messages, media, timestamps

### 8.2 AI Analysis Filters

- Bank screenshot detected → mark as confirmed transaction client
- InstaPay number or link found → confirm EGP recipient
- No reply from Mazen detected → flag as unanswered chat
- Reply delay above 6 hours → flag as slow response contact
- Language detected → Arabic / English / Franco Arabic
- Job offer context found → classify as job seeker
- Rate negotiation found → classify as price sensitive
- Competitor mention found → flag for retention follow-up
- Referral language found → flag as referral source

### 8.3 Auto-Population Output

- Each contact auto-classified into CRM segment
- Transaction history reconstructed from screenshot timestamps
- Lifetime value estimated from chat context
- Language preference tagged
- Last contact date recorded

## 9. Live Rate Calculator

- Pulls live USDT/EGP price from OKX public API every 60 seconds
- Manual override: Mazen can set fixed rate anytime
- Calculates client rate, platform fees, USDT received, EGP paid, profit margin
- Supports all platforms: Payoneer, Wise, PayPal, ACH
- Supports both traders: Superfast and Jo
- Supports both divisors: 1.008 to 1.010
- Shows profit in EGP and margin percentage per transaction

## 10. Community Reactivation Strategy

### 10.1 Content Plan (Week 1)

- Day 1: Drop a real job offer — no announcement, pure value
- Day 2: Community poll — what do you need most right now?
- Day 3: Daily rate update with fire emojis
- Day 4: Useful tip for Egyptian remote cold callers
- Day 5: Success story from hired agent (with permission)
- Day 6: Soft tease of virtual credit card and new services
- Day 7: Personal invite to DM for exchange service

### 10.2 Job Marketplace Monetization

- Free posts: maximum 2 per week (community goodwill)
- Featured job post: paid placement for recruiters
- Verified agency listing: monthly subscription
- Priority candidate matching: premium service

## 11. Real Estate Wholesaling Launch Plan

### 11.1 Structure

- Entity: existing Wyoming LLC + Mercury bank account
- Mazen: Operations, Systems, CFO role
- Adam (Youssef): Client Relations Manager — equal partner
- Acquisition Managers: 2 Egyptian cold callers, commission-only
- Disposition Managers: hired as volume grows

### 11.2 30-Day Launch Timeline

- Week 1: Post on Telegram channel recruiting 2 acquisition managers on commission
- Week 2: Set up lead tracking CRM, calling scripts, assignment fee structure
- Week 3: First cold calls begin, Tod and Logan as advisors only
- Week 4: Target first deal submitted to disposition

### 11.3 Commission Structure

- Assignment fee per deal: $5,000 to $20,000 depending on deal size
- Cold caller commission: defined per submitted hot lead
- Adam and Mazen: equal split of net after commissions and fees
- Tod and Logan: advisory role only — no longer taking 60% of net

## 12. 90-Day Product Roadmap

| Feature | Priority | Description |
|---------|----------|-------------|
| Phase 1 — Foundation | Week 1-2 | Airtable CRM setup, Telegram bot creation, Make.com connection, rate calculator live |
| Phase 2 — AI Agent | Week 2-3 | Claude API integration, system prompt deployed, bot handles new client onboarding |
| Phase 3 — Data Migration | Week 3-4 | Telegram JSON export analyzed, existing 300-400 clients imported to CRM |
| Phase 4 — Community | Month 2 | Channel reactivation, daily rate posts, job marketplace monetization begins |
| Phase 5 — Wholesaling | Month 1-2 | Acquisition team hired, first leads generated, first deal target |
| Phase 6 — Virtual Card | Month 2-3 | Virtual credit card service launched to existing client base |
| Phase 7 — Training | Month 3 | Paid cold calling training sessions launched |
| Phase 8 — Scale | Month 3+ | Automate 80% of operations, expand trader network, grow channel to 10K |

## 13. Success Metrics

- Monthly revenue: $1,000 today → $10,000 target in 6 months → $1M long-term vision
- Channel engagement: 500 daily views → 2,000 daily views in 30 days
- CRM coverage: 0% of clients profiled → 100% within 60 days
- AI agent handling: 0% automated today → 80% automated within 30 days
- Transaction volume: maintain 2M+ annual with improved margin capture
- Wholesaling: first deal closed within 30 days
- Job marketplace: first paid listing within 45 days

## 14. Risks & Mitigation

| Risk | Mitigation |
|------|------------|
| Adam partnership undocumented | Formalize with basic written agreement before wholesaling launch |
| Egyptian regulatory environment for currency exchange | Consult local legal advisor |
| Telegram dependency | Build email list as secondary channel |
| Single operator overload | AI agent handles 80% of interactions |
| Rate volatility | Live OKX feed with manual override capability |
| Community trust if bot feels impersonal | Franco Arabic personality, human escalation triggers |

---

Elite Telegram PRD v1.0 | Confidential | May 2026
