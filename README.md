# AutoAdvertise Bot

Discord license management bot. Hosted on Railway.

## Commands (admin only)

| Command | Description |
|---|---|
| `/genkey plan duration [quantity] [notes]` | Generate license keys |
| `/listkeys [filter]` | List all keys (filter by status) |
| `/keyinfo key` | View details for a specific key |
| `/revokekey key` | Revoke a key permanently |
| `/resetkey key` | Unlink a key from a user so it can be redeemed again |
| `/extendkey key days` | Add days to an existing key |
| `/deletekey key` | Permanently delete a key from the database |

## Deploy to Railway

1. Push this repo to GitHub
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Select this repo
4. In **Variables**, add:
   - `DISCORD_BOT_TOKEN`
   - `DISCORD_CLIENT_ID`
   - `MONGODB_URI`
   - `ADMIN_DISCORD_IDS` (your Discord user ID)
5. Deploy — the bot will come online automatically

## Local dev

```bash
npm install
cp .env.example .env   # fill in the values
npm run dev
```
