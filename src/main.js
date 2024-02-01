import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { DragControls } from "three/addons/controls/DragControls.js";

// app
const app = document.querySelector("#app");

//renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
app.appendChild(renderer.domElement);
document.body.appendChild(renderer.domElement);

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("white");

// perspective camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(0, 0, 100);

// light
const ambientLight = new THREE.AmbientLight("white", 0.2);

// control
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.05;
orbitControls.screenSpacePanning = false;
orbitControls.enableRotate = true;
orbitControls.rotateSpeed = 0.5;
orbitControls.enableZoom = true;
orbitControls.zoomSpeed = 0.5;
orbitControls.minDistance = 100;
orbitControls.maxDistance = 10000;
orbitControls.target = new THREE.Vector3(0, 0, 0);

// resize
const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener("resize", onResize);

/* 
DRAWING//////////////////////////////////////////////////////////////////////////////
*/

let path = [];
let i = 0;
let x, y, z;

//Sphere rendering properties
const sphereMaterial = new THREE.MeshStandardMaterial({ color: "black" });
const sphereGeometry = new THREE.SphereGeometry(0.5, 64, 64);
x = 0;
y = 0;
z = 0;

const animate = () => {
  requestAnimationFrame(animate);
  path[i] = new THREE.Mesh(sphereGeometry, sphereMaterial.clone());
  path[i].position.set(x, y, z);

  let c = Math.random() * 3;
  let n = Math.random();
  let k = 0;
  if (n < 0.5) {
    k = 1.5;
  } else {
    //negative
    k = -1.5;
  }

  console.log(c);
  if (c < 1) {
    x += k;
  }
  if (c > 2) {
    y += k;
  }
  if (c < 2 && c > 1) {
    z += k;
  }

  for (let i = 0; i < path.length; i++) {
    let a = Math.random();
    if (a < 0.1) {
      path[i].material.emissive.setHex(0xa020f0);
    } else {
      path[i].material.emissive.setHex(0x000000);
    }
  }

  scene.add(path[i]);
  renderer.render(scene, camera);

  i++;
};

animate();
