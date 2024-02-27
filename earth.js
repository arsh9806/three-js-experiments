import * as T from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { renderScene } from "./commonUtils";
import getStarfield from './getStarfield';

const renderEarth = function () {
    const { scene, camera, renderer } = renderScene();

    // Create a camera
    camera.lookAt(0, 0, 0);
    camera.position.z = 3;

    // Create a renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.innerWidth / window.innerHeight);
    document.body.appendChild(renderer.domElement);


    const loader = new T.TextureLoader();
    const geometry = new T.IcosahedronGeometry(1, 12);

    // earth daytime
    const daytimeMaterial = new T.MeshStandardMaterial({
        map: loader.load("./assets/earth/00_earthmap1k.jpg"),
        blending: T.AdditiveBlending,
    });
    const earthDaytime = new T.Mesh(geometry, daytimeMaterial);

    //earth Night time
    const nightTimeMaterial = new T.MeshStandardMaterial({
        map: loader.load("./assets/earth/8k_earth_nightmap.jpg"),
        blending: T.AdditiveBlending,
    });
    const earthNighttime = new T.Mesh(geometry, nightTimeMaterial);

    //earth Cloudy
    const cloudyEarthMaterial = new T.MeshStandardMaterial({
        map: loader.load("./assets/earth/8k_earth_clouds.jpg"),
        blending: T.AdditiveBlending,
        opacity: 0.3
    });
    const cloudyEarth = new T.Mesh(geometry, cloudyEarthMaterial);


    const earthGroup = new T.Group();
    earthGroup.add(earthDaytime);
    earthGroup.add(earthNighttime);
    earthGroup.add(cloudyEarth);
    const stars = getStarfield({ numStars: 2000 });
    scene.add(stars);

    const ozoneGeometry = new T.IcosahedronGeometry(1.01, 13);
    //creating own custom material for bluish tint
    const ozoneMaterial = new T.ShaderMaterial({
        vertexShader: `
        varying vec3 normalVector;
        void main() {
            normalVector = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
        fragmentShader: `
        varying vec3 normalVector;
        void main() {
            float intensity = 1.05 - dot(normalVector, vec3(0.0, 0.0, 1.0));
            vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 1.5);
            gl_FragColor = vec4(atmosphere, 1.0);
        }`,
        blending: T.AdditiveBlending
    });
    const ozoneLayer = new T.Mesh(ozoneGeometry, ozoneMaterial);
    earthGroup.add(ozoneLayer);

    const ozoneGlowGeometry = new T.IcosahedronGeometry(1.15, 13);
    //creating own custom material for glowing effect
    const ozoneGlowMaterial = new T.ShaderMaterial({
        vertexShader: `
        varying vec3 normalVector;
        void main() {
            normalVector = normalize(normalMatrix *normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
        fragmentShader: `
        varying vec3 normalVector;
        void main() {
            float intensity = pow(0.6 - dot(normalVector, vec3(0.0, 0.0, 1.0)), 2.0);
            gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
        }`,
        blending: T.AdditiveBlending,
        side: T.BackSide
    });
    const ozoneGlowLayer = new T.Mesh(ozoneGlowGeometry, ozoneGlowMaterial);
    earthGroup.add(ozoneGlowLayer);
    scene.add(earthGroup);

    // Create a mesh for the ozone layer
    // const ozoneLayerMesh = new T.Mesh(ozoneLayer, ozoneLayerMaterial);

    // Add the ozone layer mesh to the scene
    // scene.add(ozoneLayerMesh);


    const orbitControls = new OrbitControls(camera, renderer.domElement);
    const light = new T.AmbientLight(0xffffff, 0.3);
    light.position.set(-890, -100, 500);
    scene.add(light);
    // Create an animate function
    const animate = function () {

        orbitControls.update();
        // controls.update();
        earthGroup.rotation.y += 0.0005
        requestAnimationFrame(animate);
        // Render the scene
        renderer.render(scene, camera);
    };

    // Call the animate function
    animate();

};

export default renderEarth;
