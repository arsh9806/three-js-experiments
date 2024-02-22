import * as THREE from "three";

export const renderScene = function ({ fov=75 }) {
    const scene = new THREE.Scene();
    //need a camera to view the things
    const camera = new THREE.PerspectiveCamera(
      fov, //feild of view in degrees
      window.innerWidth / window.innerHeight, //aspect ratio
      0.1, //nearest point of camera
      1000 //farthest point of camera
    );
  
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
  
    return {
      scene, camera, renderer
    }
  };