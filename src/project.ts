import {ProjectMetadata} from "./types/types";

async function loadProjectPage(): Promise<void> {
	const meta = await fetch("metadata.json").then(res => res.json()) as ProjectMetadata;

	document.title = meta.name;
	(document.getElementById("project-title") as HTMLElement).textContent = meta.name;
	(document.getElementById("project-description") as HTMLElement).textContent = meta.long || meta.short;
	(document.getElementById("project-cover") as HTMLImageElement).src = meta.cover;

	const tagsDiv = document.getElementById("tags") as HTMLElement;
	meta.tags.forEach(tag => {
		const span = document.createElement("span");
		span.textContent = tag;
		span.className = "tag";
		tagsDiv.appendChild(span);
	});
}

loadProjectPage();