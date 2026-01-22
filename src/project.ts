import {ProjectMetadata} from "./types/types";

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
				link.href = file;
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

async function loadProjectPage(): Promise<void> {
	const meta = await fetch("metadata.json").then(res => res.json()) as ProjectMetadata;

	document.title = meta.name;
	(document.getElementById("title") as HTMLElement).textContent = meta.name;
	(document.getElementById("description") as HTMLElement).textContent = meta.long || meta.short;
	(document.getElementById("cover") as HTMLImageElement).src = meta.cover;

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
		const assetImage = document.createElement("img");
		assetImage.src = asset;
		gallery.appendChild(assetImage);
	});
}

loadProjectPage();