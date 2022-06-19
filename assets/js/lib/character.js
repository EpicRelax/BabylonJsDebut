function character () {
    let box = BABYLON.MeshBuilder.CreateBox(
        "box",
        { width: 1, height: 2.5, depth: 1 },
        scene
    );
    globalThis.box = box;
    box.position = new BABYLON.Vector3(0, 0.5, 0);
    let boxMat = new BABYLON.StandardMaterial("boxMat", scene);
    boxMat.alpha = 0;
    box.material = boxMat;

    BABYLON.SceneLoader.ImportMesh("", "./assets/model3d/", "Bonnie.gltf", scene, function (meshes, skeletons, animationGroups) {
        const bonnie = meshes[0];
        globalThis.bonnie = bonnie;
        bonnie.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
        bonnie.position.y = 0;
        camera.target = box;
        shadowGenerator.addShadowCaster(bonnie, true);
        bonnie.receiveShadows = true;
        bonnie.checkCollisions = true;
        bonnie.ellipsoid.set = (10, 10, 10);
        const idleAnim = scene.getAnimationGroupByName("idle");
        globalThis.idleAnim = idleAnim;
        const runAnim = scene.getAnimationGroupByName("running");
        globalThis.runAnim = runAnim;
        idleAnim.start(true, 1.0, idleAnim.from, idleAnim.to, false);
        
        characterMov();
     });
};

function characterMov () {
    const input = {
        forward:false,
        left:false,
        right:false
    }
    scene.onKeyboardObservable.add((kbInfo) => {
        switch (kbInfo.type) {
            case BABYLON.KeyboardEventTypes.KEYDOWN:
                //console.log("KEY DOWN: ", kbInfo.event.key);
                switch (kbInfo.event.key) {
                    case 'z':
                        //console.log("KEY DOWN: ", kbInfo.event.key);
                        input.forward = true;
                        idleAnim.stop();
                        runAnim.start(true, 1.0, runAnim.from, runAnim.to, false);
                        break;
                    case 'q':
                        input.right = true;
                        break;  
                    case 'd':
                        input.left = true;
                        break;       
                }
                break;
            case BABYLON.KeyboardEventTypes.KEYUP:
                switch (kbInfo.event.key) {
                    case 'z':
                        //console.log("KEY DOWN: ", kbInfo.event.key);
                        input.forward = false;
                        runAnim.stop();
                        idleAnim.start(true, 1.0, idleAnim.from, idleAnim.to, false);
                        break;
                    case 'q':
                        input.right = false;
                        break;  
                    case 'd':
                        input.left = false;
                        break;     
                }
                break;
        }
    });
    let delta = 0;
    const linearSpeed = 5;
    const angularSpeed = 5;
    const rotation = new BABYLON.Vector3(0,0,0);
    scene.registerBeforeRender((e)=>{
        delta = e.deltaTime ? e.deltaTime/1000 : 0;
        rotation.set(0,0,0);
        if(input.forward){
            box.moveWithCollisions(new BABYLON.Vector3(-parseFloat(Math.sin(box.rotation.y)) / -linearSpeed, 0, -parseFloat(Math.cos(box.rotation.y)) / -linearSpeed));
        }
        if(input.left){
            rotation.y = -angularSpeed*delta;
        }
        if(input.right){
            rotation.y = angularSpeed*delta;
        }
        bonnie.rotation.y += rotation.y;
        box.rotation.y += rotation.y;
        box.position.y = 2;
        bonnie.position = new BABYLON.Vector3(box.position.x, 0, box.position.z);

    })
};

export { character };