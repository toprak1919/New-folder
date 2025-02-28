// main.js (Complete Final Version)

import World from './World.js';
import Terrain from './Terrain.js';
import Character from './Character.js';
import Vegetation from './Vegetation.js';
import Inventory from './Inventory.js';
import Collectibles from './Collectibles.js';
import Player from './Player.js';
import Enemy from './Enemy.js';
import Quest from './Quest.js';
import UI from './UI.js';
import Audio from './Audio.js';
import ParticleSystem from './ParticleSystem.js';
import PostProcessing from './PostProcessing.js';
import SaveLoad from './SaveLoad.js';
import Progression from './Progression.js';

const canvas = document.getElementById('gameCanvas');
const world = new World(canvas);
const terrain = new Terrain();
const character = new Character();
const inventory = new Inventory();
const player = new Player(character.mesh);
const collectibles = new Collectibles(world.scene, terrain, 100);
const enemies = new Enemy(world.scene, terrain, 25);
const audio = new Audio();
audio.playAmbientWind();

const particles = new ParticleSystem(world.scene);
const postProcessing = new PostProcessing(world.renderer, world.scene, world.camera);

// Initialize UI without quest (use null initially)
const ui = new UI(player, inventory, null);

// Initialize Progression (depends on UI)
const progression = new Progression(player, ui);

// Initialize Quest after progression and UI
const quest = new Quest(world.scene, terrain, collectibles, enemies, progression, inventory, ui);

// Now assign quest to UI explicitly
ui.quest = quest;

// Event listeners for Save & Load
document.getElementById('saveBtn').onclick = () => SaveLoad.saveGame(player, inventory, quest);
document.getElementById('loadBtn').onclick = () => SaveLoad.loadGame(player, inventory, quest, character.mesh);

// Game controls
const keys = {};
window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);

function handleMovement() {
    const speed = 0.2;
    if (keys['w']) character.mesh.position.z -= speed;
    if (keys['s']) character.mesh.position.z += speed;
    if (keys['a']) character.mesh.position.x -= speed;
    if (keys['d']) character.mesh.position.x += speed;
}

// Collectibles XP and particles
collectibles.checkCollection = function(character, inventory) {
    for (let i = this.items.length - 1; i >= 0; i--) {
        const item = this.items[i];
        if (item.position.distanceTo(character.position) < 1) {
            inventory.addItem('Golden Orb');
            particles.createParticle(item.position, 0xFFD700, 30);
            audio.playCollectSound();
            progression.addXP(20);
            this.scene.remove(item);
            this.items.splice(i, 1);
        }
    }
};

// Player damage with particles and audio
player.takeDamage = function(amount) {
    this.health -= amount;
    particles.createParticle(this.mesh.position, 0xff0000, 30);
    audio.playDamageSound();
    console.log(`Player took ${amount} damage! Health left: ${Math.round(this.health)}`);

    if (this.health <= 0) {
        console.log("Player defeated!");
    }
};

// Main animation loop
function animate(time = 0) {
    requestAnimationFrame(animate);

    handleMovement();
    character.animateWalk(time * 0.005);

    enemies.update(character.mesh, player);
    collectibles.checkCollection(character.mesh, inventory);

    quest.update(character.mesh);  // Track quest progress dynamically
    particles.update();
    ui.update();

    world.camera.position.x = character.mesh.position.x;
    world.camera.position.z = character.mesh.position.z + 10;
    world.camera.lookAt(character.mesh.position);

    postProcessing.render();
}

animate();
