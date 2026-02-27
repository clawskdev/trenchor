#!/usr/bin/env node

/**
 * TRENCHOR Play.fun Upload Tool
 * Registers and uploads the TRENCHOR game to Play.fun
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const readline = require('readline');
const https = require('https');

const API_BASE = 'https://api.opengameprotocol.com';

/**
 * Create readline interface for user input
 */
function createInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

/**
 * Prompt user for input
 */
function prompt(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

/**
 * Generate HMAC-SHA256 signature
 */
function generateSignature(secretKey, method, path, timestamp) {
  const dataToSign = [method.toLowerCase(), path.toLowerCase(), timestamp].join('\n');
  return crypto.createHmac('sha256', secretKey).update(dataToSign).digest('hex');
}

/**
 * Make authenticated API request
 */
function makeRequest(method, path, apiKey, secretKey, body = null) {
  return new Promise((resolve, reject) => {
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = generateSignature(secretKey, method, path, timestamp);

    const url = new URL(API_BASE + path);
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `HMAC-SHA256 apiKey=${apiKey}, signature=${signature}, timestamp=${timestamp}`
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(response);
          } else {
            reject(new Error(`API Error (${res.statusCode}): ${response.message || data}`));
          }
        } catch (e) {
          reject(new Error(`Failed to parse response: ${data}`));
        }
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }

    req.end();
  });
}

/**
 * Load environment credentials
 */
function loadCredentials() {
  const envFile = path.join(process.cwd(), '.env');
  
  if (fs.existsSync(envFile)) {
    const content = fs.readFileSync(envFile, 'utf8');
    const credentials = {};
    
    content.split('\n').forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        credentials[key.trim()] = value.trim();
      }
    });

    return {
      apiKey: credentials.PLAY_FUN_API_KEY,
      secretKey: credentials.PLAY_FUN_SECRET_KEY,
      gameUrl: credentials.GAME_URL
    };
  }

  return { apiKey: null, secretKey: null, gameUrl: null };
}

/**
 * Save credentials to .env file
 */
function saveCredentials(apiKey, secretKey, gameUrl) {
  const envFile = path.join(process.cwd(), '.env');
  const content = `PLAY_FUN_API_KEY=${apiKey}\nPLAY_FUN_SECRET_KEY=${secretKey}\nGAME_URL=${gameUrl}\n`;
  fs.writeFileSync(envFile, content);
  console.log('✅ Credentials saved to .env file');
}

/**
 * Read image and convert to base64
 */
function imageToBase64(imagePath) {
  if (!fs.existsSync(imagePath)) {
    console.log('⚠️  No image found at', imagePath);
    return null;
  }

  const data = fs.readFileSync(imagePath);
  const base64 = data.toString('base64');
  const ext = path.extname(imagePath).toLowerCase().replace('.', '');
  const mimeType = {
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'webp': 'image/webp'
  }[ext] || 'image/png';

  return `data:${mimeType};base64,${base64}`;
}

/**
 * Main upload function
 */
