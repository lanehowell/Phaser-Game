// PRELOAD SCENE HANDLES LOADING OF ALL ASSETS NEEDED FOR GAME

import { MAP_KEYS } from "../../assets/maps/mapKeys.js";
import { SCENE_KEYS } from "./SceneKeys.js";
import { StartingMapScene } from "./StartingMapScene.js";

export class PreloadScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.PRELOAD_SCENE
        })
    }

    preload() {

        // Load Tilemap
        const mapsPath = 'assets/maps/'
        this.load.tilemapTiledJSON(MAP_KEYS.STARTING_MAP, `${mapsPath}startingMap.JSON`)

        // Load Tilesets used for map
        this.load.image('floors_tiles', 'assets/maps/mapTilesets/Floors_Tiles.png')
        this.load.image('wall_tiles', 'assets/maps/mapTilesets/Wall_Tiles.png')
        this.load.image('water_tiles', 'assets/maps/mapTilesets/Water_Tiles.png')

        //Load Player
        this.load.spritesheet('player', 'assets/sprites/player/Idle-Sheet.png', { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('playerRun', 'assets/sprites/player/Run-Sheet.png', { frameWidth: 32, frameHeight: 32 })


    }

    create() {

        this.scene.start(SCENE_KEYS.STARTING_MAP_SCENE, StartingMapScene)

    }
}