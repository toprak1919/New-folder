// Character.js
import * as THREE from 'three';

export default class Character {
    constructor() {
        this.mesh = this.createCharacterMesh();
    }

    createCharacterMesh() {
        const character = new THREE.Group();

        const material = new THREE.MeshStandardMaterial({ 
            color: '#ffddaa',
            metalness: 0,
            roughness: 0.8,
        });

        const body = new THREE.Mesh(new THREE.BoxGeometry(1, 1.5, 0.5), material);
        body.castShadow = true;

        const head = new THREE.Mesh(new THREE.SphereGeometry(0.4, 32, 16), material);
        head.position.set(0, 1.2, 0);
        head.castShadow = true;

        const legs = this.createLimbs(0.2, 1, material, -0.6);
        legs.children.forEach(leg => leg.castShadow = true);

        const arms = this.createLimbs(0.15, 0.8, material, 0.3, true);
        arms.children.forEach(arm => arm.castShadow = true);

        character.add(body, head, legs, arms);

        return character;
    }

    createLimbs(radius, length, material, yOffset, horizontal = false) {
        const limbs = new THREE.Group();

        const limbGeometry = new THREE.CylinderGeometry(radius, radius, length);
        const limb1 = new THREE.Mesh(limbGeometry, material);
        const limb2 = limb1.clone();

        if (horizontal) {
            limb1.rotation.z = Math.PI / 2;
            limb2.rotation.z = Math.PI / 2;
            limb1.position.set(-0.8, yOffset, 0);
            limb2.position.set(0.8, yOffset, 0);
        } else {
            limb1.position.set(-0.3, yOffset, 0);
            limb2.position.set(0.3, yOffset, 0);
        }

        limbs.add(limb1, limb2);

        return limbs;
    }

    animateWalk(time) {
        const arms = this.mesh.children.find(child => child.type === 'Group' && child.children[0].geometry.type === 'CylinderGeometry' && child.children[0].rotation.z !== 0);
        const legs = this.mesh.children.find(child => child.type === 'Group' && child.children[0].rotation.z === 0);
        
        arms.children[0].rotation.x = Math.sin(time) * 0.5;
        arms.children[1].rotation.x = -Math.sin(time) * 0.5;
        
        legs.children[0].rotation.x = -Math.sin(time) * 0.5;
        legs.children[1].rotation.x = Math.sin(time) * 0.5;
    }
}
