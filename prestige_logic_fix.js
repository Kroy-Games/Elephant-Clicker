    // PRESTIGE SYSTEM - FIXED LOGIC (lines 3295-3449)
    // Helper functions to apply prestige boosts
    var applyPrestigeToEPS = function(baseEPS) {
      return baseEPS * prestigeIdleBoost;
    }
    var applyPrestigeToEPC = function(baseEPC) {
      return baseEPC * prestigeClickBoost;
    }
    // Calculate ancient tusks earned based on progression
    var calculateAncientTusksEarned = function() {
      // Award tusks based on total coins earned and playtime
      var baseTusks = Math.floor(totalElephantCoinsEarned / 1e6) + Math.floor(Math.sqrt(totalPlayTime / 60));
      return Math.max(1, baseTusks);
    }
    // Main prestige function - execute prestige and reset
    var doPrestige = function() {
      // Check if player has met minimum prestige requirement
      if (totalElephantCoinsEarned < 1e6) {
        alertMessage("You need to earn at least 1 million coins before prestiging!", "small", 3000);
        return;
      }
      // Calculate and award ancient tusks
      var earnedTusks = calculateAncientTusksEarned();
      ancientTusksEarned += earnedTusks;
      totalAncientTusks += earnedTusks;
      ancientTusks += earnedTusks;
      bestAncientTusks = Math.max(bestAncientTusks, ancientTusks);
      totalPrestiges++;
      // Update prestige boost multipliers
      // Each ancient tusk provides 5% bonus to idle and click income (cumulative)
      prestigeIdleBoost = 1 + (ancientTusks * 0.05);
      prestigeClickBoost = 1 + (ancientTusks * 0.05);
      prestigeBoost = prestigeIdleBoost; // Overall prestige multiplier
      // Reset session variables (keep all-time totals)
      sessionElephantCoinsEarned = 0;
      sessionElephantCoinsSpent = 0;
      sessionElephantCoins = 0;
      sessionPlayTime = 0;
      sessionClicks = 0;
      sessionBuildingsBought = 0;
      sessionUpgradesBought = 0;
      sessionAchievementsUnlocked = 0;
      totalSessions++;
      // Refresh UI elements
      document.getElementById("ancient-tusks").textContent = ancientTusks;
      document.getElementById("ele-coins").textContent = "0";
      // Show prestige message
      var percentBoost = (ancientTusks * 5);
      alertMessage("✨ PRESTIGE! ✨\n\nYou earned " + earnedTusks + " Ancient Tusks!\n\nPrestige Boost: +" + percentBoost + "%", "big", 5000);
    }
    // Button event listener for prestige
    if (document.getElementById("prestige-btn")) {
      document.getElementById("prestige-btn").addEventListener("click", function() {
        doPrestige();
      });
    }
