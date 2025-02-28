export default class Quest {
    constructor() {
        this.activeQuest = null;
        this.completed = false;
        this.progress = 0;
        this.requiredProgress = 0;
        this.type = null;
        this.generateQuest();
    }

    generateQuest() {
        const questTypes = ['collect', 'defeat', 'explore'];
        this.type = questTypes[Math.floor(Math.random() * questTypes.length)];

        switch (this.type) {
            case 'collect':
                this.requiredProgress = 5 + Math.floor(Math.random() * 6); // 5-10 items
                this.activeQuest = `Collect ${this.requiredProgress} Golden Orbs`;
                break;
            case 'defeat':
                this.requiredProgress = 3 + Math.floor(Math.random() * 5); // 3-7 enemies
                this.activeQuest = `Defeat ${this.requiredProgress} enemies`;
                break;
            case 'explore':
                this.requiredProgress = 150 + Math.floor(Math.random() * 100); // Exploration points
                this.activeQuest = `Travel ${this.requiredProgress} units from start`;
                break;
        }
        console.log("🗺️ New Quest:", this.activeQuest);
    }

    updateProgress(type, amount = 1) {
        if (this.completed || this.type !== type) return;

        this.progress += amount;
        console.log(`Quest Progress: ${this.progress}/${this.requiredProgress}`);

        if (this.progress >= this.requiredProgress) {
            this.completeQuest();
        }
    }

    completeQuest() {
        this.completed = true;
        console.log(`🏆 Quest Completed: "${this.activeQuest}"`);
    }

    resetQuest() {
        this.completed = false;
        this.progress = 0;
        this.generateQuest();
    }

    getQuestStatus() {
        return `${this.activeQuest} (${this.progress}/${this.requiredProgress})`;
    }
} 