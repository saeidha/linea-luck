# **App Name**: Linea Luck

## Core Features:

- Chance Wheel: A spinning wheel interface that determines the amount of ATB tokens the user can claim, ranging from 1 to 10.
- Eligibility Check: Checks if the user holds Linea tokens to allow them to claim ATB tokens. The contract address in Linea is 0xCD12d603Ec87fB41a5F21EA2e1590470Dbe9F9CB
- Claim Limit: Limits users to 20 claims per day. Resets every 24 hours.
- Token Claim: Interface for users to claim ATB tokens based on the amount decided by the chance wheel using the claim solidity function.
- Wallet Connection: Uses WalletConnect with project key 329e1a5ee4c1257164938ef55efec576 to connect the user's wallet to the app.

## Style Guidelines:

- Primary color: Dark blue (#1A237E) to provide a strong sense of sophistication and trust in the app.
- Background color: Very dark grayish-blue (#121212) for a sleek dark mode interface.
- Accent color: Violet (#7B1FA2) to add visual interest without distracting from main function
- Body and headline font: 'Inter', a grotesque-style sans-serif for a clean, modern feel.
- Use custom, elegant icons related to the ATB token and Linea network, with a futuristic aesthetic.
- Single-page layout with a clear hierarchy. The Chance Wheel should be the focal point, prominently displayed.
- Use smooth, subtle animations for spinning the wheel and displaying claim results.