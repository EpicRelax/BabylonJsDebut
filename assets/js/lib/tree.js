function tree () {
        let i = 0;
        while( i <= 200) {
            BABYLON.SceneLoader.ImportMesh("", "./assets/model3d/tree/", "scene.gltf", scene, function (meshes) {
                let mesh = meshes[0];
                mesh.scaling = new BABYLON.Vector3(0.7 ,0.7 ,0.7)
                mesh.position.x = 50 - Math.random() * 100;
                mesh.rotation.y = 0 - Math.random() * 20;
                mesh.position.y = -0.3;
                mesh.position.z = 50 - Math.random() * 100;
                shadowGenerator.addShadowCaster(mesh, true);
                let boxTree = BABYLON.MeshBuilder.CreateBox(
                    "boxTree",
                    { width: 1, height: 10, depth: 1 },
                    scene
                );
                boxTree.position = mesh.position;
                let boxMat = new BABYLON.StandardMaterial("boxMat", scene);
                boxMat.alpha = 0;
                boxTree.material = boxMat;
                boxTree.checkCollisions = true;
                boxTree.ellipsoid.set = (1, 3, 1);
            });
            i ++;
       }
};

export {tree};