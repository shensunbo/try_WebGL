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

        // 设置光照
        this.setupLights();

        // 设置控制器
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;

        // 创建材质
        this.createMaterials();

        // 加载模型
        this.loadModel();

        // 窗口大小自适应
        window.addEventListener('resize', this.onWindowResize.bind(this));
    }

    setupLights() {
        // const ambientLight = new THREE.AmbientLight(0x404040);
        // this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight.position.set(0, 10, 10);
        this.scene.add(directionalLight);
    }

    createMaterials() {
        const textureLoader = new THREE.TextureLoader();
        
        // 定义材质配置
        const materialConfigs = {
            'chest_Mat': {
                map: './assets/halo/textures/Spartan_Chest_Mat_BaseColor.png',
                normalMap: './assets/halo/textures/Spartan_Chest_Mat_Normal.png',
                aoMap: './assets/halo/textures/Spartan_Chest_Mat_AO.png',
                roughnessMap: './assets/halo/textures/Spartan_Chest_Mat_Roughness.png',
                metalnessMap: './assets/halo/textures/Spartan_Chest_Mat_Metallic.png'
            },
            'arms_Mat': {
                map: './assets/halo/textures/Spartan_Arms_Mat_BaseColor.png',
                normalMap: './assets/halo/textures/Spartan_Arms_Mat_Normal.png',
                roughnessMap: './assets/halo/textures/Spartan_Arms_Mat_Roughness.png',
                metalnessMap: './assets/halo/textures/Spartan_Arms_Mat_Metallic.png',
                aoMap: './assets/halo/textures/Spartan_Legs_Mat_AO.png'
            },
            'Spartan_Legs_Mat': {
                map: './assets/halo/textures/Spartan_Legs_Mat_BaseColor.png',
                normalMap: './assets/halo/textures/Spartan_Legs_Mat_Normal.png',
                roughnessMap: './assets/halo/textures/Spartan_Legs_Mat_Roughness.png',
                metalnessMap: './assets/halo/textures/Spartan_Legs_Mat_Metallic.png',
                aoMap: './assets/halo/textures/Spartan_Legs_Mat_AO.png'
            },
            'Spartan_Shoulders_Mat': {
                map: './assets/halo/textures/ODST_Shoulder_Mat_BaseColor.png',
                normalMap: './assets/halo/textures/ODST_Shoulder_Mat_Normal.png',
                roughnessMap: './assets/halo/textures/ODST_Shoulder_Mat_Roughness.png',
                metalnessMap: './assets/halo/textures/ODST_Shoulder_Mat_Metallic.png',
                aoMap: './assets/halo/textures/ODST_Shoulder_Mat_AO.png'
            },
            'Spartan_Helmet_Mat': {
                map: './assets/halo/textures/Spartan_Helmet_Mat_BaseColor.png',
                normalMap: './assets/halo/textures/Spartan_Helmet_Mat_Normal.png',
                roughnessMap: './assets/halo/textures/Spartan_Helmet_Mat_Roughness.png',
                metalnessMap: './assets/halo/textures/Spartan_Helmet_Mat_Metallic.png',
                aoMap: './assets/halo/textures/Spartan_Helmet_Mat_AO.png'

            },
            'Spartan_Undersuit_Mat': {
                map: './assets/halo/textures/Spartan_Undersuit_Mat_BaseColor.png',
                normalMap: './assets/halo/textures/Spartan_Undersuit_Mat_Normal.png',
                roughnessMap: './assets/halo/textures/Spartan_Undersuit_Mat_Roughness.png',
                metalnessMap: './assets/halo/textures/Spartan_Undersuit_Mat_Metallic.png',
                aoMap: './assets/halo/textures/Spartan_Undersuit_Mat_AO.png'
            },
            'Spartan_Ear_Mat': {
                map: './assets/halo/textures/Spartan_Ears_Mat_BaseColor.png',
                normalMap: './assets/halo/textures/Spartan_Ears_Mat_Normal.png',
                roughnessMap: './assets/halo/textures/Spartan_Ears_Mat_Roughness.png',
                metalnessMap: './assets/halo/textures/Spartan_Ears_Mat_Metallic.png',
                aoMap: './assets/halo/textures/Spartan_Ears_Mat_AO.png'
            }
        };

        // 创建材质映射
        this.materialMap = {};
        for (const [matName, config] of Object.entries(materialConfigs)) {
            this.materialMap[matName] = new THREE.MeshStandardMaterial({
                map: textureLoader.load(config.map),
                normalMap: textureLoader.load(config.normalMap),
                roughnessMap: textureLoader.load(config.roughnessMap),
                metalnessMap: textureLoader.load(config.metalnessMap),
                aoMap: textureLoader.load(config.aoMap),
            });
        }
    }

    loadModel() {
        const loader = new FBXLoader();
        loader.load(
            './assets/halo/textures/halo.fbx',
            (fbx) => {
                console.log('FBX 模型加载成功', fbx);

                // 调整模型位置/缩放
                fbx.scale.set(0.1, 0.1, 0.1);
                fbx.position.set(0, 0, 0);

                // 应用材质
                this.applyMaterials(fbx);

                // 添加到场景
                this.scene.add(fbx);
            },
            (progress) => {
                console.log(`加载进度: ${(progress.loaded / progress.total * 100).toFixed(2)}%`);
            },
            (error) => {
                console.error('FBX 加载失败:', error);
            }
        );
    }

    applyMaterials(object) {
        object.traverse((child) => {
            if (child.isMesh) {
                // 处理材质数组或单个材质
                if (Array.isArray(child.material)) {
                    child.material = child.material.map((material) => {
                        if (material && this.materialMap[material.name]) {
                            return this.materialMap[material.name];
                        }
                        return material;
                    });
                } else if (child.material && this.materialMap[child.material.name]) {
                    child.material = this.materialMap[child.material.name];
                }
                
                // 确保材质更新
                if (child.material) {
                    child.material.needsUpdate = true;
                }
            }
        });
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.controls.update(); // 更新控制器
        this.renderer.render(this.scene, this.camera);
    }
}