import * as THREE from 'three';
import { iotaPalette } from '../colors';
import {
  IotaPrefs,
  IotaSystemOptions
} from '../types';
import prefs from './prefs';

export default class Iota extends THREE.Object3D {
  geometry: THREE.SphereGeometry;
  // material: THREE.MeshPhysicalMaterial;
  material: THREE.MeshLambertMaterial;
  mesh: THREE.Mesh;
  prefs: IotaPrefs;
  velocity: number[];

  constructor({ worldSize }: IotaSystemOptions) {
    super();

    /**
     *   var glowMesh = new THREEx.GeometricGlowMesh(mesh);
  mesh.add(glowMesh.object3d);

  var insideUniforms  = glowMesh.insideMesh.material.uniforms;
  insideUniforms.glowColor.value.set('yellow');

  var outsideUniforms = glowMesh.outsideMesh.material.uniforms;
  outsideUniforms.glowColor.value.set('yellow');
  
  return mesh
     */

    this.geometry = new THREE.SphereGeometry(5, 32, 32);
    // this.material = new THREE.MeshPhysicalMaterial({});
    this.material = new THREE.MeshLambertMaterial({
      color: '#277ec9',
      transparent: true,
      opacity: 1.0
    })
    
    this.mesh = new THREE.Mesh(this.geometry, this.material);

		const glowMesh = new GlowMesh(this.mesh);

		this.mesh.add(glowMesh.object3d);



    const [x, y, z] = this.getStartPosition(worldSize);
    const color = this.getPaletteColor();

    this.mesh.position.set(x, y, z);
    this.velocity = this.getVelocity();
    this.material.color.set(color);
    // this.material.roughness = 0.4;
    // this.material.metalness = 0.5;
    this.material.reflectivity = 0.2;
    this.prefs = prefs.getInitialPrefs();
  }

  getStartPosition(worldSize: number): number[] {
    const x = Math.random() * -worldSize + worldSize;
    const y = Math.random() * -worldSize + worldSize;
    const z = Math.random() * -worldSize + worldSize;

    return [x, y, z];
  }

  getPaletteColor(): number {
    return iotaPalette[Math.floor(Math.random() * iotaPalette.length)];
  }

  getRandomColor(): string {
    const h = Math.ceil(Math.random() * 360);
    const s = Math.ceil(Math.random() * 50) + 50;
    const l = Math.ceil(Math.random() * 50) + 50;

    return `hsl(${h}, ${s}%, ${l}%)`;
  }

  getVelocity(): number[] {
    return [rand(-1, 1), rand(-1, 1), rand(-1, 1)];
  }
}

function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

class GlowMesh {

	object3d: THREE.Object3D;
	insideMesh: THREE.Mesh;
	outsideMesh: THREE.Mesh;

	constructor(mesh: THREE.Mesh) {
		var object3d	= new THREE.Object3D

		var geometry	= <THREE.Geometry>mesh.geometry.clone()
		dilateGeometry(geometry, 0.01)
		var material = createAtmosphereMaterial()
		material.uniforms.glowColor.value	= new THREE.Color('cyan')
		material.uniforms.coeficient.value = 1.1
		material.uniforms.power.value	= 1.4
		var insideMesh= new THREE.Mesh(geometry, material );
		object3d.add(insideMesh);
	
	
		var geometry = <THREE.Geometry>mesh.geometry.clone()
		dilateGeometry(geometry, 0.1)
		var material = createAtmosphereMaterial()
		material.uniforms.glowColor.value	= new THREE.Color('cyan')
		material.uniforms.coeficient.value	= 0.1
		material.uniforms.power.value	= 1.2
		material.side	= THREE.BackSide
		var outsideMesh	= new THREE.Mesh(geometry, material);
		object3d.add(outsideMesh);
	
		// expose a few variable
		this.object3d = object3d;
		this.insideMesh = insideMesh;
		this.outsideMesh = outsideMesh;
	}

}

/**
 * dilate a geometry inplace
 * @param  {THREE.Geometry} geometry geometry to dilate
 * @param  {Number} length   percent to dilate, use negative value to erode
 */
function dilateGeometry(geometry: THREE.Geometry, length: number){
	// gather vertexNormals from geometry.faces
	var vertexNormals	= new Array(geometry.vertices.length);
	geometry.faces.forEach(function(face){
			vertexNormals[face.a]	= face.vertexNormals[0];
			vertexNormals[face.b]	= face.vertexNormals[1];
			vertexNormals[face.c]	= face.vertexNormals[2];
  });
  
	// modify the vertices according to vertextNormal
	geometry.vertices.forEach(function(vertex, idx){
		var vertexNormal = vertexNormals[idx];
		vertex.x	+= vertexNormal.x * length;
		vertex.y	+= vertexNormal.y * length;
		vertex.z	+= vertexNormal.z * length;
	});		
};


/**
 * from http://stemkoski.blogspot.fr/2013/07/shaders-in-threejs-glow-and-halo.html
 * @return {[type]} [description]
 */
function createAtmosphereMaterial(){
	var vertexShader	= [
		'varying vec3	vVertexWorldPosition;',
		'varying vec3	vVertexNormal;',

		'varying vec4	vFragColor;',

		'void main(){',
		'	vVertexNormal	= normalize(normalMatrix * normal);',

		'	vVertexWorldPosition	= (modelMatrix * vec4(position, 1.0)).xyz;',

		'	// set gl_Position',
		'	gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
		'}',

		].join('\n')
	var fragmentShader	= [
		'uniform vec3	glowColor;',
		'uniform float	coeficient;',
		'uniform float	power;',

		'varying vec3	vVertexNormal;',
		'varying vec3	vVertexWorldPosition;',

		'varying vec4	vFragColor;',

		'void main(){',
		'	vec3 worldCameraToVertex= vVertexWorldPosition - cameraPosition;',
		'	vec3 viewCameraToVertex	= (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;',
		'	viewCameraToVertex	= normalize(viewCameraToVertex);',
		'	float intensity		= pow(coeficient + dot(vVertexNormal, viewCameraToVertex), power);',
		'	gl_FragColor		= vec4(glowColor, intensity);',
		'}',
	].join('\n')

	// create custom material from the shader code above
	//   that is within specially labeled script tags
	var material	= new THREE.ShaderMaterial({
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
	return material
}

