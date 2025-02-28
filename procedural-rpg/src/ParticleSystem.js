import * as THREE from 'three';

export default class ParticleSystem {
    constructor(scene) {
        this.scene = scene;
        this.particles = [];
    }

    createParticle(position, color = 0xffffff, count = 20) {
        const geometry = new THREE.BufferGeometry();
        const vertices = [];

        for (let i = 0; i < count; i++) {
            vertices.push(
                position.x, position.y, position.z,
                position.x + (Math.random() - 0.5), 
                position.y + Math.random(), 
                position.z + (Math.random() - 0.5)
            );
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

        const material = new THREE.PointsMaterial({
            color: color,
            size: 0.1,
            transparent: true,
            opacity: 0.8
        });

        const points = new THREE.Points(geometry, material);
        this.scene.add(points);
        this.particles.push({ points, lifespan: 100 });
    }

    update() {
        this.particles.forEach((particle, index) => {
            particle.points.material.opacity -= 0.008;
            particle.lifespan--;

            if (particle.lifespan <= 0) {
                this.scene.remove(particle.points);
                this.particles.splice(index, 1);
            }
        });
    }
} 