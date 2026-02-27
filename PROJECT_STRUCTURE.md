# TRENCHOR Project Structure

## 📁 Files Overview

```
trenchor/
├── trenchor.js                 # Core game engine (main class)
├── ai-opponent.js              # AI trading opponents with strategies
├── examples.js                 # Example usage and tutorials
├── trenchor-config.json        # Game configuration & settings
├── package.json                # Node.js dependencies & scripts
├── README.md                   # Full documentation
└── PROJECT_STRUCTURE.md        # This file
```

## 🎮 Core Files Explained

### `trenchor.js` (Main Game Engine)
The heart of the game. Contains the `Trenchor` class with all game mechanics:

**Key Methods:**
- `addPlayer(name, balance)` - Add a player
- `buy(player, commodity, quantity)` - Buy commodity
- `sell(player, commodity, quantity)` - Sell commodity
- `nextRound()` - Advance game, update prices
- `getMarketState()` - Get current prices
- `getLeaderboard()` - Get rankings
- `getPlayerInfo(player)` - Get player details
- `getPortfolioValue(player)` - Get net worth

**Game Data:**
- 5 commodities (Gold, Silver, Wheat, Oil, Uranium)
- 10 rounds per game
- $10,000 starting balance
- Dynamic pricing with volatility

### `ai-opponent.js` (AI & Multiplayer)
Provides AI opponents and single-player game sessions:

**Classes:**
- `AITrader` - Individual AI player with strategies
- `TrenchorWithAI` - Game session manager

**AI Strategies:**
- Conservative: Low risk, stable trades
- Balanced: Medium risk/reward
- Aggressive: High risk, high reward potential
- Volatility: Exploits price swings

**Methods:**
- `makeDecision()` - Determines AI moves
- `executeTurn()` - Executes AI trade
- `playFullGame()` - Run full game with AI

### `examples.js` (Tutorials)
Six complete examples:
1. Basic two-player game
2. Different investment strategies
3. Single-player vs AI
4. Player information queries
5. Market analysis & tracking
6. Error handling

### `trenchor-config.json` (Configuration)
Game settings and metadata:
- Commodity definitions
- Base prices & volatility
- Game rules
- Play.fun integration settings
- Achievement definitions

## 🚀 How to Use

### Run Basic Game Demo
```bash
npm start
# or
node trenchor.js
```

### Play Against AI
```bash
npm run ai-demo
# or
node ai-opponent.js
```

### View Examples
```bash
node examples.js
```

## 📊 Game Mechanics

### Market System
- Prices update each round with random volatility
- Each commodity has different volatility coefficient
- Price changes between -50% below base and unlimited upside

### Trading
- Buy: Spend cash to acquire commodities
- Sell: Convert inventory to cash
- Portfolio value = Cash + Inventory value

### Winning
- Highest total portfolio value at end wins
- Player stats tracked for leaderboard
- Profit percentage calculated from starting balance

## 🔧 Extending the Game

### Adding New Commodities
Edit `trenchor.js` line ~30:
```javascript
this.commodities = {
  gold: { name: 'Gold', basePrice: 100, volatility: 0.15 },
  // Add new commodity here
};
```

### Changing Game Length
Edit `trenchor.js` line ~19:
```javascript
this.maxRounds = 10;  // Change this number
```

### Adding New AI Strategies
Edit `ai-opponent.js` line ~20:
```javascript
this.strategies = {
  conservative: { ... },
  balanced: { ... },
  // Add new strategy here
};
```

## 📈 Play.fun Integration

The game is fully integrated with the Play.fun ecosystem:

- **Leaderboards**: Automatic rank tracking
- **Achievements**: 5 achievements to unlock
- **Multiplayer**: Cross-platform compatible
- **Skill Framework**: Uses OpusGameLabs skills

## 🎯 Strategy Tips

1. **Diversify Risk**: Own multiple commodities
2. **Monitor Volatility**: High volatility = high reward/risk
3. **Technical Analysis**: Track price history
4. **Cash Management**: Keep reserves for opportunities
5. **Hedging**: Balance high-risk with stable commodities

## 🐛 Debugging

### Check Syntax
```bash
node -c trenchor.js
```

### View Detailed Player Info
```javascript
const playerInfo = game.getPlayerInfo('PlayerName');
console.log(JSON.stringify(playerInfo, null, 2));
```

### Test Error Handling
See `examples.js` example 6 for error handling patterns

## 📝 API Summary

```javascript
const Trenchor = require('./trenchor');
const { AITrader, TrenchorWithAI } = require('./ai-opponent');

// Create game
const game = new Trenchor();

// Add players
game.addPlayer('Alice');
game.addPlayer('Bob');

// Play rounds
game.nextRound();
game.buy('Alice', 'gold', 5);
game.sell('Bob', 'silver', 10);

// Get info
game.getMarketState();
game.getPlayerInfo('Alice');
game.getLeaderboard();

// With AI
const session = new TrenchorWithAI(Trenchor);
session.playFullGame('Human', 3);  // Play vs 3 AIs
```

## 📜 License

MIT License - Free for education and commercial use

## 🤝 Contributing

To add features:
1. Fork the opusgamelabs/skills repository
2. Add your changes
3. Submit a pull request

---

**Created**: 2026  
**Version**: 1.0.0  
**Framework**: OpusGameLabs Skills  
**Status**: Active & Maintained
