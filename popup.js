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

themeButton.onclick = function() {
    toggleTheme();
}

displayTheme();

// SNAKE

let snakeScreen = document.getElementById("snake-screen");
let snakeButton = document.getElementById("snake-button");

function runSnake() {
    // DOESNT WORK
    document.addEventListener("keydown", function(e) {
        if (e.key === "Backspace") {
            snakeScreen.style.visibility = "hidden";
            homeScreen.style.visibility = "visible";
        }
    })
}

snakeButton.onclick = function() {
    homeScreen.style.visibility = "hidden";
    snakeScreen.style.visibility = "visible";
}