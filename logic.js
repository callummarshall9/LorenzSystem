var pathHelix = [];
var createScene = function(engine, canvas) {

	var scene = new BABYLON.Scene(engine);
	scene.clearColor = new BABYLON.Color3(0.8, 0.8, 0.8);
	var camera = new BABYLON.ArcRotateCamera("Camera", 3 *Math.PI / 2, Math.PI / 2, 50, BABYLON.Vector3.Zero(), scene);
	camera.attachControl(canvas, true);

	// lights
	var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);
	light.groundColor = new BABYLON.Color3(0.2, 0.2, 0.5);
	light.intensity = 0.6;

	var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(-20, 0, -20), scene);
	light2.diffuse = BABYLON.Color3.White();
	light2.specular = BABYLON.Color3.Green();
	light2.intensity = 0.6;

	// material
	var mat = new BABYLON.StandardMaterial("mat1", scene);
	mat.alpha = 1.0;
	mat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 1.0);
	mat.wireframe = true;

    var x = 0.01, y = 0.01, z = 0.01,
        rho = 28, sigma = 10, beta = 8.0/3.0, dt = 0.01;

	var lines = BABYLON.MeshBuilder.CreateLines("helixLines", {points: pathHelix, updatable: true}, scene);
	scene.registerBeforeRender(function(){
		light2.position = camera.position;
    if(pathHelix.length > 10000) {
      pathHelix = [];//Reset array size to avoid excessiv ememory usage.
    }
        // ribbon update
        x = x + (sigma * (y - x)) * dt;
        y = y + (x * (rho - z) - y) * dt;
        z = z + (x * y - beta * z) * dt;
		pathHelix.push( new BABYLON.Vector3(x,y,z) );
	    var lines = BABYLON.MeshBuilder.CreateLines("helixLines", {points: pathHelix, updatable: true}, scene);
          lines.color = BABYLON.Color3.Blue();
	});
	return scene;
};


function pageLoaded() {
  var canvas = document.getElementById("renderCanvas");
  var engine = new BABYLON.Engine(canvas, true);
  var scene = createScene(engine, canvas);
  engine.runRenderLoop(function() {
    scene.render();
  });
  window.addEventListener("resize", function() {
    engine.resize();
  });
}
window.addEventListener('DOMContentLoaded', function() {
    pageLoaded();
  });
