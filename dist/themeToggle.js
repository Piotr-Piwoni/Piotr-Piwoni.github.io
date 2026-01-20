"use strict";
function InitThemeToggle(toggleBtn) {
    if (!toggleBtn)
        return;
    const toggleIcon = toggleBtn.firstElementChild;
    const updateIcon = (theme) => {
        toggleIcon.alt = theme === "light" ? "Toggle Dark Mode" : "Toggle Light Mode";
        toggleIcon.src = theme === "light" ? "assets/night-mode.png" : "assets/sun-mode.png";
    };
    const getInitialTheme = () => {
        const saved = localStorage.getItem("theme");
        if (saved === "light" || saved === "dark")
            return saved;
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    };
    // Apply theme.
    const initialTheme = getInitialTheme();
    document.documentElement.setAttribute("data-theme", initialTheme);
    updateIcon(initialTheme);
    // Toggle theme on button click.
    toggleBtn.addEventListener("click", () => {
        var _a;
        const current = (_a = document.documentElement.dataset.theme) !== null && _a !== void 0 ? _a : "light";
        const next = current === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
        updateIcon(next);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("theme-toggle");
    InitThemeToggle(btn);
});
