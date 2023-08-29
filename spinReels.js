function spinReels(meshes, textures) {
    
    // Reset scale and color of all meshes
    for (var i = 0; i < meshes.length; i++) {
        var mesh = meshes[i];
        mesh.scale.set(1, 1, 1);
        mesh.material.color.set(0xffffff);
    }
    
    var duration = 2000; // duration of spin in milliseconds
    var start = Date.now();
    var finalSymbols = Array(5).fill(null).map(() => Array(3).fill(0));

    function spin() {
        var now = Date.now();
        var progress = now - start;
    
        if (progress < duration) {
            requestAnimationFrame(spin);
            for (var i = 0; i < 5; i++) {
                if (progress < (i + 1) * (duration / 5)) {
                    for (var j = 0; j < 3; j++) {
                        var mesh = meshes[i * 3 + j];
                        var symbolIndex = Math.floor(Math.random() * 8);
                        mesh.material.map = textures[symbolIndex];
                        finalSymbols[i][j] = symbolIndex;
                    }
                }
            }
        } else {
            calculateWins(finalSymbols);
        }
    }
    
    spin();

    function calculateWins(finalSymbols) {
        for (var symbolIndex = 0; symbolIndex < 8; symbolIndex++) {
            var consecutiveReels = 0;
            for (var i = 0; i < 5; i++) {
                if (finalSymbols[i].includes(symbolIndex)) {
                    consecutiveReels++;
                } else {
                    break;
                }
            }
    
            if (consecutiveReels >= 3) {
                var winAmount = calculateWinAmount(symbolIndex, consecutiveReels);
                console.log("You win: " + winAmount);
    
                for (var i = 0; i < 5; i++) {
                    for (var j = 0; j < 3; j++) {
                        var mesh = meshes[i * 3 + j];
                        if (i < consecutiveReels && finalSymbols[i][j] === symbolIndex) {
                            // Animate winning symbols
                            animateWinningSymbol(mesh);
                        } else {
                            // Grey out non-winning symbols
                            mesh.material.color.set(0x808080);
                        }
                    }
                }
                return;
            }
        }
    
        console.log("No win");
    }
    
    function animateWinningSymbol(mesh) {
        var start = Date.now();
        var duration = 1000; // animation duration in milliseconds
        function animate() {
            var now = Date.now();
            var progress = now - start;
            if (progress < duration) {
                requestAnimationFrame(animate);
                var scale = 1 + 0.5 * Math.sin(progress / duration * Math.PI);
                mesh.scale.set(scale, scale, scale);
            } else {
                mesh.scale.set(1, 1, 1);
            }
        }
        animate();
    }

    function calculateWinAmount(symbolIndex, consecutiveReels) {
        var winAmounts = [
            [10, 20, 50, 100, 200], // win amounts for symbol 0
            [20, 40, 100, 200, 400], // win amounts for symbol 1
            [30, 60, 150, 300, 600], // win amounts for symbol 2
            [40, 80, 200, 400, 800], // win amounts for symbol 3
            [50, 100, 250, 500, 1000], // win amounts for symbol 4
            [60, 120, 300, 600, 1200], // win amounts for symbol 5
            [70, 140, 350, 700, 1400], // win amounts for symbol 6
            [80, 160, 400, 800, 1600], // win amounts for symbol 7
            [90, 180, 450, 900, 1800] // win amounts for symbol 8

        ];
        return winAmounts[symbolIndex][consecutiveReels - 3];
    }
}



export { spinReels };