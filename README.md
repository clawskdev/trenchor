# 🎮 TRENCHOR - Strategic Trading Game

A dynamic trading game where players compete to maximize their wealth by buying and selling commodities in a volatile market.

## Overview

**TRENCHOR** is a strategic trading game built with OpusGameLabs Skills framework. Players manage portfolios of precious metals, agricultural products, and energy commodities, timing their trades to maximize profits as prices fluctuate.

## Game Features

### 🏪 Commodities
- **Gold** (🥇) - Base Price: $100, Volatility: 15%
- **Silver** (🥈) - Base Price: $50, Volatility: 12%
- **Wheat** (🌾) - Base Price: $30, Volatility: 20%
- **Oil** (🛢️) - Base Price: $80, Volatility: 18%
- **Uranium** (☢️) - Base Price: $200, Volatility: 25%

### 🎯 Core Mechanics
- **Starting Balance**: $10,000 per player
- **Game Length**: 10 rounds per game
- **Market Volatility**: Prices change dynamically each round
- **Portfolio Tracking**: Track cash and inventory value
- **Leaderboard**: Compete with other players for highest profits

## Quick Start

### Installation

```bash
# Install dependencies
npm install

# Run the game
node trenchor.js
```

### Basic Usage

```javascript
const Trenchor = require('./trenchor');

// Create a new game
const game = new Trenchor();

// Add players
game.addPlayer('Player 1', 10000);
game.addPlayer('Player 2', 10000);

// Make trades
game.buy('Player 1', 'gold', 5);      // Buy 5 units of gold
game.sell('Player 1', 'silver', 10);  // Sell 10 units of silver

// Advance the game
game.nextRound();

// Check market status
const market = game.getMarketState();
console.log(market);

// View leaderboard
const leaderboard = game.getLeaderboard();
console.log(leaderboard);
```

## API Reference

### Constructor
```javascript
const game = new Trenchor();
```
Creates a new game instance with initialized market.

### addPlayer(playerName, startingBalance = 10000)
Adds a player to the game with starting balance.

```javascript
game.addPlayer('Alice', 10000);
```

### buy(playerName, commodity, quantity)
Buy a commodity. Returns success/error and transaction details.

```javascript
const result = game.buy('Alice', 'gold', 5);
// { success: true, message: '...', totalCost: 500, remainingBalance: 9500 }
```

### sell(playerName, commodity, quantity)
Sell a commodity from inventory.

```javascript
const result = game.sell('Alice', 'gold', 5);
// { success: true, message: '...', totalRevenue: 525, newBalance: 10025 }
```

### nextRound()
Advance to next round, update market prices.

```javascript
const canContinue = game.nextRound();
```

### getMarketState()
Get current prices for all commodities.

```javascript
const market = game.getMarketState();
// {
//   gold: { name: 'Gold', price: 102.50, change: '+2.50%', priceHistory: [...] },
//   ...
// }
```

### getPlayerInfo(playerName)
Get detailed player information.

```javascript
const info = game.getPlayerInfo('Alice');
// { name, round, balance, portfolio, inventory, recentTrades, stats }
```

### getPortfolioValue(playerName)
Get total portfolio value.

```javascript
const value = game.getPortfolioValue('Alice');
// { cash: 9500, inventory: 500, total: 10000 }
```

### getLeaderboard()
Get ranked list of all players by total value.

```javascript
const standings = game.getLeaderboard();
// [
//   { name: 'Alice', balance: 10500, totalValue: 10500, profit: 500, profitPercent: '5.00%' },
//   ...
// ]
```

## Strategy Tips

1. **Diversify**: Own multiple commodities to reduce risk
2. **Monitor Volatility**: Higher volatility = higher risk but greater reward potential
3. **Buy Low, Sell High**: Track price history and trends
4. **Cash Management**: Keep some cash reserves for opportunities
5. **Hedge**: Use stable commodities to offset volatile positions

## Game Rules

- Maximum 4 players per game
- 10 rounds per game
- Cannot sell more than you own
- Cannot buy more than your balance allows
- Prices adjust automatically each round
- All trades are permanent

## Integration with Play.fun

This game is fully integrated with the Play.fun ecosystem via OpusGameLabs Skills:

- Leaderboard tracking
- Achievement system
- Multiplayer support
- Cross-platform compatibility

## Development

### File Structure
```
trenchor/
├── trenchor.js            # Main game implementation
├── trenchor-config.json   # Game configuration
├── package.json           # Node.js package config
└── README.md             # This file
```

### Running Tests
```bash
npm test
```

### Building for Production
```bash
npm run build
```

## License

MIT License - Free for educational and commercial use

## Support

For issues, questions, or contributions, visit:
https://github.com/opusgamelabs/skills/issues

---

**Made with ❤️ by OpusGameLabs**
