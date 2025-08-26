import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class SceneManager {
    constructor(container) {
        // 初始化场景、相机、渲染器
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            3000
        );

        this.camera.position.set(0, 500, 30);
        this.camera.lookAt(0, 0, 0);
        
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(this.renderer.domElement);

        this.scene.background = new THREE.Color(0xffffff);

        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;

        // const textureLoader = new THREE.TextureLoader();

        // const chestMat = new THREE.MeshStandardMaterial({
        //     map: textureLoader.load('./assets/halo/textures/Spartan_Chest_Mat_BaseColor.png'),     
        //     normalMap: textureLoader.load('./assets/halo/textures/Spartan_Chest_Mat_Normal.png')
        // });


        const loader = new FBXLoader();
        loader.load(
            './assets/halo/textures/halo.fbx', // FBX 文件路径
            (fbx) => {
                console.log('FBX 模型加载成功', fbx);

                // 调整模型位置/缩放（可选）
                fbx.scale.set(0.1, 0.1, 0.1);
                fbx.position.set(0, 0, 0);

                // fbx.traverse((child) => {
                //     if (child.isMesh && child.material.name === 'chest_Mat') {
                //         child.material = chestMat;
                //         child.material.needsUpdate = true;
                //     }
                // });

                // 添加到场景ds
                this.scene.add(fbx);
            },
            (progress) => {
                console.log(`加载进度: ${(progress.loaded / progress.total * 100).toFixed(2)}%`);
            },
            (error) => {
                console.error('FBX 加载失败:', error);
            }
        );

        // const loader = new GLTFLoader();
        //     loader.load('./assets/halo/textures/halo.glb', (gltf) => {
        //         this.scene.add(gltf.scene);
        // });

        // 窗口大小自适应
        window.addEventListener('resize', this.onWindowResize.bind(this));
    }


    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // animate() {
    //     requestAnimationFrame(this.animate.bind(this));
    //     this.cube.rotation.x += 0.01;
    //     this.cube.rotation.y += 0.01;
    //     this.renderer.render(this.scene, this.camera);
    // }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.controls.update(); // 更新控制器
        this.renderer.render(this.scene, this.camera);
    }
}