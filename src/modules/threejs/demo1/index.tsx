import React, { createRef, useEffect } from 'react';
import {inject} from 'natur';
import * as THREE from 'three';
import Stats from 'stats.js';
import * as dat from 'dat.gui';
import TrackballControls from 'three-trackballcontrols';
import style from './style.scss';
import { InjectThreejsDemo1ModuleType } from './store';


function createStats() {
	const stats = new Stats();
	stats.dom.style.position = 'absolute';
	stats.dom.style.left = '0';
	stats.dom.style.top = '0';
	return stats;
}

class Controller {
	rotationSpeed: number;

	bouncingSpeed: number;

	constructor() {
		this.rotationSpeed = 0.02;
		this.bouncingSpeed = 0.02;
	}
}


/**
 * Initialize trackball controls to control the scene
 *
 * @param {THREE.Camera} camera
 * @param {THREE.Renderer} renderer
 */
function initTrackballControls(camera: THREE.Camera, renderer: THREE.Renderer) {
	const trackballControls = new TrackballControls(camera, renderer.domElement);
	trackballControls.rotateSpeed = 1.0;
	trackballControls.zoomSpeed = 1.2;
	trackballControls.panSpeed = 0.8;
	trackballControls.noZoom = false;
	trackballControls.noPan = false;
	trackballControls.staticMoving = true;
	trackballControls.dynamicDampingFactor = 0.3;
	trackballControls.keys = [65, 83, 68];

	return trackballControls;
}


const ThreejsDemo1: React.FC<{threejsDemo1: InjectThreejsDemo1ModuleType}> = () => {
	const wrapper = createRef<HTMLDivElement>();
	const stats = createRef<HTMLDivElement>();
	useEffect(() => {
		const scene = new THREE.Scene();
		const ele = wrapper.current;
		const width = ele!.clientWidth;
		const height = ele!.clientHeight;
		const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
		const renderer = new THREE.WebGLRenderer();
		// const axes = new THREE.AxesHelper(10);

		renderer.setClearColor(0x000000, 1);
		renderer.setSize(width, height);
		renderer.shadowMapEnabled = true;

		// 灯光
		const ambienLight = new THREE.AmbientLight(0x353535);
		scene.add(ambienLight);

		const spotLight = new THREE.SpotLight(0xffffff);
		spotLight.position.set(-40, 40, -15);
		spotLight.castShadow = true;
		spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
		spotLight.shadow.camera.far = 130;
		spotLight.shadow.camera.near = 40;
		scene.add(spotLight);

		// scene.add(axes);

		const planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
		const planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
		const plane = new THREE.Mesh(planeGeometry, planeMaterial);
		plane.rotation.x = -0.5 * Math.PI;
		plane.position.set(15, 0, 0);
		plane.receiveShadow = true;
		scene.add(plane);

		const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
		const cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
		const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
		cube.position.set(-4, 3, 0);
		cube.castShadow = true;
		scene.add(cube);

		// create a sphere
		const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
		const sphereMaterial = new THREE.MeshLambertMaterial({
			color: 0x7777FF,
		});
		const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
		sphere.position.set(20, 4, 2);
		sphere.castShadow = true;
		scene.add(sphere);

		// position and point the camera to the center of the scene
		camera.position.set(-30, 40, 30);
		camera.lookAt(scene.position);

		ele?.appendChild(renderer.domElement);

		const statsInstance = createStats();
		stats.current?.appendChild(statsInstance.dom);

		const gui = new dat.GUI();
		const guiController = new Controller();
		gui.add(guiController, 'rotationSpeed', 0, 0.5);
		gui.add(guiController, 'bouncingSpeed', 0, 0.5);


		const trackballControls = initTrackballControls(camera, renderer);
		const clock = new THREE.Clock();


		let step = 0;
		let cubeStep = 0.02;

		function renderScene() {
			trackballControls.update(clock.getDelta());
			statsInstance.update();
			cube.rotation.x += cubeStep;
			cube.rotation.y += cubeStep;
			cube.rotation.z += cubeStep;

			cubeStep = guiController.rotationSpeed;
			step += guiController.bouncingSpeed;
			sphere.position.x = 20 + (10 * (Math.cos(step)));
			sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));

			requestAnimationFrame(renderScene);
			renderer.render(scene, camera);
		}
		renderScene();
	}, [stats, wrapper]);

	return (
		<div ref={wrapper} className={style['threejs-demo1']}>
			<div ref={stats} />
		</div>
	);
};


export {state, maps, actions} from './store';
export default inject<{threejsDemo1: InjectThreejsDemo1ModuleType}>(
	'threejsDemo1',
)(ThreejsDemo1);