async function main() {
  console.log('\n🎮 TRENCHOR - Play.fun Upload Tool\n');
  console.log('This tool will help you register and upload TRENCHOR to Play.fun\n');

  const rl = createInterface();

  try {
    // Load existing credentials
    const existing = loadCredentials();

    // Get API credentials
    console.log('📝 Play.fun API Credentials\n');
    console.log('Visit https://play.fun/dashboard to get your API credentials\n');

    let apiKey = existing.apiKey;
    let secretKey = existing.secretKey;

    if (!apiKey || !secretKey) {
      console.log('❌ No API credentials found. Let\'s set them up:\n');
      apiKey = await prompt(rl, '🔑 Enter your Play.fun API Key: ');
      secretKey = await prompt(rl, '🔑 Enter your Play.fun Secret Key: ');
    } else {
      console.log('✅ Using existing credentials from .env\n');
      const useExisting = await prompt(rl, 'Use these credentials? (y/n): ');
      if (useExisting.toLowerCase() === 'n') {
        apiKey = await prompt(rl, '🔑 Enter your Play.fun API Key: ');
        secretKey = await prompt(rl, '🔑 Enter your Play.fun Secret Key: ');
      }
    }

    // Test authentication
    console.log('\n🔐 Testing authentication...');
    try {
      const userResponse = await makeRequest('GET', '/games/me', apiKey, secretKey);
      console.log('✅ Authentication successful!\n');
    } catch (error) {
      console.error('❌ Authentication failed:', error.message);
      console.log('Please check your API credentials and try again.\n');
      rl.close();
      return;
    }

    // Get game URL
    let gameUrl = existing.gameUrl;
    if (!gameUrl) {
      console.log('🌐 Game URL\n');
      console.log('You can host your game on GitHub Pages or any other platform.\n');
      gameUrl = await prompt(rl, 'Enter the URL where TRENCHOR is hosted: ');
    }

    // Game details
    const gameConfig = {
      name: 'TRENCHOR',
      description: 'A strategic trading game where players buy and sell commodities in a volatile market. Manage your portfolio, compete for highest profits, and outsmart AI opponents.',
      gameUrl: gameUrl,
      platform: 'web',
      gameCoinSymbol: 'TRENCH',
      isHTMLGame: false,
      iframable: true,
      maxScorePerSession: 1000,
      maxSessionsPerDay: 10,
      maxCumulativePointsPerDay: 10000
    };

    // Try to load game image
    const imagePaths = [
      path.join(process.cwd(), 'logo.png'),
      path.join(process.cwd(), 'logo.jpg'),
      path.join(process.cwd(), 'game-icon.png')
    ];

    for (const imagePath of imagePaths) {
      if (fs.existsSync(imagePath)) {
        const base64Image = imageToBase64(imagePath);
        if (base64Image) {
          gameConfig.base64Image = base64Image;
          console.log('✅ Found game image:', imagePath, '\n');
        }
        break;
      }
    }

    // Social media
    const hasTwitter = await prompt(rl, '\nDo you have a Twitter account? (y/n): ');
    if (hasTwitter.toLowerCase() === 'y') {
      gameConfig.twitter = await prompt(rl, 'Twitter handle (without @): ');
    }

    const hasDiscord = await prompt(rl, 'Do you have a Discord server? (y/n): ');
    if (hasDiscord.toLowerCase() === 'y') {
      gameConfig.discord = await prompt(rl, 'Discord invite link: ');
    }

    // Display summary
    console.log('\n📋 Game Registration Summary\n');
    console.log('Name:', gameConfig.name);
    console.log('Description:', gameConfig.description);
    console.log('URL:', gameConfig.gameUrl);
    console.log('Platform:', gameConfig.platform);
    console.log('Game Coin Symbol:', gameConfig.gameCoinSymbol);
    if (gameConfig.twitter) console.log('Twitter:', gameConfig.twitter);
    if (gameConfig.discord) console.log('Discord:', gameConfig.discord);
    console.log('');

    // Confirm upload
    const confirmed = await prompt(rl, 'Proceed with registration? (y/n): ');

    if (confirmed.toLowerCase() !== 'y') {
      console.log('\n❌ Upload cancelled\n');
      rl.close();
      return;
    }

    // Upload game
    console.log('\n📤 Uploading game to Play.fun...\n');

    try {
      const response = await makeRequest('POST', '/games', apiKey, secretKey, gameConfig);

      if (response.data && response.data.id) {
        console.log('✅ TRENCHOR successfully registered!\n');
        console.log('Game ID:', response.data.id);
        console.log('Game URL:', response.data.gameUrl);
        console.log('\n🎉 Your game is now live on Play.fun!\n');
        console.log('View your game: https://play.fun/game/' + response.data.id);
        console.log('Dashboard: https://play.fun/dashboard\n');

        // Save credentials
        saveCredentials(apiKey, secretKey, gameUrl);
      } else {
        console.error('❌ Unexpected response:', response);
      }
    } catch (error) {
      console.error('❌ Upload failed:', error.message);
    }

  } finally {
    rl.close();
  }
}

// Run if executed directly
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { generateSignature, makeRequest };
