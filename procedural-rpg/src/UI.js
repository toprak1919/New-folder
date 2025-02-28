// UI.js constructor example
export default class UI {
    constructor(player, inventory, quest = null) {
        this.player = player;
        this.inventory = inventory;
        this.quest = quest;

        this.healthElement = document.getElementById('health');
        this.inventoryElement = document.getElementById('inventory');
        this.questElement = document.getElementById('quest');
        this.levelElement = document.getElementById('level');
    }

    update() {
        this.healthElement.innerText = `Health: ${Math.round(this.player.health)}`;
        this.inventoryElement.innerText = `Inventory: ${this.inventory.items.length} items`;
        if (this.quest) {
            this.questElement.innerText = `Quest: ${this.quest.activeQuest}`;
        }
    }

    updateProgression(level, xp, xpToNextLevel) {
        this.levelElement.innerText = `Level: ${level} (XP: ${xp}/${xpToNextLevel})`;
    }

    updateQuest(questText, progress, goal) {
        this.questElement.innerText = `Quest: ${questText} (${progress}/${goal})`;
    }
}
