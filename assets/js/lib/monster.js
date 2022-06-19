function monsterFun() {
    let i = 0;
    while (i <= 10) {
        BABYLON.SceneLoader.ImportMesh("", "./assets/model3d/monster/", "monster.gltf", scene, function (meshes) {
            let monster = meshes[0];
            globalThis.monster = monster;
            monster.scaling = new BABYLON.Vector3(0.12, 0.12, 0.12);
            monster.position.x = 50 - Math.random() * 100;
            monster.position.z = 50 - Math.random() * 100;
            shadowGenerator.addShadowCaster(monster, true);
            let boxMonM = BABYLON.MeshBuilder.CreateBox(
                "boxTree",
                { width: 1, height: 10, depth: 1 },
                scene
            );
            globalThis.boxMonM = boxMonM;
            boxMonM.position = monster.position;
            let boxMat = new BABYLON.StandardMaterial("boxMat", scene);
            boxMat.alpha = 0;
            boxMonM.material = boxMat;
            boxMonM.checkCollisions = true;
            boxMonM.ellipsoid.set = (1, 3, 1);
            let delta = 0;
            const linearSpeed = 2;
            const rotation = new BABYLON.Vector3(0, 0, 0);
            setInterval(function () {
                const precision = 100;
                rotation.y = Math.floor(Math.random() * (Math.PI * 2));
            }, 1500);
            scene.registerBeforeRender((e) => {
                delta = e.deltaTime ? e.deltaTime / 1000 : 0;
                boxMonM.moveWithCollisions(new BABYLON.Vector3(-parseFloat(Math.sin(boxMonM.rotation.y)) / -linearSpeed, 0, -parseFloat(Math.cos(boxMonM.rotation.y)) / -linearSpeed));
                boxMonM.rotation.y = rotation.y;
                monster.rotation.y = rotation.y;
                monster.position = new BABYLON.Vector3(boxMonM.position.x, 0, boxMonM.position.z);
            });
        });
        i++;
    }
}

export { monsterFun };