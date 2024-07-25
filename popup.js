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

let snakeScreen = document.getElementById("snake-screen");
let snakeButton = document.getElementById("snake-button");
let snakeCanvas = document.getElementById("snake-canvas");
let snakeContext = snakeCanvas.getContext("2d");
snakeContext.scale(1, 0.5);

const snakeDirections = [[0, 1], [0, -1], [1, 0], [-1, 0]];
const snakeStartPos = [7, 3];
const snakeOffsetX = 2.5;
const snakeOffsetY = 2.5;
const snakeScaleX = 295 / 15;
const snakeScaleY = 295 / 15;

let snakeDirection = 0;
let snakeLength = 3;
let snakeSnake = [];
let snakeApple = [];

function resetSnakeVars() {
    snakeDirection = 0;
    snakeLength = 3;
    snakeSnake = [];
    snakeApple = [];
}
function generateSnake() {
    for (let i = snakeLength - 1; i >= 0; i--) {
        snakeSnake.push([snakeStartPos[0], snakeStartPos[1] - i]);
    }
}
function generateApple() {
    snakeApple = [
        Math.floor(Math.random() * 15),
        Math.floor(Math.random() * 15)
    ];
    while (snakeSnake.includes(snakeApple)) {
        snakeApple = [
            Math.floor(Math.random() * 15),
            Math.floor(Math.random() * 15)
        ];
    }
}
function resetSnakeScreen() {
    snakeContext.clearRect(0, 0, snakeCanvas.width, snakeCanvas.height);
}
function clearSnakeScreen() {
    snakeContext.clearRect(2.5, 2.5, 295, 295);
}
function drawSnakeBorders() {
    snakeContext.strokeStyle = colour("--text");
    snakeContext.lineWidth = 5;
    snakeContext.moveTo(0, 0);
    snakeContext.lineTo(300, 0);
    snakeContext.lineTo(300, 300);
    snakeContext.lineTo(0, 300);
    snakeContext.lineTo(0, 0);
    snakeContext.stroke();
}
function drawSnake() {
    snakeContext.fillStyle = colour("--green");
    for (let i = 0; i < snakeLength; i++) {
        snakeContext.fillRect(
            snakeOffsetX + snakeSnake[i][0] * snakeScaleX,
            snakeOffsetY + snakeSnake[i][1] * snakeScaleY,
            snakeScaleX,
            snakeScaleY
        );
    }
}
function drawApple() {
    snakeContext.fillStyle = colour("--red");
    snakeContext.fillRect(
        snakeOffsetX + snakeApple[0] * snakeScaleX,
        snakeOffsetY + snakeApple[1] * snakeScaleY,
        snakeScaleX,
        snakeScaleY
    );
}
function snakeTick() {
    // move snake
    let newSnakeCell = [
        snakeSnake[snakeLength - 1][0] + snakeDirections[snakeDirection][0],
        snakeSnake[snakeLength - 1][1] + snakeDirections[snakeDirection][1]
    ];

    if (snakeApple === newSnakeCell) {
        snakeLength += 1;
    } else {
        snakeSnake.shift();
    }

    if (snakeSnake.includes(newSnakeCell)) {
        // DIE
    }

    snakeSnake.push(newSnakeCell);
    console.log(snakeSnake.length);
    console.log(newSnakeCell);

    // draw
    console.log(snakeLength);
    clearSnakeScreen();
    drawSnake();
    drawApple();
}
function runSnake() {
    console.log("SNAKE");

    resetSnakeVars();
    generateSnake();
    generateApple();

    resetSnakeScreen();
    drawSnakeBorders();
    drawSnake();
    drawApple();

    setInterval(function() {
        snakeTick();
    }, 500);
}

snakeButton.onclick = function() {
    homeScreen.style.visibility = "hidden";
    snakeScreen.style.visibility = "visible";
    runSnake();
}