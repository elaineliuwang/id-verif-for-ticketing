# 6.1850 Final Project  - VerifID: ID Verification for Fair Ticketing

The core problem is that anyone can create several accounts or use automated tools to gain an advantage in line on current ticketing platforms. “Fairness” in online queues only really exists in theory. Other industries have solved similar problems of verifying real human participation by linking digital access to verified identity.

Our proposed solution applies this idea to ticketing. We introduce an identity-bounded ticketing system that combines fairness and security through verified individuality. Before entering a ticket sale, users would complete a one-time ID verification step that confirms their identity and enforces a single queue entry and a fixed number of ticket purchases for each verified person. Verified users would still be placed in a randomized queue that is prioritizes above non-verified users, maintaining fairness while preventing bots and duplicate accounts.

**This MVP showcases how VerifID would integrate with Ticketmaster, a popular live event ticketing site.**


## Tech Stack

- Next.js (App Router) + React
- TypeScript + Tailwind CSS

to implement: 
- hashlib for storing data privately
- numpy for queue behavior, currently mocking with framer motion

## Launching the App with Yarn

```bash
yarn install
yarn dev
```

The app runs on `http://localhost:3000` by default. Build with `yarn build` and serve with `yarn start`.

### Alternate Package Managers

The project was originally bootstrapped with pnpm, but Yarn (or npm) works fine:

```bash
npm install
npm run dev
```

## App Walkthrough

1. Landing page shows Ticketmaster surfaces and explains how VerifID plugs in.
2. `/verify` simulates the three-step ID process and issues a mock token.
3. `/events` lists high-demand drops with priority queue messaging.
4. `/queue` animates a Ticketmaster line where verified fans advance faster.
5. `/purchase` enforces equitable ticket caps and confirms success.
6. `/account` shows the user profile, VerifID badge, and reset control.
