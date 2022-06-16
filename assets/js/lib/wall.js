function wall () {
    const wallMat = new BABYLON.StandardMaterial("wallMat");
	wallMat.diffuseTexture = new BABYLON.Texture("./assets/textures/wallTexture.jpg");

	wallMat.diffuseTexture.uScale = 10;
    
    let wall = BABYLON.MeshBuilder.CreateBox(
        "wall",
        { width: 25, height: 3, depth: 1 },
        scene
    );
    wall.position.y = 1.5;
    wall.position.z = 10;
	wall.material = wallMat;

    let wall2 = BABYLON.MeshBuilder.CreateBox(
        "wall",
        { width: 25, height: 3, depth: 1 },
        scene
    );
    wall2.position.y = 1.5;
    wall2.position.x = 10;
    wall2.rotation.y = (20.4);
	wall2.material = wallMat;

    let wall3 = BABYLON.MeshBuilder.CreateBox(
        "wall",
        { width: 25, height: 3, depth: 1 },
        scene
    );
    wall3.position.y = 1.5;
    wall3.position.x = -10;
    wall3.rotation.y = (20.4);
	wall3.material = wallMat;

    let wall4 = BABYLON.MeshBuilder.CreateBox(
        "wall",
        { width: 25, height: 3, depth: 1 },
        scene
    );
    wall4.position.y = 1.5;
    wall4.position.z = -10;
	wall4.material = wallMat;
}

export { wall };