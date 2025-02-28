// Collectibles.js
import * as THREE from 'three';

export default class Collectibles {
    constructor(scene, terrain, count = 50) {
        this.scene = scene;
        this.terrain = terrain;
        this.items = [];
        this.createCollectibles(count);
    }

    createCollectibles(count) {
        const positions = this.terrain.mesh.geometry.attributes.position;
        for (let i = 0; i < count; i++) {
            const idx = Math.floor(Math.random() * positions.count);
            const x = positions.getX(idx);
            const z = positions.getZ(idx);
            const y = positions.getY(idx) + 1;

            const collectible = new THREE.Mesh(
                new THREE.SphereGeometry(0.2, 8, 8),
                new THREE.MeshStandardMaterial({ color: '#FFD700' })
            );
            collectible.position.set(x, y, z);
            collectible.name = 'collectible';

            this.scene.add(collectible);
            this.items.push(collectible);
        }
    }

    checkCollection(character, inventory) {
        for (let i = this.items.length - 1; i >= 0; i--) {
            const item = this.items[i];
            if (item.position.distanceTo(character.position) < 1) {
                inventory.addItem('Golden Orb');
                this.scene.remove(item);
                this.items.splice(i, 1);
            }
        }
    }
}
