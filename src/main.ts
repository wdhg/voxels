import * as THREE from "three";
import { Game, initGame, render } from "./game";
import { generateVoxels, forEachVoxel } from "./voxels";

const game: Game = initGame();

// create light
const ambient = new THREE.AmbientLight(0xffffff, 0.3);
const light = new THREE.PointLight(0xffffff, 1, 500);
light.position.set(50, 50, 30);
light.lookAt(0, 0, 0);
game.scene.add(ambient);
game.scene.add(light);

const animate = () => {
  requestAnimationFrame(animate);
  render(game);
  // framerate
  const deltaTime = game.clock.getDelta();
  if (deltaTime > 0) {
    game.details.innerText = "FPS: " + (1 / deltaTime).toFixed(2).toString();
  }
};

const makeBox = (position: THREE.Vector3, size: number) => {
  const geometry = new THREE.BoxGeometry(size, size, size);
  const material = new THREE.MeshLambertMaterial({ color: 0x00a412 });
  const box = new THREE.Mesh(geometry, material);
  box.position.set(position.x, position.y, position.z);
  game.scene.add(box);
};

const size = 16;
const voxels = generateVoxels(0, size);
forEachVoxel(voxels, makeBox);

game.camera.position.set(size / 2, size * 0.55, size * 1.5);
game.camera.lookAt(size / 2, size / 2, size / 2);

animate();
