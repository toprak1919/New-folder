export default class SaveLoad {
    static saveGame(player, inventory, quest) {
        const saveData = {
            position: {
                x: player.mesh.position.x,
                y: player.mesh.position.y,
                z: player.mesh.position.z
            },
            health: player.health,
            inventory: inventory.items,
            quest: quest.getQuest()
        };

        localStorage.setItem('proceduralRPGSave', JSON.stringify(saveData));
        console.log("🎮 Game Saved:", saveData);
    }

    static loadGame(player, inventory, quest, characterMesh) {
        const saveData = JSON.parse(localStorage.getItem('proceduralRPGSave'));
        if (!saveData) {
            console.warn("⚠️ No saved game found!");
            return;
        }

        player.health = saveData.health;
        characterMesh.position.set(saveData.position.x, saveData.position.y, saveData.position.z);
        
        inventory.items = saveData.inventory || [];
        quest.activeQuest = saveData.quest;

        console.log("✅ Game Loaded:", saveData);
    }
} 