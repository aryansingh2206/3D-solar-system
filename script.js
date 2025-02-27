import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';

document.addEventListener("DOMContentLoaded", function () {
    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add a starry background
    const starTexture = new THREE.TextureLoader().load('https://threejsfundamentals.org/threejs/resources/images/starfield.jpg');
    scene.background = starTexture;

    // Sun (Glowing Sphere)
    const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffcc00 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Light Source (Sun as a light)
    const sunlight = new THREE.PointLight(0xffffff, 2, 100);
    sunlight.position.set(0, 0, 0);
    scene.add(sunlight);

    // Planets Data
    const planets = [];
    const planetData = [
        { name: "Mercury", size: 0.5, color: 0xaaaaaa, distance: 10, speed: 0.04 },
        { name: "Venus", size: 0.9, color: 0xffa07a, distance: 15, speed: 0.02 },
        { name: "Earth", size: 1, color: 0x3498db, distance: 20, speed: 0.015 },
        { name: "Mars", size: 0.7, color: 0xe74c3c, distance: 26, speed: 0.012 },
        { name: "Jupiter", size: 2, color: 0xf39c12, distance: 34, speed: 0.009 },
        { name: "Saturn", size: 1.8, color: 0xd4af37, distance: 42, speed: 0.007 },
    ];

    // Create planets and add to scene
    planetData.forEach(data => {
        const geometry = new THREE.SphereGeometry(data.size, 32, 32);
        const material = new THREE.MeshStandardMaterial({ color: data.color });
        const planet = new THREE.Mesh(geometry, material);

        planet.position.set(data.distance, 0, 0);
        scene.add(planet);
        planets.push({ mesh: planet, angle: Math.random() * Math.PI * 2, speed: data.speed, distance: data.distance });
    });

    // Set Camera Position
    camera.position.set(0, 15, 50);
    camera.lookAt(0, 0, 0);

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        // Rotate the Sun
        sun.rotation.y += 0.002;

        // Move planets in orbits
        planets.forEach(planet => {
            planet.angle += planet.speed;
            planet.mesh.position.x = Math.cos(planet.angle) * planet.distance;
            planet.mesh.position.z = Math.sin(planet.angle) * planet.distance;
        });

        renderer.render(scene, camera);
    }

    animate();
});
