let rootElement = document.querySelector(":root");
let homeScreen = document.getElementById("home-screen");

// STORAGE
function read(key) {
    return localStorage.getItem(key);
}
function readInt(key) {
    return parseInt(localStorage.getItem(key));
}
function write(key, value) {
    localStorage.setItem(key, value);
}
function readWrite(key, value) {
    if (read(key) === null) write(key, value);
    return read(key);
}
function readWriteInt(key, value) {
    if (read(key) === null) write(key, value);
    return readInt(key);
}

// THEMES

let themeButton = document.querySelector(".theme-button");
let currentTheme = readWriteInt("theme", 0);
let themeName = ["light", "dark"];
let themeKeys = ["--base", "--mantle", "--crust", "--surface", "--green", "--red", "--text", "--subtext"];
let lightMode = ["#eff1f5", "#e6e9ef", "#dce0e8", "#acb0be", "#a6d189", "#e78284", "#4c4f69", "#8f91a0"];
let darkMode = ["#1e1e2e", "#181825", "#11111b", "#313244", "#a6d189", "#e78284", "#cdd6f4", "#98a0bc"];

function displayTheme() {
    for (let i = 0; i < themeKeys.length; i++) {
        rootElement.style.setProperty(
            themeKeys[i],
            (currentTheme) ? darkMode[i] : lightMode[i]
        );
    }
    themeButton.textContent = themeName[currentTheme];
}
function toggleTheme() {
    currentTheme = (currentTheme) ? 0 : 1;
    write("theme", currentTheme);
    displayTheme();
}
function colour(key) {
    if (currentTheme === 0) return lightMode[themeKeys.indexOf(key)];
    return darkMode[themeKeys.indexOf(key)];
}

themeButton.onclick = function() {
    toggleTheme();
}

displayTheme();

// SNAKE

let snake = {};

snake.screen = document.getElementById("snake-screen");
snake.button = document.getElementById("snake-button");
snake.canvas = document.getElementById("snake-canvas");
snake.highScoreText = document.getElementById("snake-high-score");
snake.scoreText = document.getElementById("snake-score");
snake.deathScreen = document.getElementById("snake-death-screen");
snake.deathScreenScore = document.getElementById("snake-death-screen-score");
snake.tryAgainButton = document.getElementById("snake-try-again");
snake.context = snake.canvas.getContext("2d");
snake.context.scale(1, 0.5);

snake.inputKeys = ["w", "a", "s", "d"];
snake.directions = [[0, -1], [-1, 0], [0, 1], [1, 0]];
snake.startPos = [4, 7];
snake.offsetX = 2;
snake.offsetY = 2;
snake.scaleX = 298 / 15;
snake.scaleY = 298 / 15;
snake.cellX = 298 / 15 - 1;
snake.cellY = 298 / 15 - 1;

snake.highScore = readWriteInt("snake-high-score", 3);
snake.direction = 3;
snake.size = 3;
snake.snake = [];
snake.apple = [];
snake.movementCooldown = false;
snake.dead = false;

