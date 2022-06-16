const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
let createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    let scene = new BABYLON.Scene(engine);

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

    // Built-in 'ground' shape.
    let ground = BABYLON.MeshBuilder.CreateGround(
        "ground",
        { width: 20, height: 20 },
        scene
    );

    let wall = BABYLON.MeshBuilder.CreateBox(
        "wall",
        {width: 20, height: 3, depth : 1},
        scene
    );
    wall.position.y = 1.5;
    wall.position.z = 10;

    let wall2 = BABYLON.MeshBuilder.CreateBox(
        "wall",
        {width: 20, height: 3, depth : 1},
        scene
    );
    wall2.position.y = 1.5;
    wall2.position.x = 10;
    wall2.rotation.y = Math.PI/45 ;

    return scene;
};

const scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});
window.addEventListener("resize", function () {
    engine.resize();
});
