function tree () {
        for(let i = 0; i <= 100; i ++) {
            BABYLON.SceneLoader.ImportMesh("", "./assets/model3d/tree/", "scene.gltf", scene, function (meshes) {
                let mesh = meshes[0];
                mesh.scaling = new BABYLON.Vector3(0.5 ,0.5 ,0.5)
                mesh.position.x = 30 - Math.random() * 60;
                mesh.rotation.y = 0 - Math.random() * 20;
                mesh.position.y = -0.3;
                mesh.position.z = 30 - Math.random() * 60;
                shadowGenerator.addShadowCaster(mesh, true);
                let boxTree = BABYLON.MeshBuilder.CreateBox(
                    "boxTree",
                    { width: 1, height: 5, depth: 1 },
                    scene
                );
                boxTree.position = mesh.position;
                let boxMat = new BABYLON.StandardMaterial("boxMat", scene);
                boxMat.alpha = 0;
                boxTree.material = boxMat;
                boxTree.checkCollisions = true;
                boxTree.ellipsoid.set = (1, 3, 1);
            
        })
    }
};

export {tree};