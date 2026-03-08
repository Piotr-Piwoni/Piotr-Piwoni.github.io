import {ProjectMetadata} from "./types/types.js";
import * as Vars from "./variables.js";
import {initThemeToggle} from "./themeToggle.js";
import {insertCodeblock} from "./utilities.js";


let index: number = 0;
let galleryTrack: HTMLElement | null = null;
let galleryTrackItems: NodeListOf<HTMLElement> | null = null;


function createActionButtons(meta: ProjectMetadata) {
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

function updateCarousel() {
	if (!galleryTrackItems || !galleryTrack) return;

	const viewport = galleryTrack.parentElement as HTMLElement;
	const selected = galleryTrackItems[index];

	const viewportWidth = viewport.offsetWidth;
	const itemCenter = selected.offsetLeft + selected.offsetWidth / 2;

	const offset = itemCenter - viewportWidth / 2;

	galleryTrack.style.transform = `translateX(${-offset}px)`;
}

function galleryNext() {
	if (!galleryTrackItems) return;
	index = Math.min(index + 1, galleryTrackItems.length - 1);
	updateCarousel();
}

function galleryPrev() {
	index = Math.max(index - 1, 0);
	updateCarousel();
}

function setMainFocus(item: HTMLElement) {
	const focus = document.querySelector("#gallery-dialog .main-focus") as HTMLElement;
	// Clear previous content.
	focus.innerHTML = "";
	// Clone the clicked element so we don't move it from the carousel.
	focus.appendChild(item.cloneNode(true));
}

async function loadPage(): Promise<void> {
	const meta = await fetch("metadata.json").then(res => res.json()) as ProjectMetadata;

	// Update page title.
	let titleStr = document.title.split(" - ");
	document.title = `${Vars.websiteName || titleStr[0]} - ${meta.name || titleStr[1]}`;

	(document.getElementById("title") as HTMLElement).textContent = meta.name;
	const descriptionEl = document.getElementById("description")!;

	// Check if the paragraph is empty or only whitespace.
	if (!descriptionEl.textContent || descriptionEl.textContent.trim() === "") {
		renderFormattedText(descriptionEl, meta.short);
	}


	// Create tag elements.
	const tagsDiv = document.getElementById("tags") as HTMLElement;
	[...new Set(meta.tags)].forEach(tag => { //< remove duplicates.
		const span = document.createElement("span");
		span.className = "tag";
		span.textContent = tag;
		tagsDiv.appendChild(span);
	});

	createActionButtons(meta);


	// Set up gallery dialog.
	const enlargedGallery = document.getElementById("gallery-dialog") as HTMLDialogElement;
	galleryTrack = enlargedGallery.querySelector(".carousel .track") as HTMLElement;

	// Set up the cover image.
	const cover = document.getElementById("cover") as HTMLImageElement;
	cover.src = `assets/${meta.cover}`;

	// Try and add the cover to the gallery dialog track.
	galleryTrack?.appendChild(cover.cloneNode(true));

	// Set up the cover's button.
	const coverButton = cover.parentElement as HTMLButtonElement;
	coverButton.onclick = () => {
		index = 0;
		enlargedGallery?.showModal();

		// Wait until the dialog has rendered its layout.
		requestAnimationFrame(() => {
			updateCarousel();
			const item = galleryTrackItems?.[index];
			if (item) setMainFocus(item);
		});
	};


	// Load addition project assets.
	const gallery = document.getElementById("gallery") as HTMLElement;
	meta.additionalAssets.forEach((asset, i) => {
		const button = document.createElement("button");
		button.className = "dialog-open";
		button.onclick = () => {
			index = i + 1;
			enlargedGallery?.showModal();

			// Wait until the dialog has rendered its layout.
			requestAnimationFrame(() => {
				updateCarousel();
				const item = galleryTrackItems?.[index];
				if (item) setMainFocus(item);
			});
		};

		if (asset.endsWith(".mp4") || asset.endsWith(".webm")) {
			const video = document.createElement("video");
			video.src = `assets/${asset}`;
			video.controls = true;
			video.width = 150;
			button.append(video);
		}
		else {
			const img = document.createElement("img");
			img.src = `assets/${asset}`;
			button.appendChild(img);
		}

		gallery.appendChild(button);
		galleryTrack?.appendChild(button.firstChild?.cloneNode(true) as HTMLElement);
	});

	galleryTrackItems = enlargedGallery.querySelectorAll(".carousel .track > *");
	if (galleryTrack && galleryTrackItems) {
		enlargedGallery.querySelector<HTMLButtonElement>(".dialog-close")!.onclick = () => {
			enlargedGallery.close();
		};

		enlargedGallery.querySelector<HTMLButtonElement>(".next")!.onclick = galleryNext;
		enlargedGallery.querySelector<HTMLButtonElement>(".prev")!.onclick = galleryPrev;

		galleryTrackItems.forEach((item, i) => {
			item.onclick = () => {
				index = i;
				const selected = galleryTrackItems![index];
				setMainFocus(selected);
				updateCarousel();
			};
		});
	}

	// Insert codeblocks.
	const codeblocks = document.querySelectorAll<HTMLElement>(".placeCodeblock");
	codeblocks.forEach(cb => insertCodeblock(cb));
}

document.addEventListener("DOMContentLoaded", async () => {
	await loadPage();

	initThemeToggle(document.getElementById("theme-toggle") as HTMLButtonElement);
});