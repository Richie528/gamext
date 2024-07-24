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

let snakeSnake = [];
let snakeApple = [];

function resetSnakeVars() {

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

}
function drawApple() {

}

function runSnake() {
    console.log("SNAKE");
    resetSnakeScreen();
    drawSnakeBorders();
    clearSnakeScreen();
}

snakeButton.onclick = function() {
    homeScreen.style.visibility = "hidden";
    snakeScreen.style.visibility = "visible";
    runSnake();
}