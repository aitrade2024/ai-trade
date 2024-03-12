import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import TickManager from './tick-manager.js';

let scene,
  camera,
  renderer,
  composer,
  controls,
  stats,
  gui,
  renderWidth,
  renderHeight,
  renderAspectRatio
const renderTickManager = new TickManager();

export const initEngine = async (container) => {
  scene = new THREE.Scene();

  renderWidth = container.clientWidth;
  renderHeight = container.clientHeight;

  renderAspectRatio = renderWidth / renderHeight;

  camera = new THREE.PerspectiveCamera(45, renderAspectRatio, 0.1, 100);
  camera.position.z = 4;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(renderWidth, renderHeight);
  renderer.setPixelRatio(window.devicePixelRatio * 1.5);

  renderer.setClearColor(new THREE.Color("rgba(0, 0, 0, 0)"), 0);

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  document.getElementById('canvasContainer').appendChild(renderer.domElement);

  const target = new THREE.WebGLRenderTarget(renderWidth, renderHeight, {
    samples: 8,
  });
  composer = new EffectComposer(renderer, target);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  window.addEventListener(
    'resize',
    () => {
      renderWidth = container.clientWidth;
      renderHeight = container.clientHeight;
      renderAspectRatio = renderWidth / renderHeight;

      renderer.setPixelRatio(window.devicePixelRatio * 1.5);

      camera.aspect = renderAspectRatio;
      camera.updateProjectionMatrix();

      renderer.setSize(renderWidth, renderHeight);
      composer.setSize(renderWidth, renderHeight);
    },
    false
  );

  renderTickManager.startLoop();
}

export const useRenderer = () => renderer;

export const useRenderSize = () => ({ width: renderWidth, height: renderHeight });

export const useScene = () => scene;

export const useCamera = () => camera;

export const useControls = () => controls;

export const useStats = () => stats;

export const useComposer = () => composer;

export const useGui = () => gui;

export const addPass = (pass) => {
  composer.addPass(pass)
};

export const useTick = (fn) => {
  if (renderTickManager) {
    const _tick = (e) => {
      fn(e.data)
    }
    renderTickManager.addEventListener('tick', _tick)
  }
};
