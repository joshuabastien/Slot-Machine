import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

var scene = new THREE.Scene();
var camera = new THREE.OrthographicCamera(-3, 3, 2, -2, 1, 1000);
var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas').appendChild(renderer.domElement);

// Add light
var light = new THREE.PointLight(0xffffff, 1, 1000);
light.position.set(0, 0, 10);
scene.add(light);

camera.position.z = 5;

const controls = new OrbitControls(camera, renderer.domElement);

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

// Render the scene
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Function to spin the reels
function spinReels() {
    var duration = 2000; // duration of spin in milliseconds
    var start = Date.now();
    function spin() {
        var now = Date.now();
        var progress = now - start;
        if (progress < duration) {
            requestAnimationFrame(spin);
            for (var i = 0; i < 5; i++) {
                for (var j = 0; j < 3; j++) {
                    var mesh = meshes[i * 3 + j];
                    mesh.material.map = textures[Math.floor(Math.random() * 8)];
                }
            }
        }
    }
    spin();
}

// Event listener for spin button
document.getElementById('spinButton').addEventListener('click', spinReels);
