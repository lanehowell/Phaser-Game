import { MAP_KEYS } from "../../assets/maps/mapKeys.js";
import { SCENE_KEYS } from "./SceneKeys.js";

export class StartingMapScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.STARTING_MAP_SCENE
        })
    }

    create() {

        // Load Tilemap
        const map = this.make.tilemap({ key: MAP_KEYS.STARTING_MAP })
        const floors_tiles = map.addTilesetImage('Environment_floors', 'floors_tiles')
        const water_tiles = map.addTilesetImage('Environment_water', 'water_tiles')
        const wall_tiles = map.addTilesetImage('Environment_walls', 'wall_tiles')
        const ground_layer = map.createLayer('Ground', [floors_tiles, water_tiles, wall_tiles], 0, 0)
        const paths_layer = map.createLayer('Paths', floors_tiles, 0, 0)

        // Load Player
        // Retrieve player position from local storage
        const storedX = localStorage.getItem('playerX');
        const storedY = localStorage.getItem('playerY');

        const initialX = storedX ? parseInt(storedX, 10) : 100;
        const initialY = storedY ? parseInt(storedY, 10) : 100;

        this.player = this.add.sprite(initialX, initialY, 'player');
        this.player.setOrigin(0.5, 0.5);
        this.player.setFrame(0)

        this.anims.create({
            key: 'idleDown',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1,
        })

        this.player.anims.play('idleDown')

        // LOAD CAMERA
        // Follow Player
        this.cameras.main.startFollow(this.player, true)
        // Dont allow camera to leave map
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // Zoom in so map isn't tiny
        this.cameras.main.setZoom(2.5)

        this.cursors = this.input.keyboard.createCursorKeys()

        window.addEventListener('resize', () => {
            // Ensure player stays centered on resize
            this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
            this.cameras.main.centerOn(this.player.x, this.player.y)
        });

    }

    update() {

        if (this.cursors.left.isDown) {
            this.player.x -= 2;
        } else if (this.cursors.right.isDown) {
            this.player.x += 2;
        }

        if (this.cursors.up.isDown) {
            this.player.y -= 2;
        } else if (this.cursors.down.isDown) {
            this.player.y += 2;
        }

        localStorage.setItem('playerX', this.player.x.toString());
        localStorage.setItem('playerY', this.player.y.toString());
    }

}
