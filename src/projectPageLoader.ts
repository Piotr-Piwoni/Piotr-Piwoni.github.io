// @ts-ignore
import {InitThemeToggle} from "../dist/themeToggle.js";

async function loadProjectTemplate(): Promise<void> {
	const instanceContainer = document.getElementById("Page Instance");
	if (!instanceContainer) return;

	const response = await fetch("../../template/html/_projectPageTemplate.html");
	const htmlText = await response.text();

	const parser = new DOMParser();
	const doc = parser.parseFromString(htmlText, "text/html");

	// Move all <body> children from the template
	const templateBody = doc.body;
	const children = Array.from(templateBody.children);

	// Replace the placeholder with all template content
	instanceContainer.replaceWith(...children);

	// Scripts need to be added after content exists
	const script = document.createElement("script");
	script.src = "../../dist/project.js";
	script.type = "module";
	document.body.appendChild(script);



	const themeBtn = document.getElementById("theme-toggle") as HTMLButtonElement | null;
	InitThemeToggle(themeBtn);

}

document.addEventListener("DOMContentLoaded", loadProjectTemplate);