snake.resetVars = function () {
    this.direction = 3;
    this.size = 3;
    this.snake = [];
    this.apple = [];
}
snake.collision = function(cella, cellb) {
    if (cella[0] !== cellb[0]) return false;
    if (cella[1] !== cellb[1]) return false;
    return true;
}
snake.collisions = function(cells, cell) {
    for (let c of cells) {
        if (this.collision(c, cell)) {
            return true;
        }
    }
    return false;
}
snake.generateSnake = function() {
    for (let i = this.size - 1; i >= 0; i--) {
        this.snake.push([this.startPos[0] - i, this.startPos[1]]);
    }
}
snake.generateApple = function() {
    this.apple = [
        Math.floor(Math.random() * 15),
        Math.floor(Math.random() * 15)
    ];
    while (this.collisions(this.snake, this.apple)) {
        this.apple = [
            Math.floor(Math.random() * 15),
            Math.floor(Math.random() * 15)
        ];
    }
}
snake.reset = function() {
    this.resetVars();
    this.generateSnake();
    this.generateApple();
    this.dead = false;
    this.deathScreen.style.visibility = "hidden";
}
snake.die = function() {
    this.dead = true;
    this.deathScreen.style.visibility = "visible";
}
snake.writeScores = function() {
    write("snake-high-score", this.highScore);
    this.highScoreText.textContent = this.highScore.toString();
    this.scoreText.textContent = this.size.toString();
    this.deathScreenScore.textContent = this.size.toString();
}
snake.clearScreen = function() {
    this.context.clearRect(0, 0, 300, 300);
}
snake.drawBorders = function() {
    this.context.strokeStyle = colour("--subtext");
    this.context.lineWidth = 2;
    this.context.moveTo(0, 0);
    this.context.lineTo(300, 0);
    this.context.lineTo(300, 300);
    this.context.lineTo(0, 300);
    this.context.lineTo(0, 0);
    this.context.stroke();
}
snake.drawSnake = function() {
    this.context.fillStyle = colour("--green");
    for (let i = 0; i < this.size; i++) {
        this.context.fillRect(
            this.offsetX + this.snake[i][0] * this.scaleX,
            this.offsetY + this.snake[i][1] * this.scaleY,
            this.cellX,
            this.cellY
        );
    }
}
snake.drawApple = function() {
    this.context.fillStyle = colour("--red");
    this.context.fillRect(
        this.offsetX + this.apple[0] * this.scaleX,
        this.offsetY + this.apple[1] * this.scaleY,
        this.cellX,
        this.cellY
    );
}
snake.draw = function() {
    this.clearScreen();
    this.drawBorders();
    this.drawSnake();
    this.drawApple();
}
snake.tick = function() {
    if (!this.dead) {
        this.movementCooldown = false;

        let newSnakeCell = [
            this.snake[this.size - 1][0] + this.directions[this.direction][0],
            this.snake[this.size - 1][1] + this.directions[this.direction][1]
        ];

        if (this.collisions(this.snake, newSnakeCell) ||
            newSnakeCell[0] < 0 || 
            newSnakeCell[1] < 0 || 
            newSnakeCell[0] >= 15 ||
            newSnakeCell[1] >= 15
        ) {
            this.die();
        }

        if (!this.dead) {
            if (this.collision(newSnakeCell, this.apple)) {
                this.generateApple();
                this.draw();
                this.size += 1;
                this.highScore = Math.max(this.highScore, this.size);
            } else {
                this.snake.shift();
            }
            this.snake.push(newSnakeCell);
        }
    }

    // draw
    this.draw();
    this.writeScores();
}
snake.listener = function(e) {
    for (let i = 0; i < 4; i++) {
        if (e.key === snake.inputKeys[i]) {
            if (snake.movementCooldown) continue;
            if ((i + 2) % 4 === snake.direction) continue;
            snake.movementCooldown = true;
            snake.direction = i;
        }
    }
    if (e.key === "Enter") {
        window.close();
    }
    if (e.key === "q") {
        clearInterval(snake.interval);
        snake.reset();
        document.removeEventListener("keydown", snake.listener);
        snake.screen.style.visibility = "hidden";
        homeScreen.style.visibility = "visible";
    }
}
snake.run = function() {
    homeScreen.style.visibility = "hidden";
    this.screen.style.visibility = "visible";

    document.addEventListener("keydown", this.listener);
    
    this.tryAgainButton.onclick = function() {
        snake.reset();
    }

    this.reset();
    this.draw();
    this.writeScores();

    this.interval = setInterval(function() {
        snake.tick();
    }, 200);
}

snake.button.onclick = function() {
    snake.run();
}

// PONG

let pong = {};

pong.screen = document.getElementById("pong-screen");
pong.button = document.getElementById("pong-button");
pong.canvas = document.getElementById("pong-canvas");
pong.highScoreText = document.getElementById("pong-high-score");
pong.scoreText = document.getElementById("pong-score");
pong.deathScreen = document.getElementById("pong-death-screen");
pong.deathScreenScore = document.getElementById("pong-death-screen-score");
pong.tryAgainButton = document.getElementById("pong-try-again");
pong.context = pong.canvas.getContext("2d");
pong.context.scale(1, 0.5);

pong.highScore = readWriteInt("pong-high-score", 0);
pong.score = 0;

pong.writeScores = function() {
    write("pong-high-score", this.highScore);
    this.highScoreText.textContent = this.highScore.toString();
    this.scoreText.textContent = this.score.toString();
    this.deathScreenScore.textContent = this.score.toString();
}
pong.clearScreen = function() {
    this.context.clearRect(0, 0, 300, 300);
}
pong.drawBorders = function() {
    this.context.strokeStyle = colour("--subtext");
    this.context.lineWidth = 2;
    this.context.moveTo(0, 0);
    this.context.lineTo(300, 0);
    this.context.lineTo(300, 300);
    this.context.lineTo(0, 300);
    this.context.lineTo(0, 0);
    this.context.stroke();
}
pong.draw = function() {
    this.clearScreen();
    this.drawBorders();
}
pong.tick = function() {

}
pong.listener = function(e) {
    if (e.key == "Enter") {
        window.close();
    }
    if (e.key == "q") {
        // QUIT
    }
}
pong.run = function() {
    homeScreen.style.visibility = "hidden";
    this.screen.style.visibility = "visible";

    document.addEventListener("keydown", this.listener);
    
    this.tryAgainButton.onclick = function() {
        // RESET
    }

    this.draw();
    this.writeScores();

    this.interval = setInterval(function() {
        pong.tick();
    }, 200);
}

pong.button.onclick = function() {
    pong.run();
}