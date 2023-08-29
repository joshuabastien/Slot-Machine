var shakeIntensity = 0.009;
var shakeSpeed = 0.007;
var elapsedTime = 0;

function wiggleCamera(camera) {
    elapsedTime += shakeSpeed;

    // add camera wiggle
    camera.position.x += Math.sin(elapsedTime) * shakeIntensity;
    camera.position.y += Math.sin(elapsedTime * 1.5) * shakeIntensity;
    camera.position.z += Math.sin(elapsedTime * 0.7) * shakeIntensity;
}

export { wiggleCamera };
