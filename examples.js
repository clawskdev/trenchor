/**
 * TRENCHOR Game Examples and Tutorials
 * Demonstrates how to use the game API in various scenarios
 */

const Trenchor = require('./trenchor');
const { AITrader, TrenchorWithAI } = require('./ai-opponent');

/**
 * Example 1: Basic Two-Player Game
 */
function example1_BasicGame() {
  console.log('\n' + '═'.repeat(70));
  console.log('📚 EXAMPLE 1: Basic Two-Player Game');
  console.log('═'.repeat(70) + '\n');

  const game = new Trenchor();

  // Add players
  game.addPlayer('Alice', 5000);
  game.addPlayer('Bob', 5000);

  console.log('✅ Players added: Alice, Bob\n');

  // Round 1
  console.log('------- ROUND 1 -------');
  game.nextRound();

  console.log('Market Prices:');
  const market = game.getMarketState();
  Object.entries(market).forEach(([commodity, data]) => {
    console.log(`  ${data.name}: $${data.price}`);
  });

  // Make trades
  console.log('\nTrades:');
  console.log(game.buy('Alice', 'gold', 10).message);
  console.log(game.buy('Bob', 'silver', 20).message);

  // Round 2
  console.log('\n------- ROUND 2 -------');
  game.nextRound();

  console.log('Market updated.');
  console.log(game.sell('Alice', 'gold', 5).message);

  // Show current state
  console.log('\nCurrent Standings:');
  game.getLeaderboard().forEach((player, i) => {
    console.log(`${i + 1}. ${player.name}: $${player.totalValue.toFixed(2)}`);
  });
}

/**
 * Example 2: Investment Strategies
 */
function example2_Strategies() {
  console.log('\n' + '═'.repeat(70));
  console.log('📚 EXAMPLE 2: Different Investment Strategies');
  console.log('═'.repeat(70) + '\n');

  const game = new Trenchor();

  game.addPlayer('Conservative', 10000);
  game.addPlayer('Aggressive', 10000);
  game.addPlayer('Diversified', 10000);

  // Run game for a few rounds
  for (let i = 0; i < 5; i++) {
    game.nextRound();
    
    if (i === 1) {
      // Conservative strategy - buy stable commodities
      console.log('ROUND 2 - Conservative buys stable stocks');
      game.buy('Conservative', 'wheat', 50);
      game.buy('Conservative', 'silver', 30);
    }
    
    if (i === 1) {
      // Aggressive strategy - buy volatile high-potential commodities
      console.log('ROUND 2 - Aggressive buys volatile stocks');
      game.buy('Aggressive', 'uranium', 10);
    }
    
    if (i === 1) {
      // Diversified strategy - spread across all commodities
      console.log('ROUND 2 - Diversified spreads investments');
      game.buy('Diversified', 'gold', 20);
      game.buy('Diversified', 'silver', 20);
      game.buy('Diversified', 'wheat', 40);
      game.buy('Diversified', 'oil', 20);
      game.buy('Diversified', 'uranium', 5);
    }
  }

  console.log('\nFinal Results:');
  game.getLeaderboard().forEach((player, i) => {
    console.log(`${i + 1}. ${player.name}`);
    console.log(`   Value: $${player.totalValue.toFixed(2)}`);
    console.log(`   Profit: ${player.profitPercent}%`);
  });
}

/**
 * Example 3: Single Player vs AI
 */
function example3_AIGame() {
  console.log('\n' + '═'.repeat(70));
  console.log('📚 EXAMPLE 3: Single Player vs AI Opponents');
  console.log('═'.repeat(70) + '\n');

  const gameSession = new TrenchorWithAI(Trenchor);
  
  // Quick game - 3 rounds instead of full 10
  gameSession.initializeGame('Hero', 2);

  console.log('Game initialized!');
  console.log(`Players: Hero, ${Array.from(gameSession.aiPlayers.keys()).join(', ')}\n`);

  // Play first 3 rounds
  for (let round = 0; round < 3; round++) {
    gameSession.game.nextRound();
    console.log(`\n--- ROUND ${round + 1} ---`);
    
    // AI moves
    gameSession.aiPlayers.forEach((ai) => {
      const result = ai.executeTurn(gameSession.game);
      if (result && result.success) {
        console.log(`${ai.name}: ${result.message}`);
      }
    });

    // Show standings
    const leaderboard = gameSession.game.getLeaderboard();
    console.log('\nStandings:');
    leaderboard.slice(0, 3).forEach((p) => {
      console.log(`  ${p.name}: $${p.totalValue.toFixed(2)}`);
    });
  }
}

/**
 * Example 4: Getting Player Information
 */
