import * as THREE from "three";

export default function getStarfield({ numStars = 500 } = {}) {

  function getRandomNumber(min, max) {
    // Ensure min and max are numbers
    if (typeof min !== 'number' || typeof max !== 'number') {
      throw new Error('Both min and max must be numbers');
    }
  
    // If min is greater than max, swap them
    if (min > max) {
      [min, max] = [max, min];
    }
  
    // Generate a random number between min and max
    const randomNumber = Math.random() * (max - min) + min;
  
    return randomNumber;
  }

  function randomSpherePoint() {
    const position = Math.random() * 50 + 50;
    let x = getRandomNumber(-position, position);
    let y =getRandomNumber(-position, position);
    let z = getRandomNumber(-position, position);

    return {
      pos: new THREE.Vector3(x, y, z)
    };
  }
  const verts = [];
  const colors = [];
  for (let i = 0; i < numStars; i += 1) {
    let p = randomSpherePoint();
    const { pos } = p;
    verts.push(pos.x, pos.y, pos.z);
    colors.push(1,1,1);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  const mat = new THREE.PointsMaterial({
    size: 0.2,
    vertexColors: true,
    map: new THREE.TextureLoader().load(
      "./assets/circle.png"
    ),
  });
  const points = new THREE.Points(geo, mat);
  return points;
}
