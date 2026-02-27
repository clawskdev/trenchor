# ⚡ UPLOAD QUICK REFERENCE

## 🎯 3-Step Process to Upload TRENCHOR to Play.fun

### **STEP 1: Deploy to GitHub Pages (2 minutes)**

```bash
git init
git add .
git commit -m "TRENCHOR ready for launch"

# Create repo at github.com/new named "trenchor"
# Or use GitHub Desktop for visual setup

git remote add origin https://github.com/YOUR_USERNAME/trenchor.git
git branch -M main
git push -u origin main

# Enable GitHub Pages in Settings → Pages → main branch
# Wait 1-2 minutes...
# Live at: https://YOUR_USERNAME.github.io/trenchor
```

### **STEP 2: Get Play.fun API Keys (1 minute)**

1. Go to https://play.fun
2. Create free account
3. Dashboard → Settings → API Keys
4. Copy **API Key** and **Secret Key**

### **STEP 3: Run Upload Script (2 minutes)**

```bash
npm run upload-to-playfun

# Enter:
# - API Key (from Play.fun)
# - Secret Key (from Play.fun)
# - Game URL: https://YOUR_USERNAME.github.io/trenchor
# - Done!
```

---

## ✅ You're Live!

After script completes:

✅ Game registered on Play.fun  
✅ Leaderboard active  
✅ Players can access  
✅ GameID issued  
✅ Share: `https://play.fun/game/{GAME_ID}`

---

## 📝 Required Information

Gather before running upload:

```
GitHub Username: [your github username]
Game URL: https://github.com/username/trenchor

From Play.fun Dashboard:
API Key: [your api key]
Secret Key: [your secret key]

Optional:
Twitter: @yourhandle
Discord: discord.gg/yourserver
```

---

## 🔗 Important Links

- **Your Game**: `https://play.fun/game/{GAME_ID}`
- **Play.fun Dashboard**: https://play.fun/dashboard
- **GitHub Repo**: https://github.com/YOUR_USERNAME/trenchor
- **Hosted Game**: https://YOUR_USERNAME.github.io/trenchor

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Game URL not found" | Wait 2-3 min for GitHub Pages, then hard refresh (Ctrl+F5) |
| "Auth failed" | Check API/Secret keys at play.fun/dashboard/settings |
| "GitHub 404" | Enable Pages in repo Settings → Pages section |
| ".env already exists" | Script will reuse saved credentials |

---

## 💾 After Upload

Your credentials are saved in `.env` (not committed to git):

```bash
PLAY_FUN_API_KEY=xxx
PLAY_FUN_SECRET_KEY=yyy
GAME_URL=https://username.github.io/trenchor
```

Keep this secure (already in `.gitignore`)!

---

## 🎮 Verify It Works

After upload:

```bash
# Test local game still works
npm start

# Share your Play.fun game URL
echo "Play at: https://play.fun/game/{YOUR_GAME_ID}"
```

---

## 🚀 You're Ready!

**Next command to run:**
```bash
npm run upload-to-playfun
```

**Then share:** `https://play.fun/game/{GAME_ID}`

---

Made with OpusGameLabs Skills | Ready for Play.fun 🎉
