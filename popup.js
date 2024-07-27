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

snake.inputKeys = ["w", "a", "s", "d"];
snake.directions = [[0, -1], [-1, 0], [0, 1], [1, 0]];
snake.startPos = [4, 7];
snake.offsetX = 2.5;
snake.offsetY = 2.5;
snake.scaleX = 295 / 15;
snake.scaleY = 295 / 15;

snake.direction = 3;
snake.size = 3;
snake.snake = [];
snake.apple = [];
snake.movementCooldown = false;

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
    this.movementCooldown = false;

    let newSnakeCell = [
        this.snake[this.size - 1][0] + this.directions[this.direction][0],
        this.snake[this.size - 1][1] + this.directions[this.direction][1]
    ];

    if (this.collision(newSnakeCell, this.apple)) {
        this.generateApple();
        this.drawApple();
        this.size += 1;
    } else {
        this.snake.shift();
    }

    if (this.collisions(this.snake, newSnakeCell) ||
        newSnakeCell[0] < 0 || 
        newSnakeCell[1] < 0 || 
        newSnakeCell[0] >= 15 ||
        newSnakeCell[1] >= 15
    ) {
        console.log("DIE");
    }

    this.snake.push(newSnakeCell);

    // draw
    this.clearScreen();
    this.drawSnake();
    this.drawApple();
}
snake.run = function() {
    console.log("SNAKE");

    // add inputs
    document.addEventListener("keydown", function(e) {
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
    });

    this.resetVars();
    this.generateSnake();
    this.generateApple();

    this.resetScreen();
    this.drawBorders();
    this.drawSnake();
    this.drawApple();

    setInterval(function() {
        snake.tick();
    }, 200);
}

snake.button.onclick = function() {
    homeScreen.style.visibility = "hidden";
    snake.screen.style.visibility = "visible";
    snake.run();
}