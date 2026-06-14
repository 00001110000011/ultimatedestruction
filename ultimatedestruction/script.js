const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const status = document.getElementById('status');
const score1El = document.getElementById('score1');
const score2El = document.getElementById('score2');

// Game variables
const paddleWidth = 10;
const paddleHeight = 80;
const ballSize = 8;
const paddleSpeed = 6;

let gameRunning = false;
let gamePaused = false;

// Paddles
const paddle1 = {
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0,
    score: 0
};

const paddle2 = {
    x: canvas.width - paddleWidth - 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0,
    score: 0
};

// Ball
let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: ballSize,
    dx: 5,
    dy: 5
};

// Keyboard controls
const keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.key.toUpperCase()] = true;

    if (e.key === ' ') {
        e.preventDefault();
        if (!gameRunning) {
            startGame();
        } else {
            togglePause();
        }
    }

    if (e.key.toUpperCase() === 'R') {
        resetGame();
    }
});

window.addEventListener('keyup', (e) => {
    keys[e.key.toUpperCase()] = false;
});

function startGame() {
    gameRunning = true;
    gamePaused = false;
    status.textContent = 'Game Running';
    gameLoop();
}

function togglePause() {
    gamePaused = !gamePaused;
    status.textContent = gamePaused ? 'Paused' : 'Game Running';
}

function resetGame() {
    gameRunning = false;
    gamePaused = false;
    paddle1.score = 0;
    paddle2.score = 0;
    score1El.textContent = '0';
    score2El.textContent = '0';
    ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        size: ballSize,
        dx: 5,
        dy: 5
    };
    status.textContent = 'Press SPACE to start';
    draw();
}

function updatePaddles() {
    // Player 1 controls (W/S)
    if (keys['W'] && paddle1.y > 0) {
        paddle1.y -= paddleSpeed;
    }
    if (keys['S'] && paddle1.y < canvas.height - paddle1.height) {
        paddle1.y += paddleSpeed;
    }

    // Player 2 controls (Arrow Keys)
    if (keys['ARROWUP'] && paddle2.y > 0) {
        paddle2.y -= paddleSpeed;
    }
    if (keys['ARROWDOWN'] && paddle2.y < canvas.height - paddle2.height) {
        paddle2.y += paddleSpeed;
    }
}

function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball collision with top/bottom
    if (ball.y - ball.size < 0 || ball.y + ball.size > canvas.height) {
        ball.dy = -ball.dy;
        ball.y = ball.y - ball.size < 0 ? ball.size : canvas.height - ball.size;
    }

    // Ball collision with paddles
    if (
        ball.x - ball.size < paddle1.x + paddle1.width &&
        ball.y > paddle1.y &&
        ball.y < paddle1.y + paddle1.height
    ) {
        ball.dx = -ball.dx;
        const deltaY = ball.y - (paddle1.y + paddle1.height / 2);
        ball.dy = deltaY * 0.1;
        ball.x = paddle1.x + paddle1.width + ball.size;
    }

    if (
        ball.x + ball.size > paddle2.x &&
        ball.y > paddle2.y &&
        ball.y < paddle2.y + paddle2.height
    ) {
        ball.dx = -ball.dx;
        const deltaY = ball.y - (paddle2.y + paddle2.height / 2);
        ball.dy = deltaY * 0.1;
        ball.x = paddle2.x - ball.size;
    }

    // Ball out of bounds - scoring
    if (ball.x - ball.size < 0) {
        paddle2.score++;
        score2El.textContent = paddle2.score;
        resetBall();
    }

    if (ball.x + ball.size > canvas.width) {
        paddle1.score++;
        score1El.textContent = paddle1.score;
        resetBall();
    }
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = (Math.random() > 0.5 ? 1 : -1) * 5;
    ball.dy = (Math.random() - 0.5) * 8;
}

function draw() {
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw center line
    ctx.strokeStyle = '#fff';
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw paddles
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);

    // Draw ball
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fill();
}

function gameLoop() {
    if (gameRunning) {
        if (!gamePaused) {
            updatePaddles();
            updateBall();
        }
        draw();
        requestAnimationFrame(gameLoop);
    }
}

// Initial draw
draw();