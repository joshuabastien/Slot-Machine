import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

var fishMixer, jellyfishMixer, oysterMixer, tentacleMixer, seaAnimalsMixer;
var fish, jellyfish, oyster, seaAnimals, tentacle;

export function loadModels(scene) {
    const gltfLoader = new GLTFLoader();

    gltfLoader.load('/assets/shark warrior/scene.gltf', (gltf) => {
        gltf.scene.position.set(5, 2, -1); //(left/right, up/down, forward/backward)
        gltf.scene.scale.set(0.5, 0.5, 0.5);
        scene.add(gltf.scene);
    });

    gltfLoader.load('/assets/Ugly Fish/scene.gltf', (gltf) => {
        fish = gltf.scene;
        fish.scale.set(0.01, 0.01, 0.01);
        fish.position.set(-10, 2, 2); //(left/right, up/down, forward/backward)
        fish.rotation.y = Math.PI / 2;
        scene.add(fish);
    
        // Animation
        fishMixer = new THREE.AnimationMixer(fish);
        gltf.animations.forEach((clip) => {
            fishMixer.clipAction(clip).play();
        });
    });
    
    gltfLoader.load('/assets/Jellyfish/scene.gltf', (gltf) => {
        jellyfish = gltf.scene;
        jellyfish.scale.set(0.2, 0.2, 0.2);
        jellyfish.position.set(2, 3, 0); //(left/right, up/down, forward/backward)
        jellyfish.rotation.y = Math.PI / 2;
        scene.add(jellyfish);
    
        // Animation
        jellyfishMixer = new THREE.AnimationMixer(jellyfish);
        gltf.animations.forEach((clip) => {
            jellyfishMixer.clipAction(clip).play();
        });
    });
    
    gltfLoader.load('/assets/Oyster/scene.gltf', (gltf) => {
        oyster = gltf.scene;
        oyster.scale.set(1, 1, 1);
        oyster.position.set(2, -3, 0); //(left/right, up/down, forward/backward)
        oyster.rotation.y = 0;
        scene.add(oyster);
    
        // Animation
        oysterMixer = new THREE.AnimationMixer(oyster);
        gltf.animations.forEach((clip) => {
            oysterMixer.clipAction(clip).play();
        });
    });
    
    
    gltfLoader.load('/assets/Tentacle/scene.gltf', (gltf) => {
        gltf.scene.position.set(-4, -2, 0); //(left/right, up/down, forward/backward)
        gltf.scene.scale.set(1.5, 1.5, 1.5);
        scene.add(gltf.scene);
    
        // Get the animations
        var animations = gltf.animations;
        tentacleMixer = new THREE.AnimationMixer(gltf.scene);
    
        // Set the delay and play the animations in sequence
        var duration = 5000; // Start with a 5 second delay
        animations.forEach((clip) => {
            // Find the specific animation clip
            if (clip.name === "HiddenToUnhidden" || clip.name === "UnhiddenToIdle" || clip.name === "Idle01") {
                // Delay the start of animation by adding the duration of previous animations
                setTimeout(() => {
                    var action = tentacleMixer.clipAction(clip);
                    action.play();
                }, duration);
    
                // Update the duration
                duration += clip.duration * 1000;
            }
        });
    });
}

// Function for moving fish
var direction = 1;
var speed = 0.01;
function moveFish() {
    if (!fish) return;
    fish.position.x += direction * speed;
    if (fish.position.x > 20 || fish.position.x < -20) {
        direction = -direction;
        fish.rotation.y += Math.PI;
    }
}


export function updateModels() {
    if (fishMixer) fishMixer.update(0.01);
    if (jellyfishMixer) jellyfishMixer.update(0.01);
    if (oysterMixer) oysterMixer.update(0.01);
    if (tentacleMixer) tentacleMixer.update(0.01);

    // Move fish left and right
    if (fish) moveFish();
}
