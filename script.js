
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
let zombies = [];

let shotSound = new Audio('assets/shot.wav');

function spawnZombie() {
  const size = 50 + Math.random() * 50;
  const x = Math.random() * (canvas.width - size);
  zombies.push({ x, y: canvas.height, size });
}

function drawZombies() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  zombies.forEach((zombie, index) => {
    ctx.fillStyle = 'green';
    ctx.fillRect(zombie.x, zombie.y, zombie.size, zombie.size);
    zombie.y -= 2;

    // Remove zombie if off screen
    if (zombie.y + zombie.size < 0) zombies.splice(index, 1);
  });
}

function checkHit(x, y) {
  zombies.forEach((zombie, index) => {
    if (x >= zombie.x && x <= zombie.x + zombie.size &&
        y >= zombie.y && y <= zombie.y + zombie.size) {
      zombies.splice(index, 1);
      score++;
      document.getElementById('score').innerText = "Score: " + score;
      shotSound.play();
    }
  });
}

canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  checkHit(e.clientX - rect.left, e.clientY - rect.top);
});

setInterval(spawnZombie, 1500);

function gameLoop() {
  drawZombies();
  requestAnimationFrame(gameLoop);
}

gameLoop();
