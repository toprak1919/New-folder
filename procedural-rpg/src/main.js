// main.js
import World from './World.js';
import Terrain from './Terrain.js';
import Character from './Character.js';
import Inventory from './Inventory.js';
import Collectibles from './Collectibles.js';
import Vegetation from './Vegetation.js';
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
const collectibles = new Collectibles(world.scene, terrain, 100);

// Initialize Vegetation after terrain is created
new Vegetation(world.scene, terrain, 800);

// Initialize player and enemies
const player = new Player(character.mesh);
const enemies = new Enemy(world.scene, terrain, 25); // Adjust enemy count as needed

// Initialize quest and UI
const quest = new Quest();
const ui = new UI(player, inventory, quest);

// Initialize audio
const audio = new Audio();
audio.playAmbientWind();  // play ambient wind sound continuously

// Initialize particle system & post-processing
const particles = new ParticleSystem(world.scene);
const postProcessing = new PostProcessing(world.renderer, world.scene, world.camera);

// Initialize Progression
const progression = new Progression(player, ui);
ui.updateProgression(progression.level, progression.xp, progression.xpToNextLevel);

// Set initial positions
character.mesh.position.y = 2;

world.scene.add(terrain.mesh, character.mesh);

// Basic controls
const keys = {};
window.addEventListener('keydown', (e) => keys[e.key] = true);
window.addEventListener('keyup', (e) => keys[e.key] = false);

function handleMovement() {
    const speed = 0.2;
    if (keys['w']) character.mesh.position.z -= speed;
    if (keys['s']) character.mesh.position.z += speed;
    if (keys['a']) character.mesh.position.x -= speed;
    if (keys['d']) character.mesh.position.x += speed;
}

let traveledDistance = 0;
const lastPosition = character.mesh.position.clone();

function animate(time = 0) {
    requestAnimationFrame(animate);

    handleMovement();
    character.animateWalk(time * 0.005);

    enemies.update(character.mesh, player);
    collectibles.checkCollection(character.mesh, inventory);

    traveledDistance += character.mesh.position.distanceTo(lastPosition);
    lastPosition.copy(character.mesh.position);

    quest.updateProgress('explore', Math.floor(traveledDistance));
    traveledDistance = 0;

    particles.update();
    ui.update();

    world.camera.position.x = character.mesh.position.x;
    world.camera.position.z = character.mesh.position.z + 10;
    world.camera.lookAt(character.mesh.position);

    postProcessing.render();
}

animate();

// Give XP on collecting items
collectibles.checkCollection = function(character, inventory) {
    for (let i = this.items.length - 1; i >= 0; i--) {
        const item = this.items[i];
        if (item.position.distanceTo(character.position) < 1) {
            inventory.addItem('Golden Orb');
            particles.createParticle(item.position, 0xFFD700, 30);
            audio.playCollectSound();
            progression.addXP(20);
            quest.updateProgress('collect', 1);
            this.scene.remove(item);
            this.items.splice(i, 1);
        }
    }
};

// Give XP for defeating enemies or actions (optional example):
player.takeDamage = function(amount) {
    this.health -= amount;
    particles.createParticle(this.mesh.position, 0xff0000, 30);  // damage effect
    audio.playDamageSound();
    console.log(`Player took ${amount} damage! Health left: ${Math.round(this.health)}`);

    if (this.health <= 0) {
        console.log("Player defeated!");
    }
};

// Button event listeners
document.getElementById('saveBtn').onclick = () => SaveLoad.saveGame(player, inventory, quest);
document.getElementById('loadBtn').onclick = () => SaveLoad.loadGame(player, inventory, quest, character.mesh);
