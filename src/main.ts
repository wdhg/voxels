import * as THREE from "three";
import { Game, initGame, render } from "./game";

const game: Game = initGame();

// create light
const ambient = new THREE.AmbientLight(0xffffff, 0.3);
const light = new THREE.PointLight(0xffffff, 1, 500);
light.position.set(5, 10, -5);
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

// map generation
const size = 32;
const scale = 0.5;
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
boxGeometry.scale(scale, scale, scale);
const boxMaterial = new THREE.MeshLambertMaterial({ color: 0x00a412 });

const boxAt = (x: number, y: number, z: number) => {
  const box = new THREE.Mesh(boxGeometry, boxMaterial);
  box.position.set(x, y, z);
  game.scene.add(box);
};

for (let x: number = -size / 2; x < size / 2; x++) {
  for (let z: number = -size / 2; z < size / 2; z++) {
    const surface = Math.round(Math.random() * 2);
    for (let y = 0; y <= surface; y++) {
      boxAt(x * scale, y * scale, z * scale);
    }
  }
}

animate();