import { PreloadScene } from "./scenes/PreloadScene.js";
import { StartingMapScene } from "./scenes/StartingMapScene.js";

const config = {
    type: Phaser.CANVAS,
    width: '100%',
    height: '100%',
    parent: 'canvas',
    scene: [PreloadScene, StartingMapScene],
    scale: {
        mode: Phaser.Scale.RESIZE
    }
}

const game = new Phaser.Game(config)

window.addEventListener('resize', () => {
    game.canvas.height = window.innerHeight - 50
    game.canvas.width = window.innerWidth
});