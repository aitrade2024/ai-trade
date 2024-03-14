import * as THREE from 'three';

import { useScene, useTick } from './render/init.js';
import vertexShaderPars from './shaders/vertex_pars.glsl.js';
import vertexShaderMain from './shaders/vertex_main.glsl.js';
import fragmentShaderMain from './shaders/fragment_main.glsl.js';
import fragmentShaderPars from './shaders/fragment_pars.glsl.js';

const startApp = () => {
  const scene = useScene();

  const purpleColor = new THREE.Color(0xEDDDED);
  const dirLight = new THREE.DirectionalLight(purpleColor, 0.7);
  dirLight.position.set(1, 1, 1);

  const ambientLight = new THREE.AmbientLight('#4255ff', 0.8);
  scene.add(dirLight, ambientLight);

  const geometry = new THREE.IcosahedronGeometry(1, 200);
  const material = new THREE.MeshStandardMaterial({
    onBeforeCompile: (shader) => {
      material.userData.shader = shader;
      shader.uniforms.uTime = { value: 0 };

      const parsVertexString = /* glsl */ `#include <displacementmap_pars_vertex>`;
      shader.vertexShader = shader.vertexShader.replace(
        parsVertexString,
        parsVertexString + vertexShaderPars
      )

      const mainVertexString = /* glsl */ `#include <displacementmap_vertex>`;
      shader.vertexShader = shader.vertexShader.replace(
        mainVertexString,
        mainVertexString + vertexShaderMain
      )

      const parsFragmentString = /* glsl */ `#include <bumpmap_pars_fragment>`;
      shader.fragmentShader = shader.fragmentShader.replace(
        parsFragmentString,
        parsFragmentString + fragmentShaderPars
      );

      const mainFragmentString = /* glsl */ `#include <normal_fragment_maps>`;
      shader.fragmentShader = shader.fragmentShader.replace(
        mainFragmentString,
        mainFragmentString + fragmentShaderMain
      );

      shader.uniforms.color = { value: new THREE.Vector3(1.0, 0.0, 1.0) };
    },
    roughness: 0
  });
  
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  useTick(({ timestamp, timeDiff }) => {
    const time  = timestamp / 5000;
    material.userData.shader.uniforms.uTime.value = time;
  })
};

export default startApp;
