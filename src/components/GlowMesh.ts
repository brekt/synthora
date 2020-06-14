import * as THREE from 'three';

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

export default GlowMesh;
