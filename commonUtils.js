import * as THREE from "three";

export const renderScene = function () {
    const scene = new THREE.Scene();
    //need a camera to view the things
    const camera = new THREE.PerspectiveCamera(
      75, //feild of view in degrees
      window.innerWidth / window.innerHeight, //aspect ration
      0.1, //near point
      1000 //far point
    );
  
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
  
    return {
      scene, camera, renderer
    }
  };