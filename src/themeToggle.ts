export function InitThemeToggle(toggleBtn: HTMLButtonElement | null) {
	if (!toggleBtn) return;

	const toggleIcon = toggleBtn.firstElementChild as HTMLImageElement;

	// Grab both SVG children.
	const darkIcon = toggleBtn.children[0] as SVGElement;
	const lightIcon = toggleBtn.children[1] as SVGElement;

	const updateIcon = (theme: string) => {
		if (theme === "light") {
			darkIcon.style.display = "block";
			lightIcon.style.display = "none";
		}
		else {
			darkIcon.style.display = "none";
			lightIcon.style.display = "block";
		}
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
