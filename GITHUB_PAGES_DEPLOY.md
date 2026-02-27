# 🚀 Deploy TRENCHOR to GitHub Pages

Quick guide to deploy TRENCHOR for free using GitHub Pages.

## Why GitHub Pages?

✅ **Free hosting** - No credit card required  
✅ **Easy deployment** - Push to GitHub and it's live  
✅ **Custom domain** - Use your own domain if you want  
✅ **HTTPS by default** - Secure connection  
✅ **Perfect for games** - Fast CDN worldwide  

## Prerequisites

- GitHub account (free at [github.com](https://github.com))
- Git installed on your computer
- TRENCHOR game files

## Step-by-Step Deployment

### 1. Create GitHub Repository

```bash
cd ~/Documents/test

# Initialize git
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial TRENCHOR game commit"
```

### 2. Create Repository on GitHub

1. Go to [github.com/new](https://github.com/new)
2. Create repository named `trenchor` (or any name you want)
3. **Do NOT initialize with README** (we already have one)
4. Click "Create repository"

### 3. Connect Local to GitHub

```bash
# Add remote (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/trenchor.git

# Rename branch to main (GitHub's default)
git branch -M main

# Push to GitHub
git push -u origin main
```

After this, your code is on GitHub!

### 4. Enable GitHub Pages

1. Go to your repository: `github.com/USERNAME/trenchor`
2. Click **Settings** → **Pages**
3. Under "Source", select:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
4. Click **Save**

Your site will be live at: `https://USERNAME.github.io/trenchor`

(Wait 1-2 minutes for GitHub to deploy)

### 5. Verify Deployment

1. Visit `https://USERNAME.github.io/trenchor`
2. You should see the TRENCHOR landing page
3. If not, wait a few minutes and refresh

## File Structure for GitHub Pages

Your project should look like:

```
trenchor/
├── index.html               # Landing page (required!)
├── trenchor.js              # Game engine
├── ai-opponent.js           # AI opponents
├── examples.js              # Examples
├── README.md                # Documentation
├── package.json             # Project info
├── trenchor-config.json     # Game config
└── ... other files
```

The `index.html` file is what GitHub Pages serves at your domain root.

## Using Your Own Domain

If you have a custom domain, you can use it:

1. In **Settings → Pages**
2. Add your custom domain in "Custom domain" field
3. Follow the DNS instructions provided
4. Update `CNAME` file in your repo (GitHub does this for you)

Example: Play TRENCHOR at `trenchor.yourdomain.com`

## Continuous Updates

After setup, updates are easy:

```bash
# Make changes to your game
# ... edit files ...

# Commit and push
git add .
git commit -m "Feature: Add new trading strategy"
git push

# Live in seconds!
```

## GitHub Pages Limitations

✅ **Works great for:**
- Static sites (HTML, CSS, JS)
- Client-side only games
- Documentation sites
- Portfolio pages

⚠️ **Doesn't support:**
- Server-side code (Node.js, Python, etc.)
- Databases
- Live player data persistence
- Custom APIs

For TRENCHOR, we'll keep leaderboards in browser localStorage or connect to Play.fun API.

## Making Game Interactive on Web

To make TRENCHOR playable in the browser, create a web version:

```html
<!DOCTYPE html>
<html>
<head>
    <title>TRENCHOR Game</title>
    <style>/* ... styling ... */</style>
</head>
<body>
    <div id="app"></div>
    
    <script src="trenchor.js"></script>
    <script>
        // Initialize game in browser
        const game = new Trenchor();
        game.addPlayer('You', 10000);
        // ... etc
    </script>
</body>
</html>
```

## Advanced: GitHub Actions

Automate deployment with GitHub Actions:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .
```

## Troubleshooting

### Site shows 404
- ⏳ Wait 2-3 minutes for deployment
- 🔄 Hard refresh (Ctrl+F5)
- ✅ Verify `index.html` exists in repo root
- ✅ Check Pages is enabled in Settings

### CSS/JS not loading
- ✅ Make sure paths are relative (no leading `/`)
- ✅ Use `./file.js` instead of `/file.js`
- ✅ Files must match case exactly (case-sensitive)

### Custom domain not working
- ⏳ Wait 24 hours for DNS propagation
- ✅ Verify DNS settings are correct
- ✅ Check CNAME file exists in repo

### Repository is private
- Private repos can use GitHub Pages
- Go to Settings → Pages → Source
- Select your branch and folder

## Next Steps

1. ✅ Deploy to GitHub Pages (this guide)
2. ✅ Test your live site
3. ✅ Set up Play.fun integration
4. ✅ Submit game to Play.fun registry

## Resources

- 📚 [GitHub Pages Docs](https://pages.github.com)
- 🚀 [GitHub & Git Tutorial](https://docs.github.com)
- 🎮 [TRENCHOR README](README.md)
- 📤 [Play.fun Upload Guide](PLAYFUN_UPLOAD.md)

---

**Your game is now:**
- 🌍 **Live on the web**
- 🚀 **Globally accessible**
- 📱 **Mobile-friendly**
- 🔒 **Secure with HTTPS**

Share your GitHub Pages URL with players!
