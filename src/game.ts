import {
  Renderer,
  WebGLRenderer,
  Camera,
  PerspectiveCamera,
  Scene,
  Clock,
} from "three";

interface Game {
  renderer: Renderer;
  camera: Camera;
  scene: Scene;
  clock: Clock;
  details: HTMLElement;
}

const initRenderer = (): Renderer => {
  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setClearColor("#e5e5e5");
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  return renderer;
};

const initCamera = (): Camera => {
  const camera = new PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 7, 10);
  camera.lookAt(0, 1, 0);
  return camera;
};

const initDetails = (): HTMLElement => {
  const details = document.createElement("div");
  details.style.position = "absolute";
  details.style.top = "0";
  document.body.appendChild(details);
  return details;
};

const initGame = (): Game => {
  return {
    renderer: initRenderer(),
    camera: initCamera(),
    scene: new Scene(),
    clock: new Clock(),
    details: initDetails(),
  };
};

const render = (game: Game) => {
  game.renderer.render(game.scene, game.camera);
};

export { Game, initGame, render };
