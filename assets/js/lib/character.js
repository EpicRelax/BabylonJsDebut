function character () {
    BABYLON.SceneLoader.ImportMesh("", "./assets/3dModel/DemoveBonnie/source/", "Bonnie2.gltf", scene, function (meshes, particleSystems, skeletons) {
        let bonnie = meshes[0];
        bonnie.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3);     
     });
};

export { character }ù