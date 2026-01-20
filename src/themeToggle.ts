function InitThemeToggle(toggleBtn: HTMLButtonElement | null) {
	if (!toggleBtn) return;

	const toggleIcon = toggleBtn.firstElementChild as HTMLImageElement;

	const updateIcon = (theme: string) => {
		toggleIcon.alt = theme === "light" ? "Toggle Dark Mode" : "Toggle Light Mode";
		toggleIcon.src = theme === "light" ? "assets/night-mode.png" : "assets/sun-mode.png";
	};

	const getInitialTheme = (): string => {
		const saved = localStorage.getItem("theme");
		if (saved === "light" || saved === "dark") return saved;
		return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	};

	// Apply theme.
	const initialTheme = getInitialTheme();
	document.documentElement.setAttribute("data-theme", initialTheme);
	updateIcon(initialTheme);

	// Toggle theme on button click.
	toggleBtn.addEventListener("click", () => {
		const current = document.documentElement.dataset.theme ?? "light";
		const next = current === "light" ? "dark" : "light";
		document.documentElement.setAttribute("data-theme", next);
		localStorage.setItem("theme", next);
		updateIcon(next);
	});
}

document.addEventListener("DOMContentLoaded", () => {
	const btn = document.getElementById("theme-toggle") as HTMLButtonElement | null;
	InitThemeToggle(btn);
});