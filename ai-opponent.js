/**
 * AI Opponent Module for TRENCHOR
 * Provides intelligent AI players with different trading strategies
 */

class AITrader {
  constructor(name, strategy = 'balanced') {
    this.name = name;
    this.strategy = strategy;
    this.memory = {
      priceHistory: {},
      recentTrades: [],
      wins: 0,
      losses: 0
    };

    this.strategies = {
      aggressive: { buyThreshold: 0.05, sellThreshold: 0.10, riskTolerance: 0.9 },
      balanced: { buyThreshold: 0.10, sellThreshold: 0.08, riskTolerance: 0.5 },
      conservative: { buyThreshold: 0.15, sellThreshold: 0.05, riskTolerance: 0.2 },
      volatility: { buyThreshold: 0.20, sellThreshold: 0.15, riskTolerance: 0.8 }
    };

    this.config = this.strategies[strategy] || this.strategies.balanced;
  }

  /**
   * Decide what action to take based on market state
   */
  makeDecision(game, availableBalance, inventory) {
    const decisions = [];
    const market = game.getMarketState();
    const commodities = Object.keys(market);

    // Analyze each commodity
    commodities.forEach(commodity => {
      const marketData = market[commodity];
      const priceHistory = marketData.priceHistory || [marketData.price];
      
      if (priceHistory.length < 2) return;

      // Calculate trend
      const previousPrice = priceHistory[priceHistory.length - 2];
      const currentPrice = marketData.price;
      const priceChange = Math.abs((currentPrice - previousPrice) / previousPrice);

      // Buy decision
      if (priceChange < this.config.buyThreshold && currentPrice < previousPrice) {
        const quantity = this.calculateBuyQuantity(
          commodity,
          availableBalance,
          currentPrice
        );
        if (quantity > 0) {
          decisions.push({
            type: 'BUY',
            commodity,
            quantity,
            confidence: priceChange < this.config.buyThreshold ? 0.8 : 0.5
          });
        }
      }

      // Sell decision
      const owned = inventory[commodity] || 0;
      if (owned > 0 && priceChange > this.config.sellThreshold && currentPrice > previousPrice) {
        const quantity = this.calculateSellQuantity(commodity, owned);
        if (quantity > 0) {
          decisions.push({
            type: 'SELL',
            commodity,
            quantity,
            confidence: priceChange > this.config.sellThreshold ? 0.8 : 0.5
          });
        }
      }
    });

    // Sort by confidence and return top decision
    return decisions.sort((a, b) => b.confidence - a.confidence)[0] || null;
  }

  /**
   * Calculate buy quantity based on available balance
   */
  calculateBuyQuantity(commodity, availableBalance, price) {
    const maxCanBuy = Math.floor(availableBalance / price);
    const riskAdjustedQuantity = Math.floor(
      maxCanBuy * this.config.riskTolerance * (0.5 + Math.random())
    );
    return Math.max(1, Math.min(riskAdjustedQuantity, maxCanBuy));
  }

  /**
   * Calculate sell quantity
   */
  calculateSellQuantity(commodity, owned) {
    // Sell 40-70% of holdings based on strategy
    const sellPercentage = 0.4 + Math.random() * 0.3 * this.config.riskTolerance;
    return Math.max(1, Math.floor(owned * sellPercentage));
  }

  /**
   * Execute turn in game
   */
  executeTurn(game) {
    try {
      const decision = this.makeDecision(
        game,
        game.players.get(this.name).balance,
        game.inventory.get(this.name)
      );

      if (!decision) return null;

      if (decision.type === 'BUY') {
        return game.buy(this.name, decision.commodity, decision.quantity);
      } else if (decision.type === 'SELL') {
        return game.sell(this.name, decision.commodity, decision.quantity);
      }
    } catch (error) {
      console.log(`  ${this.name} could not execute trade: ${error.message}`);
      return null;
    }

    return null;
  }

  /**
   * Get AI trader info
   */
  getInfo() {
    return {
      name: this.name,
      strategy: this.strategy,
      config: this.config,
      stats: this.memory
    };
  }
}

/**
 * Game Session with AI opponents
 */
class TrenchorWithAI {
  constructor(Trenchor) {
    this.TrenchorClass = Trenchor;
    this.game = null;
    this.aiPlayers = new Map();
    this.humanPlayers = new Set();
  }

