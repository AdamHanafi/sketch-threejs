import * as THREE from 'three';
import MathEx from 'js-util/MathEx';

import vs from './glsl/debris.vs';
import fs from './glsl/debris.fs';

export default class Debris extends THREE.Mesh {
  constructor() {
    // Define Geometries
    const geometry = new THREE.InstancedBufferGeometry();
    const baseGeometry = new THREE.OctahedronBufferGeometry(2, 0);

    // Copy attributes of the base Geometry to the instancing Geometry
    geometry.copy(baseGeometry);

    // Define attributes of the instancing geometry
    const num = 30;
    const ibaPositions = new THREE.InstancedBufferAttribute(new Float32Array(num * 3), 3);
    const ibaIds = new THREE.InstancedBufferAttribute(new Float32Array(num), 1);
    const p = THREE.Vector3();
    for (var i = 0, ul = num; i < ul; i++) {
      ibaPositions.setXYZ(i, i * 3 + 15, 0, 0);
      ibaIds.setXYZ(i, i);
    }
    geometry.addAttribute('iPosition', ibaPositions);
    geometry.addAttribute('iIds', ibaIds);

    // Define Material
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        time: {
          type: 'f',
          value: 0
        },
      },
      vertexShader: vs,
      fragmentShader: fs,
      flatShading: true,
    });

    // Create Object3D
    super(geometry, material);
    this.rotation.set(0, MathEx.radians(40), MathEx.radians(30));
    this.name = 'Debris';
  }
  start() {
  }
  update(time) {
    this.material.uniforms.time.value += time;
  }
}
