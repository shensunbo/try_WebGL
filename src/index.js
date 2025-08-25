import { SceneManager } from './js/scene.js';

// 初始化 Three.js 场景
const container = document.getElementById('app');
const sceneManager = new SceneManager(container);
sceneManager.animate();