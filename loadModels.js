import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

const gltfLoader = new GLTFLoader();

function loadModels(scene) {
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
}

export { loadModels };
