export async function InstanceHTMLElementTemplate(container: HTMLElement, templatePath: string) {
	const response = await fetch(templatePath);
	const htmlText = await response.text();

	const parser = new DOMParser();
	const doc = parser.parseFromString(htmlText, "text/html");

	// Replace the placeholder with all template content.
	const children = Array.from(doc.body.children);
	container.replaceWith(...children);
}