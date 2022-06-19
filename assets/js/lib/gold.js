function gold () {
    let i = 0;
    while( i <= 10) {
        let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 1}, scene);
        sphere.position.x = 50 - Math.random() * 100;
        sphere.position.y = 0.5;
        sphere.position.z = 50 - Math.random() * 100;
        sphere.material = new BABYLON.StandardMaterial("sphereMat", scene);
        sphere.material.emissiveColor = new BABYLON.Color3.Yellow();
        glowLayer.addIncludedOnlyMesh(sphere);
        i ++;
   }
};

export {gold};