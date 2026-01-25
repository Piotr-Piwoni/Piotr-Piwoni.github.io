import {ProjectMetadata} from "./types/types";
// @ts-ignore
import * as Vars from "../dist/variables.js";


function CreateActionButtons(meta: ProjectMetadata) {
	// Get the required containers for the action buttons.
	const actionsContainer = document.getElementById("actions")!;
	const outlinkContainer = document.getElementById("outlinks")!;

	// Create a download button if there are files.
	const downloadTemplate = document.getElementById("download-all-template") as HTMLTemplateElement;
	if (meta.downloadFiles && meta.downloadFiles.length > 0) {
		const downloadClone = downloadTemplate.content.cloneNode(true) as HTMLElement;
		const downloadButton = downloadClone.querySelector("a")!;

		// On click, download each file.
		downloadButton.onclick = (e) => {
			e.preventDefault();
			meta.downloadFiles.forEach(file => {
				const link = document.createElement("a");
				link.href = `assets/${file}`;
				link.download = file.split("/").pop() || "file";
				link.click();
			});
		};
		actionsContainer.insertBefore(downloadClone, outlinkContainer);
	}


	// Create out links if any.
	const outlinkTemplate = document.getElementById("outlink-template") as HTMLTemplateElement;
	meta.outLinks.forEach(outlink => {
		const outlinkClone = outlinkTemplate.content.cloneNode(true) as HTMLElement;
		const link = outlinkClone.querySelector("a")!;

		link.href = outlink.url;
		link.textContent = outlink.name;

		outlinkContainer.appendChild(outlinkClone);
	});
}

function renderFormattedText(container: HTMLElement, text: string) {
	const parser = new DOMParser();
	const doc = parser.parseFromString(`<div>${text}</div>`, "text/html");
	const fragment = document.createDocumentFragment();

	Array.from(doc.body.firstElementChild!.childNodes).forEach(node => {
		fragment.appendChild(node.cloneNode(true));
	});

	container.replaceChildren(fragment);
}

async function loadProjectPage(): Promise<void> {
	const meta = await fetch("metadata.json").then(res => res.json()) as ProjectMetadata;

	// Update page title.
	let titleStr = document.title.split(" - ");
	document.title = `${Vars.websiteName || titleStr[0]} -${meta.name || titleStr[1]}`;

	(document.getElementById("title") as HTMLElement).textContent = meta.name;
	(document.getElementById("cover") as HTMLImageElement).src = `assets/${meta.cover}`;
	const descriptionEl = document.getElementById("description")!;
	renderFormattedText(descriptionEl, meta.long || meta.short);

	// Create tag elements.
	const tagsDiv = document.getElementById("tags") as HTMLElement;
	[...new Set(meta.tags)].forEach(tag => { //< remove duplicates.
		const span = document.createElement("span");
		span.className = "tag";
		span.textContent = tag;
		tagsDiv.appendChild(span);
	});

	CreateActionButtons(meta);

	// Load addition project assets.
	const gallery = document.getElementById("gallery") as HTMLElement;
	meta.additionalAssets.forEach(asset => {
		if (asset.endsWith(".mp4") || asset.endsWith(".webm")) {
			const video = document.createElement("video");
			video.src = `assets/${asset}`;
			video.controls = true;
			video.width = 150;
			gallery.appendChild(video);
		}
		else {
			const img = document.createElement("img");
			img.src = `assets/${asset}`;
			gallery.appendChild(img);
		}
	});
}

loadProjectPage();