  /**
   * Initialize game with AI opponents
   */
  initializeGame(humanPlayerName, aiCount = 3, difficulty = 'balanced') {
    this.game = new this.TrenchorClass();
    
    // Add human player
    this.game.addPlayer(humanPlayerName, 10000);
    this.humanPlayers.add(humanPlayerName);

    // Add AI opponents
    const difficulties = ['conservative', 'balanced', 'aggressive', 'volatility'];
    for (let i = 0; i < aiCount; i++) {
      const aiName = `AI_${this.getAIDifficultyName(difficulties[i % 4])}_${i + 1}`;
      const aiTrader = new AITrader(aiName, difficulties[i % 4]);
      this.game.addPlayer(aiName, 10000);
      this.aiPlayers.set(aiName, aiTrader);
    }

    return this.game;
  }

  /**
   * Get difficulty name for AI
   */
  getAIDifficultyName(strategy) {
    return strategy.charAt(0).toUpperCase() + strategy.slice(1);
  }

  /**
   * Execute full game with AI
   */
  playFullGame(humanPlayerName, aiCount = 3) {
    this.initializeGame(humanPlayerName, aiCount);

    console.log(`\n🎮 TRENCHOR: Singleplayer Game Started`);
    console.log(`Player: ${humanPlayerName}`);
    console.log(`Opponents: ${aiCount}`);
    console.log(`Starting Balance: $10,000\n`);

    // Game loop
    for (let round = 1; round <= this.game.maxRounds; round++) {
      console.log(`\n${'='.repeat(70)}`);
      console.log(`ROUND ${round}/${this.game.maxRounds}`);
      console.log('='.repeat(70));

      this.game.nextRound();

      // Display market
      console.log('\n📊 MARKET PRICES:');
      const market = this.game.getMarketState();
      Object.entries(market).forEach(([commodity, data]) => {
        const arrow = data.change.includes('-') ? '📉' : '📈';
        console.log(`  ${arrow} ${data.name}: $${data.price.toFixed(2)} (${data.change})`);
      });

      // AI turns
      console.log('\n🤖 AI TURNS:');
      this.aiPlayers.forEach((aiTrader) => {
        const result = aiTrader.executeTurn(this.game);
        if (result && result.success) {
          const tradeType = result.message.includes('Bought') ? '🛒' : '💰';
          console.log(`  ${tradeType} ${result.message}`);
        }
      });

      // Show standings
      console.log('\n🏆 STANDINGS:');
      const leaderboard = this.game.getLeaderboard();
      leaderboard.forEach((player, index) => {
        const medal = ['🥇', '🥈', '🥉'][index] || '  ';
        console.log(`  ${medal} ${player.name}`);
        console.log(`     Value: $${player.totalValue.toFixed(2)} | Profit: ${player.profitPercent}%`);
      });
    }

    // Final results
    this.showGameResults();
  }

  /**
   * Display final game results
   */
  showGameResults() {
    console.log('\n\n' + '═'.repeat(70));
    console.log('🏆 GAME COMPLETE - FINAL RESULTS');
    console.log('═'.repeat(70));

    const leaderboard = this.game.getLeaderboard();

    leaderboard.forEach((player, index) => {
      const medals = ['🥇 WINNER!', '🥈 Runner-Up', '🥉 Third Place', '4️⃣ Fourth Place'];
      const medal = medals[index] || `   ${index + 1}`;
      
      console.log(`\n${medal}`);
      console.log(`  Player: ${player.name}`);
      console.log(`  Final Value: $${player.totalValue.toFixed(2)}`);
      console.log(`  Total Profit: $${player.profit.toFixed(2)}`);
      console.log(`  ROI: ${player.profitPercent}%`);
    });

    console.log('\n' + '═'.repeat(70));
  }

  /**
   * Get human player stats
   */
  getPlayerStats(playerName) {
    return this.game.getPlayerInfo(playerName);
  }
}

module.exports = { AITrader, TrenchorWithAI };

// Demo if run directly
if (require.main === module) {
  const Trenchor = require('./trenchor');
  const { TrenchorWithAI } = require('./ai-opponent');

  const gameSession = new TrenchorWithAI(Trenchor);
  gameSession.playFullGame('Champion', 3);
}
