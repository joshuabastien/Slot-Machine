import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { spinReels } from './spinReels.js';
import { wiggleCamera } from './cameraWiggle.js';

// Set up scene
var scene = new THREE.Scene();
var camera = new THREE.OrthographicCamera(-6, 6, 4, -4, 1, 1000);
var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas').appendChild(renderer.domElement);

// Add light
var light = new THREE.PointLight(0xffffff, 1, 1000);
light.position.set(0, 0, 10);
scene.add(light);
var ambientLight = new THREE.AmbientLight(0xffffff); // full intensity
scene.add(ambientLight);

camera.position.z = 100; 

// Move the camera up
camera.position.y = 10;

// Tilt it down
camera.rotation.x = -Math.PI / 4; // rotate camera 45 degrees down

// update the camera
camera.updateProjectionMatrix();

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0.3, 0, 0);

// Load textures
var textureLoader = new THREE.TextureLoader();
var textures = [];
for (var i = 1; i <= 8; i++) {
    textures.push(textureLoader.load('assets/icon' + i + '.png'));
}

// Create meshes and add to scene
var meshes = [];
for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 3; j++) {
        var material = new THREE.MeshBasicMaterial({ map: textures[(i * 3 + j) % 8] });
        var geometry = new THREE.BoxGeometry(1, 1, 1); // Change this line
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(i - 2, 1 - j, 0);
        scene.add(mesh);
        meshes.push(mesh);
    }
}

const gltfLoader = new GLTFLoader();

gltfLoader.load('/assets/Warrior of the Ocean/scene.gltf', (gltf) => {
    gltf.scene.position.set(4.5, -1, 0); //(left/right, up/down, forward/backward)
    gltf.scene.scale.set(10, 10, 10);
    scene.add(gltf.scene);
});

gltfLoader.load('/assets/Ruin Scene/scene.gltf', (gltf) => {
    gltf.scene.scale.set(8, 8, 8);
    gltf.scene.position.set(3, -5.5, -2); //(left/right, up/down, forward/backward)
    gltf.scene.rotation.y = Math.PI / 2;
    scene.add(gltf.scene);
});

var mixer;
var fish;
var direction = 1;
var speed = 0.01;

gltfLoader.load('/assets/Ugly Fish/scene.gltf', (gltf) => {
    fish = gltf.scene;
    fish.scale.set(0.01, 0.01, 0.01);
    fish.position.set(-10, 1, 2);
    fish.rotation.y = Math.PI / 2;
    scene.add(fish);

    // Animation
    mixer = new THREE.AnimationMixer(fish);
    gltf.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
    });
});

// Render the scene
function animate() {
    requestAnimationFrame(animate);
    wiggleCamera(camera);
    controls.update();
    renderer.render(scene, camera);
    if (mixer) mixer.update(0.01);

    // Move fish left and right
    if (fish) moveFish();
}

function moveFish() {
    fish.position.x += direction * speed;
    if (fish.position.x > 20 || fish.position.x < -20) {
        direction = -direction;
        fish.rotation.y += Math.PI;
    }
}

animate();

// Event listener for spin button
document.getElementById('spinButton').addEventListener('click', function() {
  spinReels(meshes, textures);
  
});