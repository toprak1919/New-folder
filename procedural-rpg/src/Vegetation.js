// Vegetation.js
import * as THREE from 'three';

export default class Vegetation {
    constructor(scene, terrain, count = 500) {
        this.scene = scene;
        this.terrain = terrain;
        this.count = count;
        this.placeTrees();
    }

    placeTrees() {
        const positions = this.terrain.mesh.geometry.attributes.position;
        for (let i = 0; i < this.count; i++) {
            const index = Math.floor(Math.random() * (positions.count));
            const x = positions.getX(index);
            const z = positions.getZ(index);
            const y = positions.getY(index);

            if (y > 1) { // Trees only grow on higher terrain (simulating biomes)
                const tree = this.createTree();
                tree.position.set(x, y, z);
                this.scene.add(tree);
            }
        }
    }

    createTree() {
        const tree = new THREE.Group();

        const trunk = new THREE.Mesh(
            new THREE.CylinderGeometry(0.1, 0.1, 1.2),
            new THREE.MeshStandardMaterial({ color: '#8B5A2B' })
        );
        trunk.position.y = 0.6;

        const foliage = new THREE.Mesh(
            new THREE.ConeGeometry(0.6, 2, 8),
            new THREE.MeshStandardMaterial({ color: '#228B22' })
        );
        foliage.position.y = 2;

        tree.add(trunk, foliage);

        return tree;
    }
}
