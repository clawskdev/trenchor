#!/usr/bin/env node

/**
 * TRENCHOR - Direct Upload to Play.fun
 * Reads .env credentials and uploads game
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');

const API_BASE = 'https://api.opengameprotocol.com';

// Load .env file
function loadEnv() {
  const envFile = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envFile)) {
    console.error('❌ .env file not found');
    process.exit(1);
  }

  const content = fs.readFileSync(envFile, 'utf8');
  const env = {};
  content.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      env[key.trim()] = value.trim();
    }
  });

  return env;
}

// Generate HMAC signature
function generateSignature(secretKey, method, path, timestamp) {
  const dataToSign = [method.toLowerCase(), path.toLowerCase(), timestamp].join('\n');
  return crypto.createHmac('sha256', secretKey).update(dataToSign).digest('hex');
}

// Make API request
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

async function main() {
  try {
    console.log('\n🎮 TRENCHOR - Play.fun Upload\n');
    console.log('=' .repeat(50));

    // Load credentials
    console.log('📝 Loading credentials from .env...');
    const env = loadEnv();

    const apiKey = env.PLAY_FUN_API_KEY;
    const secretKey = env.PLAY_FUN_SECRET_KEY;
    const gameUrl = env.GAME_URL;

    if (!apiKey || !secretKey || !gameUrl) {
      console.error('❌ Missing credentials in .env file');
      process.exit(1);
    }

    console.log('✅ Credentials loaded\n');

    // Test authentication
    console.log('🔐 Testing authentication...');
    try {
      const userResponse = await makeRequest('GET', '/games/me', apiKey, secretKey);
      console.log('✅ Authentication successful!\n');
    } catch (error) {
      console.error('❌ Authentication failed:', error.message);
      process.exit(1);
    }

    // Prepare game data
    const gameData = {
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

    // Display game info
    console.log('📋 Game Details:');
    console.log(`   Name: ${gameData.name}`);
    console.log(`   Description: ${gameData.description.substring(0, 60)}...`);
    console.log(`   URL: ${gameData.gameUrl}`);
    console.log(`   Platform: ${gameData.platform}`);
    console.log(`   Coin Symbol: ${gameData.gameCoinSymbol}\n`);

    // Register game
    console.log('📤 Registering game with Play.fun...');
    const result = await makeRequest('POST', '/games', apiKey, secretKey, gameData);

    if (result.data && result.data.id) {
      console.log('✅ TRENCHOR successfully registered!\n');
      console.log('=' .repeat(50));
      console.log('🎉 Game Live on Play.fun!');
      console.log('=' .repeat(50));
      console.log('');
      console.log('Game ID:', result.data.id);
      console.log('Game URL:', result.data.gameUrl);
      console.log('');
      console.log('🌐 View your game:');
      console.log(`   https://play.fun/game/${result.data.id}`);
      console.log('');
      console.log('📊 Dashboard:');
      console.log('   https://play.fun/dashboard');
      console.log('');
      console.log('🚀 Next steps:');
      console.log('   1. Push to GitHub (if not already done)');
      console.log('   2. Share your Play.fun game link');
      console.log('   3. Monitor leaderboards');
      console.log('');
      console.log('=' .repeat(50) + '\n');

      // Save game ID
      const gameInfo = `GAME_ID=${result.data.id}\nGAME_UUID=${result.data.uuid || result.data.id}\n`;
      fs.appendFileSync('.env', gameInfo);
      console.log('✅ Game ID saved to .env\n');
    } else {
      console.error('❌ Unexpected response:', result);
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
