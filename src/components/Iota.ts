import * as THREE from 'three';
import { iotaPalette } from '../colors';
import {
  IotaPrefs,
  IotaSystemOptions
} from '../types';
import prefs from './prefs';
import { rand } from '../utils';

export default class Iota extends THREE.Object3D {
  geometry: THREE.SphereBufferGeometry;
  material: THREE.MeshLambertMaterial;
  mesh: THREE.Mesh;
  prefs: IotaPrefs;
  velocity: number[];

  constructor({ worldSize }: IotaSystemOptions) {
    super();

    this.geometry = new THREE.SphereBufferGeometry(5, 32, 32);
    this.material = new THREE.MeshLambertMaterial({
      color: '#277ec9',
      transparent: true,
      opacity: 1.0
    })
    
    this.mesh = new THREE.Mesh(this.geometry, this.material);

		const glowMesh = new GlowMesh(this.mesh);

		this.mesh.add(glowMesh.object3d);



    const [x, y, z] = this.getStartPosition(worldSize);
    const color = this.getRandomColor();

    this.mesh.position.set(x, y, z);
    this.velocity = this.getVelocity();
    this.material.color.set(color);
    this.material.reflectivity = 0.2;
    this.prefs = prefs.getInitialPrefs();
  }

  getStartPosition(worldSize: number): number[] {
    const x = rand(-worldSize, worldSize);
    const y = rand(-worldSize, worldSize);
    const z = rand(-worldSize, worldSize);

    return [x, y, z];
  }

  getPaletteColor(): number {
    return iotaPalette[Math.floor(rand(0, iotaPalette.length))];
  }

  getRandomColor(): string {
    const h = Math.ceil(rand(0, 360));
		const s = Math.ceil(rand(20, 100));
    const l = Math.ceil(rand(20, 80));

    return `hsl(${h}, ${s}%, ${l}%)`;
  }

  getVelocity(): number[] {
    return [rand(-1, 1), rand(-1, 1), rand(-1, 1)];
  }
}

class GlowMesh {

	object3d: THREE.Object3D;
	insideMesh: THREE.Mesh;
	outsideMesh: THREE.Mesh;

	constructor(mesh: THREE.Mesh) {
		this.object3d	= new THREE.Object3D

		const innerGeometry = new THREE.SphereBufferGeometry(5, 32, 32);
		const innerMaterial = createAtmosphereMaterial()

		innerMaterial.uniforms.glowColor.value	= new THREE.Color('magenta')
		innerMaterial.uniforms.coeficient.value = 1.1
		innerMaterial.uniforms.power.value	= 1.4
		this.insideMesh = new THREE.Mesh(innerGeometry, innerMaterial );
		this.object3d.add(this.insideMesh);
	
		const outerGeometry = new THREE.SphereBufferGeometry(7, 32, 32);
		const outerMaterial = createAtmosphereMaterial()

		outerMaterial.uniforms.glowColor.value	= new THREE.Color('cyan')
		outerMaterial.uniforms.coeficient.value	= 0.1
		outerMaterial.uniforms.power.value	= 1.2
		outerMaterial.side	= THREE.BackSide
		this.outsideMesh = new THREE.Mesh(outerGeometry, outerMaterial);
		this.object3d.add(this.outsideMesh);
	}

}

/**
 * from http://stemkoski.blogspot.fr/2013/07/shaders-in-threejs-glow-and-halo.html
 * @return {[type]} [description]
 */
function createAtmosphereMaterial(){
	const vertexShader	= `
		varying vec3	vVertexWorldPosition;
		varying vec3	vVertexNormal;

		varying vec4	vFragColor;

		void main(){
			vVertexNormal	= normalize(normalMatrix * normal);

			vVertexWorldPosition	= (modelMatrix * vec4(position, 1.0)).xyz;

			// set gl_Position
			gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		}`

	const fragmentShader	= `
		uniform vec3	glowColor;
		uniform float	coeficient;
		uniform float	power;

		varying vec3	vVertexNormal;
		varying vec3	vVertexWorldPosition;

		varying vec4	vFragColor;

		void main(){
			vec3 worldCameraToVertex= vVertexWorldPosition - cameraPosition;
			vec3 viewCameraToVertex	= (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;
			viewCameraToVertex	= normalize(viewCameraToVertex);
			float intensity		= pow(coeficient + dot(vVertexNormal, viewCameraToVertex), power);
			gl_FragColor		= vec4(glowColor, intensity);
		}`

	const material	= new THREE.ShaderMaterial({
		uniforms: { 
			coeficient	: {
				type	: "f", 
				value	: 1.0
			},
			power		: {
				type	: "f",
				value	: 2
			},
			glowColor	: {
				type	: "c",
				value	: new THREE.Color('pink')
			},
		},
		vertexShader	: vertexShader,
		fragmentShader	: fragmentShader,
		//blending	: THREE.AdditiveBlending,
		transparent	: true,
		depthWrite	: false,
	});

	return material;
}

