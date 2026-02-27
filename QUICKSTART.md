# 🎮 TRENCHOR - Quick Start Guide

## Welcome to TRENCHOR!

A strategic trading game where you manage commodities and compete for maximum profit.

## Installation (Already Done!)

✅ OpusGameLabs Skills framework installed  
✅ Game engine initialized  
✅ AI opponents ready  
✅ All files created  

## Play Now!

### Option 1: Watch Demo (Recommended First)
```bash
npm start
```
Watch 3 human traders compete over 10 rounds.

### Option 2: Play vs AI Opponents
```bash
npm run ai-demo
```
Play as "Champion" against 3 AI traders with different strategies:
- Conservative AI
- Balanced AI  
- Aggressive AI

### Option 3: Run Examples
```bash
node examples.js
```
See 6 different game scenarios and strategies in action.

## Game Summary

**Objective**: Maximize your wealth by trading commodities

**Players**: 1-4 humans + AI opponents (optional)

**Game Length**: 10 rounds

**Starting Capital**: $10,000 per player

**Commodities**:
- 🥇 Gold ($100 base)
- 🥈 Silver ($50 base)  
- 🌾 Wheat ($30 base)
- 🛢️ Oil ($80 base)
- ☢️ Uranium ($200 base)

## How to Play

### Making Trades

**Buy**: Invest in commodities
```javascript
game.buy('YourName', 'gold', 5);  // Buy 5 gold
```

**Sell**: Convert inventory to cash
```javascript
game.sell('YourName', 'gold', 3);  // Sell 3 gold
```

### Advance Game
```javascript
game.nextRound();  // Market prices update, new round starts
```

### Check Status
```javascript
game.getMarketState();    // Current prices
game.getLeaderboard();    // Rankings
game.getPlayerInfo('You'); // Your portfolio
```

## Strategy Tips

1. **Watch Price Trends**: Track the price history
2. **Diversify**: Don't put all money in one commodity
3. **Buy Low**: Gold prices dropped? It might bounce back!
4. **Risk vs Reward**: High volatility = bigger swings
5. **Keep Cash**: Save reserves for buying opportunities

## Project Files

| File | Purpose |
|------|---------|
| `trenchor.js` | Core game engine |
| `ai-opponent.js` | AI traders & singleplayer mode |
| `examples.js` | Tutorial examples |
| `README.md` | Full documentation |
| `PROJECT_STRUCTURE.md` | File & API reference |
| `trenchor-config.json` | Game configuration |

## Key Features

✨ **Dynamic Market**: Prices change unpredictably each round  
🤖 **AI Opponents**: 4 different trading strategies  
📊 **Smart Analytics**: Track prices, profits, and statistics  
🏆 **Leaderboard**: Compete for highest returns  
🎮 **Play.fun Integration**: Official game framework  

## Common Commands

```javascript
const Trenchor = require('./trenchor');
const game = new Trenchor();

// Setup
game.addPlayer('Alice', 10000);
game.addPlayer('Bob', 10000);

// Play
for(let i = 0; i < 10; i++) {
  game.nextRound();
  game.buy('Alice', 'gold', 5);
  game.sell('Bob', 'silver', 10);
}

// Results
console.log(game.getLeaderboard());
```

## Winning Strategies

### The Conservative Trader 🛡️
- Stick to stable commodities (Silver, Gold)
- Small consistent gains
- Safe but slow profits

### The Risk Taker 🚀
- Heavy Uranium & Oil positions
- Hit big or bust big
- High volatility plays

### The Analyst 📈
- Track all price history
- Buy dips, sell peaks
- Requires market knowledge

### The Diversifier 🎯
- Little of everything
- Hedge high-risk with stable
- Balanced growth

## Troubleshooting

**"Insufficient balance" error?**  
You need more cash. Sell some holdings first.

**"Insufficient inventory" error?**  
You're trying to sell more than you own.

**Prices don't move much?**  
This is normal! Volatility is built-in randomness.

**AI not making moves?**  
They only trade when conditions match their strategy.

## Integration with Play.fun

Your game results can be:
- Submitted to Play.fun leaderboards
- Tracked for achievements
- Shared with other players
- Used for tournaments

## Next Steps

1. **Run a demo**: `npm start`
2. **Study strategies**: `node examples.js`
3. **Play vs AI**: `npm run ai-demo`
4. **Build custom game**: Edit `trenchor.js`
5. **Share results**: Upload to Play.fun

## Questions?

Check the full documentation:
- `README.md` - Complete API guide
- `PROJECT_STRUCTURE.md` - File references
- `examples.js` - Code examples

---

**Version**: 1.0.0  
**Framework**: OpusGameLabs Skills  
**Status**: Ready to Play! 🎮

Enjoy TRENCHOR!
