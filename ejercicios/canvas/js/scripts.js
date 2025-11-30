import { Car } from './classes/Car.js';
import { Obstacle } from './classes/Obstacle.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('game-over');
const btnLeft = document.getElementById('btn-left');
const btnRight = document.getElementById('btn-right');

// Game State
let car;
let obstacles = [];
let score = 0;
let gameRunning = true;
let animationId;
let frameCount = 0;
let obstacleInterval = 100; // Frames between obstacles

// Set canvas size dynamically
function resizeCanvas() {
    const oldWidth = canvas.width;
    canvas.width = Math.min(window.innerWidth * 0.95, 600); // Slightly wider max width
    canvas.height = window.innerHeight * 0.8;

    if (car) {
        car.resize(canvas.width, canvas.height);
    }
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);



// Input State
const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    a: false,
    d: false,
    A: false,
    D: false
};

function init() {
    car = new Car(canvas.width, canvas.height);
    obstacles = [];
    score = 0;
    scoreElement.innerText = score;
    gameRunning = true;
    gameOverElement.classList.add('hidden');
    frameCount = 0;
    animate();
}

let baseObstacleSpeed = 3;

function spawnObstacle() {
    // Increase speed based on score
    const currentSpeed = baseObstacleSpeed + (score * 0.1);
    obstacles.push(new Obstacle(canvas.width, currentSpeed));
}

function checkCollisions() {
    for (let obstacle of obstacles) {
        if (
            car.x < obstacle.x + obstacle.width &&
            car.x + car.width > obstacle.x &&
            car.y < obstacle.y + obstacle.height &&
            car.y + car.height > obstacle.y
        ) {
            return true;
        }
    }
    return false;
}

function animate() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Handle Input
    if (keys.ArrowLeft || keys.a || keys.A) car.moveLeft();
    if (keys.ArrowRight || keys.d || keys.D) car.moveRight();

    // Car
    car.draw(ctx);

    // Obstacles
    // Decrease interval as score increases to spawn more often (min 40 frames)
    let currentInterval = Math.max(40, 100 - (score * 2));

    /*if (frameCount % currentInterval === 0 || (frameCount % currentInterval < 1 && frameCount > 100)) {
        // The modulo check might miss if interval changes, so we use a simplified check or just keep it simple.
        // Better approach for variable interval:
    }*/

    // Simple variable interval logic
    if (frameCount >= currentInterval) {
        spawnObstacle();
        frameCount = 0;
    }

    obstacles.forEach((obstacle, index) => {
        obstacle.update(canvas.height);
        obstacle.draw(ctx);

        // Remove off-screen obstacles
        if (obstacle.markedForDeletion) {
            obstacles.splice(index, 1);
            score++;
            scoreElement.innerText = score;
        }
    });

    if (checkCollisions()) {
        gameRunning = false;
        document.getElementById('final-score').innerText = `Puntuación conseguida: ${score}`;
        gameOverElement.classList.remove('hidden');
        cancelAnimationFrame(animationId);
    } else {
        frameCount++;
        animationId = requestAnimationFrame(animate);
    }
}

// Event Listeners
window.addEventListener('keydown', (e) => {
    if (keys.hasOwnProperty(e.key)) {
        keys[e.key] = true;
    }
    if (!gameRunning && e.code === 'Space') {
        init();
    }
});

window.addEventListener('keyup', (e) => {
    if (keys.hasOwnProperty(e.key)) {
        keys[e.key] = false;
    }
});

// Touch/Click Controls
btnLeft.addEventListener('mousedown', () => keys.ArrowLeft = true);
btnLeft.addEventListener('mouseup', () => keys.ArrowLeft = false);
btnLeft.addEventListener('touchstart', (e) => { e.preventDefault(); keys.ArrowLeft = true; });
btnLeft.addEventListener('touchend', (e) => { e.preventDefault(); keys.ArrowLeft = false; });

btnRight.addEventListener('mousedown', () => keys.ArrowRight = true);
btnRight.addEventListener('mouseup', () => keys.ArrowRight = false);
btnRight.addEventListener('touchstart', (e) => { e.preventDefault(); keys.ArrowRight = true; });
btnRight.addEventListener('touchend', (e) => { e.preventDefault(); keys.ArrowRight = false; });

// Restart on click if game over
gameOverElement.addEventListener('click', () => {
    if (!gameRunning) init();
});

// Start Game Logic
const header = document.getElementById('header');
const startButton = document.getElementById('button-start');

startButton.addEventListener('click', () => {
    header.classList.add('header--hidden');
    init();
});
