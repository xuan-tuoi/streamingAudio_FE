//loading
const textureLoader = new THREE.TextureLoader();
const normalTextureLoader = textureLoader.load("/img/NormalMap.png");

// Debug
// const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");
// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64);
// Materials

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.normalMap = normalTextureLoader;
material.color = new THREE.Color(0x79caef);
// Mesh
const sphere = new THREE.Mesh(geometry, material);
sphere.position.x = -0.47;
scene.add(sphere);

const pointLight = new THREE.PointLight(0x6aef7, 4.9);
pointLight.position.x = 2.39;
pointLight.position.y = -1.18;
pointLight.position.z = -3;
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0xff0000, 5.23);
pointLight2.position.set(-2.16, 1.79, -1.72);
pointLight2.intensity = 1;
scene.add(pointLight2);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.5);
const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 0.5);

// var ambientLight = new THREE.AmbientLight(0xffffff, 6);
// scene.add(ambientLight);
// var light1 = new THREE.PointLight(0xffffff, 10, 100);
// light1.position.set(50, 50, 50);
// scene.add(light1);

// scene.add(pointLightHelper);
// scene.add(pointLightHelper2);
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

controls = new THREE.OrbitControls(camera, renderer.domElement);

//skybox
// var skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
// var cubeMaterials = [
//   new THREE.MeshBasicMaterial({
//     map: new THREE.TextureLoader().load("../texture/moonnight/px.png"),
//     side: THREE.BackSide,
//   }),
//   new THREE.MeshBasicMaterial({
//     map: new THREE.TextureLoader().load("../texture/moonnight/nx.png"),
//     side: THREE.BackSide,
//   }),
//   new THREE.MeshBasicMaterial({
//     map: new THREE.TextureLoader().load("../texture/moonnight/py.png"),
//     side: THREE.BackSide,
//   }),
//   new THREE.MeshBasicMaterial({
//     map: new THREE.TextureLoader().load("../texture/moonnight/ny.png"),
//     side: THREE.BackSide,
//   }),
//   new THREE.MeshBasicMaterial({
//     map: new THREE.TextureLoader().load("../texture/moonnight/pz.png"),
//     side: THREE.BackSide,
//   }),
//   new THREE.MeshBasicMaterial({
//     map: new THREE.TextureLoader().load("../texture/moonnight/nz.png"),
//     side: THREE.BackSide,
//   }),
// ];
// var skybox = new THREE.Mesh(skyboxGeo, cubeMaterials);
// scene.add(skybox);

/**
 * Animate
 */

document.addEventListener("mousemove", onMouseMove);

let mouseX = 0,
  mouseY = 0;
let targetX = 0,
  targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

const clock = new THREE.Clock();

const tick = () => {
  targetX = mouseX * 0.004;
  targetY = mouseY * 0.004;
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.25 * elapsedTime;
  sphere.rotation.y += 0.25 * (targetX - sphere.rotation.y);
  sphere.rotation.x += 0.25 * (targetY - sphere.rotation.x);

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
