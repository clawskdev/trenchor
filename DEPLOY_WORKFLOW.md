# 📤 Complete Upload & Deploy Workflow

End-to-end guide for launching TRENCHOR to the world via Play.fun.

## 🎯 Overview

```
1. Prepare Game Files ✅ (Done!)
   ↓
2. Deploy to GitHub Pages
   ↓
3. Register with Play.fun
   ↓
4. Submit to Leaderboard
   ↓
5. 🎉 Live & Playable!
```

## Phase 1: Prepare Game Files ✅

Already completed! You have:

- ✅ Core game engine (`trenchor.js`)
- ✅ AI opponents (`ai-opponent.js`)
- ✅ Web landing page (`index.html`)
- ✅ Documentation and config
- ✅ `.gitignore` for security
- ✅ Upload script ready to use

## Phase 2: Deploy to GitHub Pages

### Option A: Using Git (Recommended)

```bash
# Open terminal in trenchor directory
cd ~/Documents/test

# Initialize git repo
git init

# Add all files
git add .

# First commit
git commit -m "Initial TRENCHOR game release"

# Go to github.com/new and create 'trenchor' repo
# Then run (replace USERNAME with your GitHub username):
git remote add origin https://github.com/USERNAME/trenchor.git
git branch -M main
git push -u origin main
```

### Option B: Using GitHub Desktop (Visual)

