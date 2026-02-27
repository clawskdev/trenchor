/**
 * TRENCHOR - A Trading Game
 * A strategic trading game using OpusGameLabs skills framework
 */

class Trenchor {
  constructor() {
    this.players = new Map();
    this.market = {};
    this.inventory = new Map();
    this.gameState = 'initializing';
    this.round = 0;
    this.maxRounds = 10;
    
    this.commodities = {
      gold: { name: 'Gold', basePrice: 100, volatility: 0.15 },
      silver: { name: 'Silver', basePrice: 50, volatility: 0.12 },
      wheat: { name: 'Wheat', basePrice: 30, volatility: 0.20 },
      oil: { name: 'Oil', basePrice: 80, volatility: 0.18 },
      uranium: { name: 'Uranium', basePrice: 200, volatility: 0.25 }
    };

    this.initializeMarket();
  }

  /**
   * Initialize the market with starting prices
   */
  initializeMarket() {
    Object.entries(this.commodities).forEach(([key, commodity]) => {
      this.market[key] = {
        currentPrice: commodity.basePrice,
        priceHistory: [commodity.basePrice],
        dailyChange: 0
      };
    });
  }

  /**
   * Add a player to the game
   */
  addPlayer(playerName, startingBalance = 10000) {
    if (this.players.has(playerName)) {
      throw new Error(`Player ${playerName} already exists`);
    }

    this.players.set(playerName, {
      name: playerName,
      balance: startingBalance,
      initialBalance: startingBalance,
      portfolio: {},
      totalValue: startingBalance,
      trades: []
    });

    this.inventory.set(playerName, {});
  }

  /**
   * Update market prices with random fluctuation
   */
  updateMarket() {
    Object.entries(this.market).forEach(([commodity, data]) => {
      const volatility = this.commodities[commodity].volatility;
      const randomChange = (Math.random() - 0.5) * volatility * 2; // -volatility to +volatility
      const changePercentage = 1 + randomChange;
      
      const newPrice = Math.max(
        data.currentPrice * changePercentage,
        data.currentPrice * 0.5 // Prevent price collapse
      );

      data.dailyChange = ((newPrice - data.currentPrice) / data.currentPrice) * 100;
      data.currentPrice = Math.round(newPrice * 100) / 100;
      data.priceHistory.push(data.currentPrice);
    });
  }

  /**
   * Buy a commodity
   */
  buy(playerName, commodity, quantity) {
    const player = this.players.get(playerName);
    if (!player) throw new Error(`Player ${playerName} not found`);
    if (!this.market[commodity]) throw new Error(`Commodity ${commodity} not found`);

    const totalCost = this.market[commodity].currentPrice * quantity;

    if (player.balance < totalCost) {
      throw new Error(`Insufficient balance. Need: ${totalCost}, Have: ${player.balance}`);
    }

    player.balance -= totalCost;
    const playerInventory = this.inventory.get(playerName);
    playerInventory[commodity] = (playerInventory[commodity] || 0) + quantity;

    player.trades.push({
      type: 'BUY',
      commodity,
      quantity,
      price: this.market[commodity].currentPrice,
      round: this.round,
      timestamp: new Date().toISOString()
    });

    return {
      success: true,
      message: `Bought ${quantity} units of ${commodity} at ${this.market[commodity].currentPrice}`,
      totalCost,
      remainingBalance: player.balance
    };
  }

  /**
   * Sell a commodity
   */
  sell(playerName, commodity, quantity) {
    const player = this.players.get(playerName);
    if (!player) throw new Error(`Player ${playerName} not found`);
    if (!this.market[commodity]) throw new Error(`Commodity ${commodity} not found`);

    const playerInventory = this.inventory.get(playerName);
    const owned = playerInventory[commodity] || 0;

    if (owned < quantity) {
      throw new Error(`Insufficient inventory. Own: ${owned}, Want to sell: ${quantity}`);
    }

    const totalRevenue = this.market[commodity].currentPrice * quantity;
    player.balance += totalRevenue;
    playerInventory[commodity] -= quantity;

    player.trades.push({
      type: 'SELL',
      commodity,
      quantity,
      price: this.market[commodity].currentPrice,
      round: this.round,
      timestamp: new Date().toISOString()
    });

    return {
      success: true,
      message: `Sold ${quantity} units of ${commodity} at ${this.market[commodity].currentPrice}`,
      totalRevenue,
      newBalance: player.balance
    };
  }

