# 🚀 Upload TRENCHOR to Play.fun

Complete guide to registering and uploading your TRENCHOR game to Play.fun.

## Prerequisites

1. **Play.fun Account**: Sign up at [https://play.fun](https://play.fun)
2. **API Credentials**: Get from your Play.fun Creator Dashboard
3. **Hosted Game**: Deploy to GitHub Pages, Vercel, Netlify, or similar
4. **Node.js**: v14+ installed

## Step 1: Get API Credentials

1. Visit [https://play.fun/dashboard](https://play.fun/dashboard)
2. Go to **Settings > API Keys** (or Creator Credentials)
3. Copy your:
   - **API Key** (your user ID)
   - **Secret Key** (keep this private!)

## Step 2: Deploy Your Game

### Option A: GitHub Pages (Free!)

1. Create a GitHub repository (if you don't have one)
2. Push the TRENCHOR game files
3. Enable GitHub Pages in repository settings
4. Your game URL: `https://yourusername.github.io/trenchor`

### Option B: Other Hosting Platforms

- **Vercel**: Deploy directly from GitHub (very easy)
- **Netlify**: Free hosting with GitHub integration
- **Firebase Hosting**: Google's free hosting solution
- **Custom Server**: Deploy anywhere you have hosting

### Option C: Local Testing

For local development, use a simple HTTP server:

```bash
npm install -g http-server
http-server -p 8000
# Game available at http://localhost:8000
```

## Step 3: Create a Game Icon (Optional)

Place a game logo/icon in your project directory:

```bash
# Accepted formats: PNG, JPG, WebP
# Recommended: 512x512 pixels
# Filename: logo.png or logo.jpg
```

The upload script will automatically find and use this image.

## Step 4: Run Upload Script

```bash
npm run upload-to-playfun
```

This will:
1. ✅ Prompt for your API credentials
2. ✅ Test authentication with Play.fun
3. ✅ Collect game details
4. ✅ Upload game information
5. ✅ Register game on platform
6. ✅ Save credentials for future uploads

### Interactive Prompts

When you run the upload script, you'll be asked:

- **API Key**: Your Play.fun API Key
- **Secret Key**: Your Play.fun Secret Key  
- **Game URL**: Where players can access TRENCHOR
- **Twitter**: (Optional) Your Twitter handle
- **Discord**: (Optional) Your Discord invite link

### Credentials Security

Your credentials are saved in `.env` file (git-ignored for security):

```bash
PLAY_FUN_API_KEY=xxx
PLAY_FUN_SECRET_KEY=yyy
GAME_URL=https://example.com/trenchor
```

⚠️ **Never commit `.env` to GitHub!** It's in `.gitignore` by default.

## Step 5: Verify Upload

After successful registration:

1. ✅ You'll see your **Game ID**
2. ✅ Your game is live on Play.fun
3. ✅ Players can find and play it
4. ✅ You can manage it from Dashboard

**View your game**: `https://play.fun/game/{gameId}`

## Advanced: Update Game Details

To update your game information later:

```javascript
const { makeRequest } = require('./upload-to-playfun');

const updated = {
  name: 'TRENCHOR',
  description: 'Updated description...',
  gameCoinSymbol: 'TRENCH'
};

// Update your game
await makeRequest('POST', '/games/update/YOUR_GAME_ID', apiKey, secretKey, updated);
```

## Advanced: Submit Points & Leaderboard

### Save Player Points

```javascript
const result = await makeRequest('POST', '/play/dev/batch-save-points', apiKey, secretKey, {
  gameApiKey: 'your-game-uuid',
  points: [
    { playerId: 'player1', points: '1000' },
    { playerId: 'player2', points: '950' }
  ]
});
```

### Get Player Points

```javascript
const points = await makeRequest(
  'GET',
  '/play/dev/points/YOUR_GAME_ID/PLAYER_ID',
  apiKey,
  secretKey
);
```

### Get Leaderboard

```javascript
const leaderboard = await makeRequest(
  'GET',
  '/play/dev/leaderboard/YOUR_GAME_ID',
  apiKey,
  secretKey
);
```

## Launch a PlayCoin Token (Optional)

Launch your own cryptocurrency token for TRENCHOR rewards:

```javascript
const result = await makeRequest('POST', '/token-launcher/launch', apiKey, secretKey, {
  gameId: 'YOUR_GAME_UUID',
  emissionDays: 7,
  gameCoinSymbol: 'TRENCH',
  buyAmount: '1000000000' // in lamports
});
```

## Troubleshooting

### "Authentication failed"
- ❌ Check API Key and Secret Key are correct
- ❌ Verify they're from the correct Play.fun account
- ❌ Make sure not to add extra spaces

### "Game URL not accessible"
- ❌ Test the URL in your browser first
- ❌ Verify CORS is properly configured
- ❌ Check DNS propagation (wait 24h if just deployed)

### "Image too large"
- ❌ Compress your logo before uploading
- ❌ Use PNG for best compression
- ❌ Keep dimensions under 2MB

### ".env file already exists"
- ✅ Script will reuse existing credentials
- ✅ Choose to update if needed
- ✅ Delete `.env` to reset

## Next Steps

1. **Add Points System**: Integrate with Play.fun API to submit player scores
2. **Launch Token**: Create your own cryptocurrency token for rewards
3. **Analytics**: Monitor player engagement and rankings
4. **Social**: Promote on Twitter, Discord, and Telegram
5. **Updates**: Push new features and balance changes

## API Reference

Complete API documentation at `.agents/skills/playdotfun/api/reference.md`

### Key Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/games` | POST | Register new game |
| `/games/:id` | GET | Get game details |
| `/games/me` | GET | List your games |
| `/play/dev/batch-save-points` | POST | Submit player points |
| `/games/:id/leaderboard` | GET | Get daily leaderboard |

## Resources

- 📚 [Play.fun Documentation](https://play.fun/docs)
- 🎮 [Game Dashboard](https://play.fun/dashboard)
- 💬 [Discord Community](https://discord.gg/playfun)
- 🐦 [Twitter](https://twitter.com/playfun)

## Support

Need help?

1. Check [Play.fun FAQ](https://play.fun/faq)
2. Visit [Discord Support](https://discord.gg/playfun)
3. Email support: support@play.fun

---

**Ready to share TRENCHOR?** Run `npm run upload-to-playfun` now!
