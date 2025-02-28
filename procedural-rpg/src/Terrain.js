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
            wireframe: false,
            flatShading: true,
        });

        return new THREE.Mesh(geometry, material);
    }

    getHeight(x, z, scale) {
        const frequency = 0.05;
        const amplitude = 4;
        return this.simplex.noise2D(x * frequency / scale, z * frequency / scale) * amplitude;
    }
}