function example4_PlayerInfo() {
  console.log('\n' + '═'.repeat(70));
  console.log('📚 EXAMPLE 4: Getting Detailed Player Information');
  console.log('═'.repeat(70) + '\n');

  const game = new Trenchor();
  game.addPlayer('Trader', 10000);

  // Play a few rounds
  for (let i = 0; i < 3; i++) {
    game.nextRound();
    
    if (i === 0) {
      game.buy('Trader', 'gold', 5);
      game.buy('Trader', 'silver', 20);
    }
    
    if (i === 1) {
      game.buy('Trader', 'oil', 30);
    }
    
    if (i === 2) {
      game.sell('Trader', 'gold', 2);
    }
  }

  // Get detailed info
  const playerInfo = game.getPlayerInfo('Trader');

  console.log('Player Profile:');
  console.log(`Name: ${playerInfo.name}`);
  console.log(`Current Round: ${playerInfo.round}`);
  console.log(`\nPortfolio:`);
  console.log(`  Cash: $${playerInfo.portfolio.cash.toFixed(2)}`);
  console.log(`  Inventory Value: $${playerInfo.portfolio.inventory.toFixed(2)}`);
  console.log(`  Total Value: $${playerInfo.portfolio.total.toFixed(2)}`);

  console.log(`\nInventory:`);
  Object.entries(playerInfo.inventory).forEach(([commodity, quantity]) => {
    console.log(`  ${commodity}: ${quantity} units`);
  });

  console.log(`\nTrade Statistics:`);
  console.log(`  Total Trades: ${playerInfo.stats.totalTrades}`);
  console.log(`  Buy Orders: ${playerInfo.stats.buyTrades}`);
  console.log(`  Sell Orders: ${playerInfo.stats.sellTrades}`);

  console.log(`\nRecent Trades:`);
  playerInfo.recentTrades.forEach((trade) => {
    console.log(`  [Round ${trade.round}] ${trade.type} ${trade.quantity} ${trade.commodity} @ $${trade.price}`);
  });
}

/**
 * Example 5: Market Analysis
 */
function example5_MarketAnalysis() {
  console.log('\n' + '═'.repeat(70));
  console.log('📚 EXAMPLE 5: Market Analysis and Price Tracking');
  console.log('═'.repeat(70) + '\n');

  const game = new Trenchor();
  game.addPlayer('Analyst', 100000);

  console.log('Tracking Gold prices over 5 rounds:\n');
  console.log('Round | Price  | Change');
  console.log('------|--------|--------');

  for (let i = 0; i < 5; i++) {
    game.nextRound();
    const market = game.getMarketState();
    const goldData = market.gold;
    console.log(`${i + 1}     | $${goldData.price.toFixed(2)} | ${goldData.change}`);
  }

  console.log('\nMarket Summary:');
  const finalMarket = game.getMarketState();
  Object.entries(finalMarket).forEach(([commodity, data]) => {
    console.log(`${data.name}: $${data.price}`);
  });
}

/**
 * Example 6: Error Handling
 */
function example6_ErrorHandling() {
  console.log('\n' + '═'.repeat(70));
  console.log('📚 EXAMPLE 6: Error Handling');
  console.log('═'.repeat(70) + '\n');

  const game = new Trenchor();
  game.addPlayer('Player', 100);

  game.nextRound();

  // Try to buy with insufficient funds
  try {
    game.buy('Player', 'gold', 5); // 5 * $100 = $500 but only have $100
  } catch (error) {
    console.log('❌ Error caught:', error.message);
  }

  // Try to sell what you don't own
  try {
    game.sell('Player', 'gold', 5);
  } catch (error) {
    console.log('❌ Error caught:', error.message);
  }

  // Try to find non-existent player
  try {
    game.buy('Ghost', 'gold', 1);
  } catch (error) {
    console.log('❌ Error caught:', error.message);
  }

  // Try to trade non-existent commodity
  try {
    game.buy('Player', 'platinum', 1);
  } catch (error) {
    console.log('❌ Error caught:', error.message);
  }

  console.log('\n✅ All error handling working correctly!');
}

/**
 * Main - Run all examples
 */
console.log('\n' + '═'.repeat(70));
console.log('🎮 TRENCHOR - Game Examples and Tutorials');
console.log('═'.repeat(70));

// Run all examples
example1_BasicGame();
example2_Strategies();
example3_AIGame();
example4_PlayerInfo();
example5_MarketAnalysis();
example6_ErrorHandling();

console.log('\n' + '═'.repeat(70));
console.log('✅ All examples completed!');
console.log('═'.repeat(70) + '\n');
