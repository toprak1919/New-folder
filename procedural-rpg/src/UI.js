export default class UI {
    constructor(player, inventory, quest) {
        this.player = player;
        this.inventory = inventory;
        this.quest = quest;

        this.healthElement = document.getElementById('health');
        this.inventoryElement = document.getElementById('inventory');
        this.questElement = document.getElementById('quest');
    }

    update() {
        this.healthElement.innerText = `Health: ${Math.round(this.player.health)}`;
        this.inventoryElement.innerText = `Inventory: ${this.inventory.items.length} items`;
        this.questElement.innerText = `Quest: ${this.quest.getQuestStatus()}`;
    }

    updateProgression(level, xp, xpToNextLevel) {
        document.getElementById('level').innerText = `Level: ${level} (XP: ${xp}/${xpToNextLevel})`;
    }
} 