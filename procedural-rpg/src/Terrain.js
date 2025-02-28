// Terrain.js
import * as THREE from 'three';
import { SimplexNoise } from 'simplex-noise';

export default class Terrain {
    constructor(width = 100, depth = 100, segments = 128, scale = 20) {
        this.simplex = new SimplexNoise();
        this.mesh = this.generateTerrain(width, depth, segments, scale);
    }

    generateTerrain(width, depth, segments, scale) {
        const geometry = new THREE.PlaneGeometry(width, depth, segments, segments);
        geometry.rotateX(-Math.PI / 2);

        const positions = geometry.attributes.position.array;

        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const z = positions[i + 2];
            positions[i + 1] = this.getHeight(x, z, scale);
        }

        geometry.computeVertexNormals();

        const material = new THREE.MeshStandardMaterial({
            color: '#3B7A57',
            flatShading: true,
            metalness: 0,
            roughness: 1,
        });

        const terrainMesh = new THREE.Mesh(geometry, material);
        terrainMesh.receiveShadow = true;

        return terrainMesh;
    }

    getHeight(x, z, scale) {
        const frequency = 0.05;
        const amplitude = 4;
        return this.simplex.noise2D(x * frequency / scale, z * frequency / scale) * amplitude;
    }
}