  /**
   * Get player portfolio value
   */
  getPortfolioValue(playerName) {
    const player = this.players.get(playerName);
    if (!player) throw new Error(`Player ${playerName} not found`);

    const playerInventory = this.inventory.get(playerName);
    let inventoryValue = 0;

    Object.entries(playerInventory).forEach(([commodity, quantity]) => {
      inventoryValue += this.market[commodity].currentPrice * quantity;
    });

    player.totalValue = player.balance + inventoryValue;
    return {
      cash: player.balance,
      inventory: inventoryValue,
      total: player.totalValue
    };
  }

  /**
   * Advance to next round
   */
  nextRound() {
    if (this.round >= this.maxRounds) {
      this.gameState = 'finished';
      return false;
    }

    this.round++;
    this.updateMarket();
    return true;
  }

  /**
   * Get current market state
   */
  getMarketState() {
    const state = {};
    Object.entries(this.market).forEach(([commodity, data]) => {
      state[commodity] = {
        name: this.commodities[commodity].name,
        price: data.currentPrice,
        change: data.dailyChange.toFixed(2) + '%',
        priceHistory: data.priceHistory.slice(-5) // Last 5 prices
      };
    });
    return state;
  }

  /**
   * Get leaderboard
   */
  getLeaderboard() {
    const standings = Array.from(this.players.values())
      .map(player => ({
        name: player.name,
        balance: player.balance,
        totalValue: this.getPortfolioValue(player.name).total,
        profit: this.getPortfolioValue(player.name).total - player.initialBalance,
        profitPercent: (((this.getPortfolioValue(player.name).total - player.initialBalance) / player.initialBalance) * 100).toFixed(2)
      }))
      .sort((a, b) => b.totalValue - a.totalValue);

    return standings;
  }

  /**
   * Get detailed player info
   */
  getPlayerInfo(playerName) {
    const player = this.players.get(playerName);
    if (!player) throw new Error(`Player ${playerName} not found`);

    const portfolio = this.getPortfolioValue(playerName);
    const playerInventory = this.inventory.get(playerName);

    return {
      name: player.name,
      round: this.round,
      balance: player.balance,
      portfolio,
      inventory: Object.fromEntries(
        Object.entries(playerInventory).filter(([, qty]) => qty > 0)
      ),
      recentTrades: player.trades.slice(-5),
      stats: {
        totalTrades: player.trades.length,
        buyTrades: player.trades.filter(t => t.type === 'BUY').length,
        sellTrades: player.trades.filter(t => t.type === 'SELL').length
      }
    };
  }
}

// Export for use with OpusGameLabs
module.exports = Trenchor;

// Initialize if running directly
if (require.main === module) {
  console.log('\n🎮 TRENCHOR - Trading Game\n');
  
  const game = new Trenchor();
  
  // Add players
  game.addPlayer('Trader Alice', 10000);
  game.addPlayer('Trader Bob', 10000);
  game.addPlayer('Trader Charlie', 10000);
  
  console.log('Starting game with 3 traders...\n');
  
  // Simulate 10 rounds
  for (let i = 0; i < 10; i++) {
    console.log(`\n=== ROUND ${game.round + 1} ===`);
    game.nextRound();
    
    console.log('\n📊 Market Prices:');
    const market = game.getMarketState();
    Object.entries(market).forEach(([commodity, data]) => {
      console.log(`  ${data.name}: $${data.price} (${data.change})`);
    });
    
    // Simulate some trades
    if (i % 2 === 0) {
      try {
        game.buy('Trader Alice', 'gold', 5);
        console.log('\n✅ Trader Alice bought 5 Gold');
      } catch (e) {
        console.log('\n❌ Trade failed:', e.message);
      }
    }
    
    if (i % 3 === 0) {
      try {
        game.buy('Trader Bob', 'silver', 10);
        console.log('✅ Trader Bob bought 10 Silver');
      } catch (e) {
        console.log('❌ Trade failed:', e.message);
      }
    }
  }
  
  console.log('\n\n🏆 FINAL LEADERBOARD');
  console.log('='.repeat(70));
  const leaderboard = game.getLeaderboard();
  leaderboard.forEach((player, index) => {
    console.log(`${index + 1}. ${player.name}`);
    console.log(`   Total Value: $${player.totalValue.toFixed(2)}`);
    console.log(`   Profit: $${player.profit.toFixed(2)} (${player.profitPercent}%)`);
  });
}
