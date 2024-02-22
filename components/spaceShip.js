import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { renderScene } from "../commonUtils";

const renderObject = function () {

    const { scene, camera, renderer } = renderScene({ fov: 45 });
    // Setup camera position
    camera.position.z = 20;
    camera.position.y = 20;
    camera.position.x = 20;
    //any new object is added at 0,0,0 we need to make camera look at correct position
    camera.lookAt(0,5,0)
    
    // Create a renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;

    document.body.appendChild(renderer.domElement);
    
    // Create an OBJLoader -> this will load an external object
    //specifically GLTF files
    const loader = new GLTFLoader();
    let loadedObj;
    // Load the gltf file
    loader.load('./assets/millennium_falcon/scene.gltf', (obj) => {
        // Add the loaded object to the scene
        const mesh = obj.scene;
        //generate shadows
        mesh.traverse((child) => {
            if(child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        })
        mesh.position.set(0, 0, 0);
        mesh.rotation.z = 0.30;
        mesh.rotation.y = -30;
        mesh.position.y = 3;
        //add object to scene
        scene.add(mesh);
        loadedObj = obj;
    }, undefined, (err) => {
        console.error(err);
    });

    //used to get references on UI about X Y and Z axis
    // const axesHelper = new THREE.AxesHelper(50);
    // scene.add(axesHelper);
    // X axis = red. 
    // Y axis = green
    // Z axis = blue.

    //need lights to see the imported object
    const spotLight = new THREE.SpotLight(0xffffff, 100000,800,0.2,0.5);

    spotLight.position.set(0, 90, 0);
    spotLight.castShadow = true;
    spotLight.shadow.bias = -0.0001;
    spotLight.lookAt(0,0,0);
    scene.add(spotLight)

    //OrbitControls helps us to freely control the scene with mouse
    const controls = new OrbitControls( camera, renderer.domElement ); 

    //setup ground
    const groudGeomeatry = new THREE.CircleGeometry(20, 100);
    groudGeomeatry.rotateX(-Math.PI / 2);
    const groudMaterial = new THREE.MeshStandardMaterial({color: 0x555555, side: THREE.DoubleSide});
    const ground = new THREE.Mesh(groudGeomeatry, groudMaterial);
    ground.receiveShadow = true;
    scene.add(ground);
    
    // Create an animate function (calls roughly 60 times per second) automatically updated the ui
    const animate = function () {
        // Rotate the loaded object (optional)
        if (loadedObj) {
            // 
            loadedObj.scene.rotation.y -= 0.004;
            controls.update();
        }
        requestAnimationFrame(animate);
        // Render the scene
        renderer.render(scene, camera);
    };
    // Call the animate function
    animate();
    
};

export default renderObject;
