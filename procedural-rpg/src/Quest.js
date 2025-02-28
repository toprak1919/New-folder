export default class Quest {
    constructor(scene, terrain, collectibles, enemies, progression, inventory, ui) {
        this.scene = scene;
        this.terrain = terrain;
        this.collectibles = collectibles;
        this.enemies = enemies;
        this.progression = progression;
        this.inventory = inventory;
        this.ui = ui;

        this.questTypes = ['Collect', 'Defeat', 'Explore'];
        this.activeQuest = null;
        this.questGoal = 0;
        this.questProgress = 0;

        this.generateQuest();
    }

    generateQuest() {
        const type = this.questTypes[Math.floor(Math.random() * this.questTypes.length)];

        switch (type) {
            case 'Collect':
                this.questGoal = 5;
                this.activeQuest = `Collect ${this.questGoal} Golden Orbs`;
                break;
            case 'Defeat':
                this.questGoal = 5;
                this.activeQuest = `Defeat ${this.questGoal} Enemies`;
                break;
            case 'Explore':
                this.questGoal = 100;
                this.activeQuest = `Travel 100 units from start`;
                this.startPosition = null;
                break;
        }

        this.questProgress = 0;
        this.ui.updateQuest(this.activeQuest, this.questProgress, this.questGoal);
        console.log(`📜 New Quest: ${this.activeQuest}`);
    }

    update(characterMesh) {
        if (this.activeQuest.includes('Collect')) {
            this.questProgress = this.inventory.items.length;
        } else if (this.activeQuest.includes('Defeat')) {
            const defeated = 25 - this.enemies.enemies.length; 
            this.questProgress = defeated;
        } else if (this.activeQuest.includes('Travel')) {
            if (!this.startPosition) this.startPosition = characterMesh.position.clone();
            this.questProgress = characterMesh.position.distanceTo(this.startPosition);
        }

        if (this.questProgress >= this.questGoal) {
            this.completeQuest();
        }

        this.ui.updateQuest(this.activeQuest, Math.floor(this.questProgress), this.questGoal);
    }

    completeQuest() {
        console.log(`🏆 Quest Completed: ${this.activeQuest}`);
        this.progression.addXP(50);
        this.generateQuest();  // Generate a new quest immediately
    }
} 