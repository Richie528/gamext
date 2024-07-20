// THEMES

let rootElement = document.querySelector(":root");
let currentTheme = 0;
let themeKeys = ["--base", "--mantle", "--crust", "--surface", "--green", "--red", "--test", "--subtext"];
let lightMode = ["#eff1f5", "#e6e9ef", "#dce0e8", "#acb0be", "#a6d189", "#e78284", "#4c4f69", "#8f91a0"];
let darkMode = ["#1e1e2e", "#181825", "#11111b", "#313244", "#a6d189", "#e78284", "#cdd6f4", "#98a0bc"];

function displayTheme() {
    for (let i = 0; i < themeKeys.length; i++) {
        rootElement.setProperty(
            themeKeys[i],
            (currentTheme) ? darkMode[i] : lightMode[i]
        );
    }
}
function toggleTheme() {
    currentTheme = !currentTheme;
    displayTheme();
}

displayTheme();