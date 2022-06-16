import { character } from "./lib/character.js";
import { wall } from "./lib/wall.js";

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
let createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    let scene = new BABYLON.Scene(engine);
    globalThis.scene = scene;

    scene.useRightHandedSystem = true;

    // This creates and positions a free camera (non-mesh)
    let camera = new BABYLON.ArcRotateCamera(
        "camera1",
        -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0),
        scene
    );

    // This targets the camera to scene origin
    //camera.setTarget(BABYLON.Vector3.Zero());


    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    let light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );
    light.intensity = 0.7;

	const groundMat = new BABYLON.StandardMaterial("groundMat");
	groundMat.diffuseTexture = new BABYLON.Texture("./assets/textures/groundTexture.jpg");

	groundMat.diffuseTexture.uScale = 5.0;
	groundMat.diffuseTexture.vScale = 5.0;

    // Built-in 'ground' shape.
    let ground = BABYLON.MeshBuilder.CreateGround(
        "ground",
        { width: 20, height: 20 },
        scene
    );
	ground.material = groundMat;

	wall();
    character();

    return scene;
};

const scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});
window.addEventListener("resize", function () {
    engine.resize();
});
