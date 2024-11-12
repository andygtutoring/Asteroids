// Asteroids.js

// Get the canvas element
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Game variables
let playerX = canvas.width / 2;
let playerY = canvas.height / 2;
let playerSpeed = 5;
let score = 0;
let stars = [];
let asteroids = [];

// Player object
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 20;
  }

  draw() {
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Star object
class Star {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 5;
  }

  draw() {
    ctx.fillStyle = '#ffff00';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Asteroid object
class Asteroid {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 15;
  }

  draw() {
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Create player, stars and asteroids
const player = new Player(playerX, playerY);
for (let i = 0; i < 20; i++) {
  stars.push(new Star(Math.random() * canvas.width, Math.random() * canvas.height));
  asteroids.push(new Asteroid(Math.random() * canvas.width, Math.random() * canvas.height));
}

// Handle touch and mouse events
canvas.addEventListener('mousemove', (e) => {
  playerX = e.clientX;
  playerY = e.clientY;
});

canvas.addEventListener('touchmove', (e) => {
  playerX = e.touches[0].clientX;
  playerY = e.touches[0].clientY;
  e.preventDefault();
});

// Update game state
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw background
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw player
  player.x = playerX;
  player.y = playerY;
  player.draw();

  // Draw stars
  for (let star of stars) {
    star.draw();
    // Check collision with player
    const distance = Math.sqrt((star.x - player.x) ** 2 + (star.y - player.y) ** 2);
    if (distance < player.radius + star.radius) {
      stars.splice(stars.indexOf(star), 1);
      score++;
    }
  }

  // Draw asteroids
  for (let asteroid of asteroids) {
    asteroid.draw();
    // Check collision with player
    const distance = Math.sqrt((asteroid.x - player.x) ** 2 + (asteroid.y - player.y) ** 2);
    if (distance < player.radius + asteroid.radius) {
      alert('Game Over! Your score: ' + score);
      window.location.reload();
    }
  }

  // Display score
  ctx.font = '24px Arial';
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('Score: ' + score, 10, 10);

  requestAnimationFrame(update);
}

update();

