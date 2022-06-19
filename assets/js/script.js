import { character } from "./lib/character.js";
import { wall } from "./lib/wall.js";
import { house } from "./lib/house.Js";
import { tree } from "./lib/tree.js";
import { walkplay,walkstop } from "./lib/walkSound.js";

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
let createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    let scene = new BABYLON.Scene(engine);
    scene.collisionsEnabled = true;
    globalThis.scene = scene;
    // Parameters : name, position, scene
    let camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 7, new BABYLON.Vector3(0, 0, 0), scene);
    camera.inputs.remove(camera.inputs.attached.mousewheel);
    globalThis.camera = camera;
    
    camera.attachControl(canvas, true);
    scene.useRightHandedSystem = true;
    camera.checkCollision = true
    
    canvas.addEventListener("click", event => {
        canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
        if(canvas.requestPointerLock) {
        canvas.requestPointerLock();
        }
        });

    let light = new BABYLON.DirectionalLight("light", new BABYLON.Vector3(10,-20,-30), scene);
    light.intensity = 2;

    let light2 = new BABYLON.HemisphericLight("light2", new BABYLON.Vector3(0, 1, 0), scene);
    light2.intensity = 0.3;

    let shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
    shadowGenerator.bias = 0.001;
	shadowGenerator.normalBias = 0.02;
	light.shadowMaxZ = 100;
	light.shadowMinZ = 0;
	shadowGenerator.useContactHardeningShadow = true;
	shadowGenerator.contactHardeningLightSizeUVRatio = 0.05;
	shadowGenerator.setDarkness(0.1);
    globalThis.shadowGenerator = shadowGenerator;

	const groundMat = new BABYLON.StandardMaterial("groundMat");
	groundMat.diffuseTexture = new BABYLON.Texture("./assets/textures/groundTexture.png");

	groundMat.diffuseTexture.uScale = 5.0;
	groundMat.diffuseTexture.vScale = 5.0;
    groundMat.specularColor = new BABYLON.Color3(0, 0, 0);

    // Built-in 'ground' shape.
    let ground = BABYLON.MeshBuilder.CreateGround(
        "ground",
        { width: 70, height: 70 },
        scene
    );

	ground.material = groundMat;7

    ground.receiveShadows = true;

	wall();
    character();
    tree();

    return scene;
};

const scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});
window.addEventListener("resize", function () {
    engine.resize();
});