1. Download [GitHub Desktop](https://desktop.github.com)
2. Click "Create a New Repository"
3. Select `~/Documents/test` as path
4. Name it "trenchor"
5. Click "Publish repository"
6. Make it public
7. Done! It's live on GitHub

### Option C: Using GitHub Web Upload

1. Create repo at [github.com/new](https://github.com/new)
2. Click "uploading an existing file"
3. Drag and drop all project files
4. Commit to main branch
5. Your repository is created!

### Enable GitHub Pages

After pushing to GitHub:

1. Go to your repo settings
2. Navigate to **Pages** section
3. Select `main` branch as source
4. Save
5. Visit `https://USERNAME.github.io/trenchor`

⏳ **Wait 1-2 minutes** for deployment to complete

## Phase 3: Register with Play.fun

Once your game is live at GitHub Pages:

```bash
# Run the upload tool
npm run upload-to-playfun
```

### What You'll Need

- ✅ Play.fun API Key (from dashboard)
- ✅ Play.fun Secret Key (from dashboard)
- ✅ Game URL: `https://USERNAME.github.io/trenchor`
- ✅ Optional: Twitter, Discord, Telegram handles

### Sign Up for Play.fun (Free)

1. Visit [play.fun](https://play.fun)
2. Click "Creator Dashboard"
3. Sign up with email or wallet
4. Go to Settings → API Keys
5. Copy your API Key and Secret Key
6. Keep these safe! Never share the Secret Key

### Run Upload Script

```bash
npm run upload-to-playfun

# Follow the prompts:
# 1. Enter API Key
# 2. Enter Secret Key
# 3. Verify game URL
# 4. Add social media (optional)
# 5. Confirm and upload
```

### Success! 🎉

After successful upload:

- ✅ Game is registered on Play.fun
- ✅ Game ID issued (save this!)
- ✅ Live on Play.fun leaderboards
- ✅ Accessible at `play.fun/game/{gameId}`

## Phase 4: Integrate Leaderboards

Connect your game to Play.fun for live scoring:

### Browser Integration

Add to your game's HTML or JavaScript:

```javascript
// Include Play.fun Browser SDK
<script src="https://sdk.play.fun/browser.js"></script>

<script>
  const playfun = new PlayFun({
    gameId: 'YOUR_GAME_ID',
    apiKey: 'YOUR_API_KEY'
  });

  // Submit player score
  playfun.submitScore(playerId, score);

  // Get leaderboard
  playfun.getLeaderboard().then(scores => {
    console.log(scores);
  });
</script>
```

### Launch Your PlayCoin Token (Optional)

Create a cryptocurrency token for game rewards:

```bash
npm run upload-to-playfun

# During upload, you can:
# 1. Register game
# 2. Launch PlayCoin token
# 3. Set up token distribution
```

## Phase 5: Promote & Share

### Social Media

- 🐦 **Twitter**: Share link to `play.fun/game/{gameId}`
- 💬 **Discord**: Post in gaming communities
- 📢 **Telegram**: Share with crypto gaming groups

### Example Tweet

```
🎮 TRENCHOR is LIVE on Play.fun! 

Trade commodities, manage your portfolio, 
compete with AI opponents and earn rewards.

Play now: play.fun/trenchor

#Gaming #Blockchain #TRENCH
```

### Useful Links to Share

- Game Page: `https://play.fun/game/{gameId}`
- GitHub Repo: `https://github.com/{USERNAME}/trenchor`
- Play Directly: `https://USERNAME.github.io/trenchor`

## Phase 6: Troubleshooting

### "Game URL not accessible"

```bash
# Test your GitHub Pages URL in browser
https://USERNAME.github.io/trenchor

# If 404, wait 2-3 minutes for deployment
# If still broken, check:
# 1. Verify index.html exists in repo
# 2. Check Settings → Pages is enabled
# 3. Verify main branch is selected
```

### "Authentication failed to Play.fun"

```bash
# Check credentials at:
https://play.fun/dashboard → Settings → API Keys

# Verify:
1. API Key is not empty
2. Secret Key is correct
3. No extra spaces in either key
4. Keys are from same Play.fun account
```

### "Game won't submit scores to Play.fun"

- ✅ Check gameId is correct
- ✅ Verify API authentication works
- ✅ Ensure game URL is in Play.fun allowed list
- ✅ Check CORS settings on your server

### GitHub Pages Shows Old Version

```bash
# Force refresh browser cache
Ctrl + F5 (Windows/Linux)
Cmd + Shift + R (Mac)

# Or clear cache in DevTools Settings
```

## Command Reference

```bash
# Start game locally
npm start

# Play vs AI
npm run ai-demo

# See examples
npm run examples

# Upload to Play.fun
npm run upload-to-playfun

# Test game
npm test
```

## Checklist

Before going public, verify:

- ✅ Game runs locally (`npm start`)
- ✅ AI mode works (`npm run ai-demo`)
- ✅ GitHub repo created and pushed
- ✅ GitHub Pages enabled and deployed
- ✅ Can visit `https://USERNAME.github.io/trenchor`
- ✅ Play.fun account created
- ✅ API credentials obtained
- ✅ Game registered on Play.fun
- ✅ Can view at `play.fun/game/{gameId}`

## File Locations

Important files for deployment:

| File | Purpose |
|------|---------|
| `index.html` | Web landing page |
| `trenchor.js` | Game engine |
| `package.json` | Project metadata |
| `README.md` | Documentation |
| `.env` | Your API credentials (gitignored) |
| `.gitignore` | What not to commit |

## Security Notes

🔒 **Keep Safe:**
- Never commit `.env` file
- Never share Secret Key publicly
- Use different keys for dev/prod
- Rotate keys periodically

✅ **GitHub Practices:**
- Use `.gitignore` to exclude secrets
- Review before committing
- Use personal access tokens for HTTPS
- Enable 2FA on GitHub account

## What's Next?

After launch:

1. 📊 Monitor player engagement on Play.fun dashboard
2. 🔄 Update game with new features
3. 💬 Engage with player community
4. 🎯 Create tournaments or events
5. 🚀 Launch marketing campaigns

## Support Resources

- 📚 [Play.fun Documentation](https://play.fun/docs)
- 🐙 [GitHub Pages Help](https://pages.github.com)
- 🎮 [Local TRENCHOR Docs](README.md)
- 🚀 [GitHub Pages Deployment Guide](GITHUB_PAGES_DEPLOY.md)
- 📤 [Play.fun Upload Guide](PLAYFUN_UPLOAD.md)

---

## 🚀 Ready to Launch?

**Summary of next steps:**

```bash
# 1. Push to GitHub (choose option A, B, or C above)
git push -u origin main

# 2. Wait for GitHub Pages deployment (1-2 min)

# 3. Verify GitHub Pages works
open https://USERNAME.github.io/trenchor

# 4. Get Play.fun API credentials
# Visit: https://play.fun/dashboard → Settings → API Keys

# 5. Run upload script
npm run upload-to-playfun

# 6. Share your game!
# Tweet/announce: https://play.fun/game/{gameId}
```

**Congratulations! TRENCHOR is now live!** 🎉
