import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class SceneManager {
    constructor(container) {
        // 初始化场景、相机、渲染器
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight
        );
        this.camera.position.x = 0;
        this.camera.position.y = 15;
        this.camera.position.z = 50;
        
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(this.renderer.domElement);

        this.scene.background = new THREE.Color(0xffffff);

        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;

        // 创建立方体
        // this.cube = this.createCube();
        // this.scene.add(this.cube);

        const loader = new FBXLoader();
        loader.load(
            '/assets/audi.fbx', // FBX 文件路径
            (fbx) => {
                console.log('FBX 模型加载成功', fbx);

                // 调整模型位置/缩放（可选）
                fbx.scale.set(0.1, 0.1, 0.1);
                fbx.position.set(0, 0, 0);

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

        // 窗口大小自适应
        window.addEventListener('resize', this.onWindowResize.bind(this));
    }

    createCube() {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        return new THREE.Mesh(geometry, material);
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