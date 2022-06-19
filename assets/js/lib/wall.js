function wall () {
    let wall = BABYLON.MeshBuilder.CreateBox(
        "wall",
        { width: 105, height: 5, depth: 1 },
        scene
    );
    const wallMat = new BABYLON.StandardMaterial("wallMat");
	wallMat.diffuseTexture = new BABYLON.Texture("./assets/textures/wallTexture.jpg");

	wallMat.diffuseTexture.uScale = 10;
    wallMat.specularColor = new BABYLON.Color3(0, 0, 0);
    wall.material = wallMat;
    wall.position = new BABYLON.Vector3(0, 2, 52);
    wall.checkCollisions = true;
    wall.ellipsoid.set = (202, 3, 1);
    shadowGenerator.addShadowCaster(wall, true);
    wall.receiveShadows = true;

    let posWall = [
        new BABYLON.Vector3(0, 2, -52),
        new BABYLON.Vector3(-52, 2, 0),
        new BABYLON.Vector3(52, 2, 0)
    ]

    let rotWall = [
        0,
        (Math.PI / 2),
        (Math.PI / 2)
    ]

    let i = 0;
    while ( i < posWall.length){
        let wallInstance = wall.createInstance("wall" + i);
        wallInstance.position = posWall[i];
        if (i>=1) {
            wallInstance.position = posWall[i];
            wallInstance.rotation.y = rotWall[i];
            wallInstance.checkCollisions = true;
            wallInstance.ellipsoid.set = (25, 3, 1);
            i++
        }else {
            wallInstance.position = posWall[i];
            wallInstance.checkCollisions = true;
            wallInstance.ellipsoid.set = (25, 3, 1);
            i ++
        };
    };    
}

export { wall };