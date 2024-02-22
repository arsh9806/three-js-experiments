import * as THREE from "three";
import { renderScene } from "../commonUtils";

const renderCube = function () {
  const { scene, camera, renderer } = renderScene();
  //materia or stuff we need to render
  const material = new THREE.MeshBasicMaterial({ color: "white", wireframe: true });
  //what should be the shape of the stuff we are rendeing
  const geometry = new THREE.BoxGeometry(10, 10, 10);
  //getting togeather geometry and material we can generate the object
  const cube = new THREE.Mesh(geometry, material);
  //add the object to the scene
  scene.add(cube);
  //need to move the camera back since both camera and object are at (0,0,0)
  camera.position.z = 30;

  //we use animate function to rerender the scene
  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.001;
    cube.rotation.y += 0.001;
    renderer.render(scene, camera);
  }
  animate();
};

export default renderCube;
