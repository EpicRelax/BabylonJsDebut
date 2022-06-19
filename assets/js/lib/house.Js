function house() {
    BABYLON.SceneLoader.ImportMesh("", "./assets/model3d/", "house.glb", scene, function (meshes){
        const house = meshes[0];
        house.position.y = -12;
        house.scaling = new BABYLON.Vector3(2, 2, 2);
    });
}

export {house};