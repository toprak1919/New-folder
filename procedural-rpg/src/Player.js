export default class Player {
    constructor(characterMesh) {
        this.mesh = characterMesh;
        this.health = 100;
    }

    takeDamage(amount) {
        this.health -= amount;
        console.log(`Player took ${amount} damage! Health left: ${this.health}`);
        if (this.health <= 0) {
            console.log("Player defeated!");
        }
    }
} 