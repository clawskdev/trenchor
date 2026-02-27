# 🎮 TRENCHOR - Manual Upload to Play.fun

Your TRENCHOR game is ready! Here's how to complete the upload manually.

## ✅ What's Ready

- ✅ Complete game engine
- ✅ Web landing page (index.html)
- ✅ AI opponents
- ✅ All documentation
- ✅ GitHub URL: `https://clawskdev.github.io/trenchor`
- ✅ API credentials: Stored in `.env` file

## 🚀 Manual Upload Steps

### Step 1: Verify GitHub Hosting (Required First!)

Before uploading to Play.fun, you need to host the game on GitHub:

```bash
# 1. Create a new repo on GitHub named "trenchor"
#    Visit: https://github.com/new

# 2. Push your local files:
git init
git add .
git commit -m "TRENCHOR game - ready for launch"
git remote add origin https://github.com/clawskdev/trenchor.git
git branch -M main
git push -u origin main

# 3. Enable GitHub Pages:
#    Go to: https://github.com/clawskdev/trenchor/settings/pages
#    Select: main branch
#    Wait 1-2 minutes for deployment
```

**Test**: Visit `https://clawskdev.github.io/trenchor` - you should see the game landing page

⚠️ **The game must be hosting on GitHub for Play.fun to access it!**

### Step 2: Verify Play.fun Credentials

Your API credentials are stored in `.env`:

```
API Key: 3987d408-6a1e-48e7-b144-12b30afa3e49
Secret Key: 1e2877d6-68c8-4af3-8502-f2b2d19a9f52
Game URL: https://clawskdev.github.io/trenchor
```

⚠️ **Make sure these credentials are valid in your Play.fun dashboard!**

### Step 3: Manual Upload via Play.fun Web Interface

1. Go to https://play.fun/dashboard
2. Click **"Register a Game"** or **"+ New Game"**
3. Fill in the following:

**Game Details:**
- **Name**: TRENCHOR
- **Description**: A strategic trading game where players buy and sell commodities in a volatile market. Manage your portfolio, compete for highest profits, and outsmart AI opponents.
- **Game URL**: https://clawskdev.github.io/trenchor
- **Platform**: Web
- **Game Coin Symbol**: TRENCH (optional)

**Game Settings:**
- **Is HTML Game**: No
- **Iframable**: Yes
- **Max Score Per Session**: 1000
- **Max Sessions Per Day**: 10
- **Max Cumulative Points Per Day**: 10000

4. Submit the form
5. You should get a **Game ID**

### Step 4: Verify Your Game is Live

After registration, you'll have a Game ID. Your game will be live at:

```
https://play.fun/game/{GAME_ID}
```

## 🎮 Testing

Once live, test your game:

```bash
# 1. Visit your game on Play.fun
https://play.fun/game/{GAME_ID}

# 2. The game should load from your GitHub Pages hosting
https://clawskdev.github.io/trenchor

# 3. Play a few games
npm start

# 4. Verify it works
npm run ai-demo
```

## 📝 Alternative: API Upload

If you want to try the API again, make sure:

1. Your API credentials are activated in Play.fun dashboard
2. Your account has "Creator" or "Game Developer" role
3. You're not rate-limited

Then run:
```bash
node upload-direct.js
```

## 🔐 Security Notes

Your `.env` file contains:
- ❌ **Never commit to GitHub** ✅ (.gitignore protects it)
- ❌ **Never share publicly**
- ❌ **Keep your Secret Key private**

## ✅ Checklist

Before sharing your game:

- [ ] Created GitHub repo named "trenchor"
- [ ] Pushed all files to GitHub
- [ ] Enabled GitHub Pages
- [ ] Verified GitHub hosting works (can visit https://clawskdev.github.io/trenchor)
- [ ] Created Play.fun account
- [ ] Verified API credentials in dashboard
- [ ] Registered game on Play.fun
- [ ] Have your Game ID
- [ ] Game is live at https://play.fun/game/{GAME_ID}

## 📞 Support

**Having issues?**

1. Check Play.fun dashboard for API key status
2. Verify GitHub Pages is enabled and deployed
3. Clear browser cache (Ctrl+F5)
4. Wait 2-3 minutes for caching to clear

**Play.fun Help**: https://play.fun/support

## 🎉 Next Steps

Once your game is live:

1. Share the Play.fun link: `https://play.fun/game/{GAME_ID}`
2. Monitor leaderboards
3. Collect player feedback
4. Plan updates and features

---

**Your game is ready to launch!** 🚀

All files are prepared. Follow the steps above to get TRENCHOR live on Play.fun.
