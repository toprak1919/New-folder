// Inventory.js
export default class Inventory {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
        console.log(`${item} collected! Current inventory:`, this.items);
    }
} 