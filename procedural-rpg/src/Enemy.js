import * as THREE from 'three';

export default class Enemy {
    constructor(scene, terrain, count = 20) {
        this.scene = scene;
        this.terrain = terrain;
        this.enemies = [];
        this.createEnemies(count);
    }

    createEnemies(count) {
        const positions = this.terrain.mesh.geometry.attributes.position;
        for (let i = 0; i < count; i++) {
            const idx = Math.floor(Math.random() * positions.count);
            const x = positions.getX(idx);
            const z = positions.getZ(idx);
            const y = positions.getY(idx) + 1;

            const enemy = this.createEnemyMesh();
            enemy.position.set(x, y, z);
            this.scene.add(enemy);
            this.enemies.push(enemy);
        }
    }

    createEnemyMesh() {
        const material = new THREE.MeshStandardMaterial({ color: '#FF6347' });
        const geometry = new THREE.BoxGeometry(0.8, 1.5, 0.8);
        const enemyMesh = new THREE.Mesh(geometry, material);
        return enemyMesh;
    }

    update(player, playerClass) {
        this.enemies.forEach(enemy => {
            const direction = new THREE.Vector3().subVectors(player.position, enemy.position);
            const distance = direction.length();

            if (distance < 15 && distance > 0.8) {
                direction.normalize();
                enemy.position.add(direction.multiplyScalar(0.03)); // enemy moves toward player
            }

            // Check collision to deal damage
            if (distance <= 1) {
                playerClass.takeDamage(0.1); // small continuous damage
            }
        });
    }
} 