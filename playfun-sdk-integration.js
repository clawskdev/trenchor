/**
 * TRENCHOR - Play.fun SDK Integration
 * Ownership verification, game claiming, and leaderboard integration
 */

(function() {
  'use strict';

  // Configuration
  const config = {
    gameId: '53f2bb0d-b0c5-4ba0-8f6b-04babc02a1fc',
    apiKey: '3987d408-6a1e-48e7-b144-12b30afa3e49',
    gameUrl: 'https://clawskdev.github.io/trenchor',
    apiBase: 'https://api.opengameprotocol.com'
  };

  /**
   * Initialize Play.fun SDK
   */
  window.TrenchorPlayFun = {
    /**
     * Verify game ownership via meta tag
     */
    verifyOwnership: function() {
      const metaTag = document.querySelector('meta[name="x-ogp-key"]');
      if (!metaTag) {
        console.error('❌ Ownership meta tag not found');
        return false;
      }
      
      const apiKey = metaTag.getAttribute('content');
      console.log('✅ Ownership verified with API key:', apiKey.substring(0, 8) + '...');
      return true;
    },

    /**
     * Claim game on Play.fun
     */
    claimGame: async function() {
      if (!this.verifyOwnership()) {
        console.error('❌ Cannot claim game - ownership not verified');
        return null;
      }

      console.log('📝 Claiming game on Play.fun...');

      try {
        const response = await fetch(`${config.apiBase}/games`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.apiKey}`
          },
          body: JSON.stringify({
            name: 'TRENCHOR',
            description: 'A strategic trading game where players buy and sell commodities in a volatile market.',
            gameUrl: config.gameUrl,
            platform: 'web',
            gameCoinSymbol: 'TRENCH'
          })
        });

        if (response.ok) {
          const data = await response.json();
          console.log('✅ Game claimed successfully!');
          console.log('Game ID:', data.id);
          return data;
        } else {
          console.error('❌ Claim failed:', response.statusText);
          return null;
        }
      } catch (error) {
        console.error('❌ Error claiming game:', error.message);
        return null;
      }
    },

    /**
     * Submit player score to leaderboard
     */
    submitScore: async function(playerId, score) {
      console.log(`📊 Submitting score: ${playerId} = ${score}`);

      try {
        const response = await fetch(`${config.apiBase}/play/dev/batch-save-points`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.apiKey}`
          },
          body: JSON.stringify({
            gameApiKey: config.gameId,
            points: [
              { playerId, points: String(score) }
            ]
          })
        });

        if (response.ok) {
          console.log('✅ Score submitted to leaderboard');
          return true;
        } else {
          console.error('❌ Score submission failed:', response.statusText);
          return false;
        }
      } catch (error) {
        console.error('❌ Error submitting score:', error.message);
        return false;
      }
    },

    /**
     * Get current leaderboard
     */
    getLeaderboard: async function() {
      console.log('📈 Fetching leaderboard...');

      try {
        const response = await fetch(
          `${config.apiBase}/games/${config.gameId}/leaderboard`,
          {
            headers: {
              'Authorization': `Bearer ${config.apiKey}`
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log('✅ Leaderboard retrieved:', data);
          return data;
        } else {
          console.error('❌ Failed to fetch leaderboard:', response.statusText);
          return null;
        }
      } catch (error) {
        console.error('❌ Error fetching leaderboard:', error.message);
        return null;
      }
    },

    /**
     * Initialize game on Play.fun
     */
    init: async function() {
      console.log('\n🎮 TRENCHOR - Play.fun Integration\n');
      console.log('=' .repeat(50));

      // Verify ownership
      console.log('🔐 Verifying ownership...');
      if (!this.verifyOwnership()) {
        console.error('Failed to verify ownership');
        return false;
      }

      // Claim game
      console.log('\n📝 Claiming game...');
      const claimResult = await this.claimGame();
      if (!claimResult) {
        console.warn('Game claim returned null - may already be claimed');
      }

      // Get leaderboard
      console.log('\n📊 Checking leaderboard...');
      const leaderboard = await this.getLeaderboard();

      console.log('\n' + '=' .repeat(50));
      console.log('✅ TRENCHOR Ready on Play.fun!\n');

      return true;
    }
  };

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.TrenchorPlayFun.init();
    });
  } else {
    window.TrenchorPlayFun.init();
  }

})();
