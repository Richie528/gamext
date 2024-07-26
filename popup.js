let rootElement = document.querySelector(":root");
let homeScreen = document.getElementById("home-screen");

// THEMES

let themeButton = document.querySelector(".theme-button");
let currentTheme = 0;
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
    displayTheme();
}
function colour(key) {
    if (currentTheme == 0) return lightMode[themeKeys.indexOf(key)];
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
snake.context = snake.canvas.getContext("2d");
snake.context.scale(1, 0.5);

snake.directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
snake.startPos = [7, 3];
snake.offsetX = 2.5;
snake.offsetY = 2.5;
snake.scaleX = 295 / 15;
snake.scaleY = 295 / 15;

snake.direction = 0;
snake.size = 3;
snake.snake = [];
snake.apple = [];

snake.resetVars = function () {
    this.direction = 0;
    this.size = 3;
    this.snake = [];
    this.apple = [];
}
snake.generateSnake = function() {
    for (let i = this.size - 1; i >= 0; i--) {
        this.snake.push([this.startPos[0], this.startPos[1] - i]);
    }
}
snake.generateApple = function() {
    this.apple = [
        Math.floor(Math.random() * 15),
        Math.floor(Math.random() * 15)
    ];
    while (this.snake.includes(this.apple)) {
        this.apple = [
            Math.floor(Math.random() * 15),
            Math.floor(Math.random() * 15)
        ];
    }
}
snake.resetScreen = function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}
snake.clearScreen = function() {
    this.context.clearRect(2.5, 2.5, 295, 295);
}
snake.drawBorders = function() {
    this.context.strokeStyle = colour("--text");
    this.context.lineWidth = 5;
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
            this.scaleX,
            this.scaleY
        );
    }
}
snake.drawApple = function() {
    this.context.fillStyle = colour("--red");
    this.context.fillRect(
        this.offsetX + this.apple[0] * this.scaleX,
        this.offsetY + this.apple[1] * this.scaleY,
        this.scaleX,
        this.scaleY
    );
}
snake.tick = function() {
    // move snake
    let newSnakeCell = [
        this.snake[this.size - 1][0] + this.directions[this.direction][0],
        this.snake[this.size - 1][1] + this.directions[this.direction][1]
    ];

    if (this.apple === newSnakeCell) {
        this.size += 1;
    } else {
        this.snake.shift();
    }

    if (this.snake.includes(newSnakeCell)) {
        // DIE
    }

    this.snake.push(newSnakeCell);

    // draw
    this.clearScreen();
    this.drawSnake();
    this.drawApple();
}
snake.run = function() {
    console.log("SNAKE");

    this.resetVars();
    this.generateSnake();
    this.generateApple();

    this.resetScreen();
    this.drawBorders();
    this.drawSnake();
    this.drawApple();

    setInterval(function() {
        snake.tick();
    }, 500);
}

snake.button.onclick = function() {
    homeScreen.style.visibility = "hidden";
    snake.screen.style.visibility = "visible";
    snake.run();
}