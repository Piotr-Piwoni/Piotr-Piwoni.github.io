// @ts-ignore
import {InitThemeToggle} from "../dist/themeToggle.js";
// @ts-ignore
import {InstanceHTMLElementTemplate} from "../dist/utilities.js";

async function InstancePage(pageInstanceContainer: HTMLElement) {
	const response = await fetch("../../template/html/_projectPageTemplate.html");
	const htmlText = await response.text();

	const parser = new DOMParser();
	const doc = parser.parseFromString(htmlText, "text/html");

	// Move all <body> children from the template and replace the placeholder with all template content.
	const children = Array.from(doc.body.children);
	pageInstanceContainer.replaceWith(...children);

	// Scripts needed.
	const script = document.createElement("script");
	script.src = "../../dist/project.js";
	script.type = "module";
	document.body.appendChild(script);
}

async function loadProjectTemplate(): Promise<void> {
	const pageInstanceContainer = document.getElementById("page-instance");
	if (!pageInstanceContainer) return;
	await InstancePage(pageInstanceContainer);

	const headerInstanceContainer = document.getElementById("header-instance");
	if (!headerInstanceContainer) return;
	await InstanceHTMLElementTemplate(headerInstanceContainer, "../../template/html/_headerTemplate.html");

	const footerInstanceContainer = document.getElementById("footer-instance");
	if (!footerInstanceContainer) return;
	await InstanceHTMLElementTemplate(footerInstanceContainer, "../../template/html/_footerTemplate.html");
	
	// Handle theme toggling.
	const themeBtn = document.getElementById("theme-toggle") as HTMLButtonElement | null;
	InitThemeToggle(themeBtn);

}

document.addEventListener("DOMContentLoaded", loadProjectTemplate);
