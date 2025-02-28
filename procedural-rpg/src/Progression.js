export default class Progression {
    constructor(player, ui) {
        this.player = player;
        this.ui = ui;
        this.level = 1;
        this.xp = 0;
        this.xpToNextLevel = 100;
    }

    addXP(amount) {
        this.xp += amount;
        console.log(`✨ Gained ${amount} XP! (Current XP: ${this.xp}/${this.xpToNextLevel})`);
        
        while (this.xp >= this.xpToNextLevel) {
            this.levelUp();
        }

        this.ui.updateProgression(this.level, this.xp, this.xpToNextLevel);
    }

    levelUp() {
        this.xp -= this.xpToNextLevel;
        this.level++;
        this.xpToNextLevel = Math.floor(this.xpToNextLevel * 1.5);
        this.player.health = Math.min(this.player.health + 20, 100); // Restore some health or increase stats
        console.log(`🎖️ Leveled Up! You're now Level ${this.level}`);
    }
} 