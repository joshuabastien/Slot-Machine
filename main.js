import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Base of the slot machine
var geometry = new THREE.BoxGeometry(5, 8, 3);
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var base = new THREE.Mesh(geometry, material);
scene.add(base);

// Spinning Reels
var reelGeometry = new THREE.CylinderGeometry(1, 1, 2, 32);
var reelMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
var reel1 = new THREE.Mesh(reelGeometry, reelMaterial);
var reel2 = new THREE.Mesh(reelGeometry, reelMaterial);
var reel3 = new THREE.Mesh(reelGeometry, reelMaterial);
reel1.position.set(-2, 0, 2);
reel2.position.set(0, 0, 2);
reel3.position.set(2, 0, 2);
scene.add(reel1);
scene.add(reel2);
scene.add(reel3);

// Lever
var leverGeometry = new THREE.BoxGeometry(0.5, 3, 0.5);
var leverMaterial = new THREE.MeshBasicMaterial({ color: 0x8B0000 });
var lever = new THREE.Mesh(leverGeometry, leverMaterial);
lever.position.set(3, -2.5, 1.5);
scene.add(lever);

camera.position.z = 10;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

// Function to start spinning the reels
function spinReels() {
  reel1.rotation.x += 0.1;
  reel2.rotation.x += 0.1;
  reel3.rotation.x += 0.1;
}

// Function to stop spinning the reels
function stopReels() {
  // stop spinning the reels and check for winning combinations
}

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  spinReels(); // Uncomment this line to start spinning the reels
  renderer.render(scene, camera);
}

animate();
