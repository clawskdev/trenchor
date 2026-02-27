#!/usr/bin/env node

/**
 * TRENCHOR - Interactive Setup & Upload Guide
 * Walks you through uploading TRENCHOR to Play.fun
 */

const readline = require('readline');
const { exec } = require('child_process');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise(resolve => rl.question(prompt, resolve));
}

async function main() {
  console.log('\n🎮 TRENCHOR - Play.fun Upload Setup\n');
  console.log('This will guide you through uploading TRENCHOR to Play.fun\n');

  // Check what's already done
  console.log('📋 Checking setup status...\n');

  const hasGitRepo = fs.existsSync('.git');
  const hasEnv = fs.existsSync('.env');
  
  console.log(`✅ Game files created`);
  console.log(`${hasGitRepo ? '✅' : '⏳'} Git repository initialized`);
  console.log(`${hasEnv ? '✅' : '⏳'} API credentials saved\n`);

  // Ask what step they're on
  console.log('What would you like to do?\n');
  console.log('1. I need to host the game on GitHub Pages first');
  console.log('2. I already have GitHub hosting, need API keys');
  console.log('3. I have everything, upload now!\n');

  const choice = await question('Enter your choice (1-3): ');

  if (choice === '1') {
    await step1GitHubPages();
  } else if (choice === '2') {
    await step2GetCredentials();
  } else if (choice === '3') {
    await step3Upload();
  } else {
    console.log('Invalid choice');
  }

  rl.close();
}

async function step1GitHubPages() {
  console.log('\n📱 Step 1: Host on GitHub Pages\n');
  console.log('Quick setup:\n');

  const hasGit = await question('Do you have Git installed? (y/n): ');
  
  if (hasGit.toLowerCase() !== 'y') {
    console.log('\n❌ Git is required. Download from git-scm.com\n');
    return;
  }

  console.log('\n📝 Follow these steps:\n');
  console.log('1. Create a GitHub account at github.com (free)');
  console.log('2. Create a new repository named "trenchor"');
  console.log('3. Run these commands in this folder:\n');

  console.log('   git init');
  console.log('   git add .');
  console.log('   git commit -m "TRENCHOR game"');
  console.log('   git remote add origin https://github.com/YOUR_USERNAME/trenchor.git');
  console.log('   git branch -M main');
  console.log('   git push -u origin main\n');

  console.log('4. Go to your repo Settings > Pages');
  console.log('5. Select "main" branch as source');
  console.log('6. Wait 1-2 minutes for deployment\n');

  console.log('Your game will be at:');
  console.log('https://YOUR_USERNAME.github.io/trenchor\n');

  const done = await question('Done with GitHub setup? (y/n): ');
  
  if (done.toLowerCase() === 'y') {
    const username = await question('Your GitHub username: ');
    const gameUrl = `https://${username}.github.io/trenchor`;
    
    // Save to temp storage
    console.log(`\n✅ Your game URL: ${gameUrl}`);
    console.log('Next: Get Play.fun API credentials\n');
    
    await step2GetCredentials(gameUrl);
  }
}

async function step2GetCredentials(gameUrl) {
  console.log('\n🔑 Step 2: Get Play.fun API Credentials\n');
  console.log('Follow these steps:\n');

  console.log('1. Visit https://play.fun');
  console.log('2. Click "Creator Dashboard" and sign up (free)');
  console.log('3. Go to Settings > API Keys');
  console.log('4. Copy your API Key and Secret Key\n');

  const hasCredentials = await question('Do you have your API credentials ready? (y/n): ');
  
  if (hasCredentials.toLowerCase() === 'y') {
    await step3Upload(gameUrl);
  } else {
    console.log('\n⏳ Come back when you have them!\n');
  }
}

async function step3Upload(gameUrl) {
  console.log('\n📤 Step 3: Upload to Play.fun\n');

  const apiKey = await question('Enter your Play.fun API Key: ');
  const secretKey = await question('Enter your Play.fun Secret Key: ');
  const url = gameUrl || await question('Enter your game URL (https://...): ');

  console.log('\n⏳ Uploading TRENCHOR to Play.fun...\n');

  // Save credentials
  const env = `PLAY_FUN_API_KEY=${apiKey}\nPLAY_FUN_SECRET_KEY=${secretKey}\nGAME_URL=${url}\n`;
  fs.writeFileSync('.env', env);

  console.log('✅ Credentials saved to .env');
  console.log('✅ Ready to upload!\n');

  // Run actual upload
  console.log('Running upload script...\n');
  
  exec('node upload-to-playfun.js', (error, stdout, stderr) => {
    if (error) {
      console.error('Upload script failed:', error);
      return;
    }
    console.log(stdout);
  });
}

main().catch(console.error);
