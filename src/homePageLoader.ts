import {ProjectMetadata, TagCategories} from "./types/types";
// @ts-ignore
import * as Vars from "../dist/variables.js";


let allProjectsMeta: ProjectMetadata[] = [];
let displayedProjects = 0;
const batchSize = 3;
const activeTags = new Set<string>();
let tagCategories: TagCategories = {};


function renderProjects(filteredMetaData?: ProjectMetadata[]): void {
	const cardContainer = document.getElementById("projects") as HTMLElement;
	const list: ProjectMetadata[] = filteredMetaData || allProjectsMeta;
	const slice: ProjectMetadata[] = list.slice(displayedProjects, displayedProjects + batchSize);
	displayedProjects += slice.length;

	// Generate a card based on the project information.
	const cardTemplate = document.getElementById("project-card-template") as HTMLTemplateElement;
	slice.forEach(project => {
		const cardClone = cardTemplate.content.cloneNode(true) as HTMLElement;

		cardClone.querySelector("a")!.href = `projects/${project.folder}/${project.page}`;
		const coverImg = cardClone.querySelector("img")!;
		coverImg.src = `projects/${project.folder}/assets/${project.cover}`;
		coverImg.alt = `${project.name} Cover`;
		cardClone.querySelector("#name")!.textContent = project.name;
		cardClone.querySelector("p")!.textContent = project.short;
		const tagsContainer = cardClone.querySelector(".tags")!;
		[...new Set(project.tags)].forEach(tag => { //< remove duplicates.
			const span = document.createElement("span");
			span.className = "tag";
			span.textContent = tag;
			tagsContainer.appendChild(span);
		});

		cardContainer.appendChild(cardClone);
	});

	// Show/hide the "Load More" button based if all projects are loaded.
	const button = document.getElementById("loadMoreButton") as HTMLButtonElement;
	button.style.display = displayedProjects >= list.length ? "none" : "block";

	// Add fade only if overflowing.
	// Project card description.
	document.querySelectorAll(".project-card-short").forEach(card => {
		if (card.scrollHeight > card.clientHeight) {
			card.classList.add("has-fade");
		}
	});
	// Project card tags.
	document.querySelectorAll(".tags").forEach(tag => {
		if (tag.scrollHeight > tag.clientHeight) {
			tag.classList.add("has-fade");
		}
	});
}

function filterByTag(tag: string): void {
	if (activeTags.has(tag))
		activeTags.delete(tag);
	else
		activeTags.add(tag);

	displayedProjects = 0;
	const container = document.getElementById("projects") as HTMLElement;
	container.replaceChildren();

	// If no tags are selected, load all projects.
	if (activeTags.size === 0) {
		resetFilters();
		return;
	}

	const filtered = allProjectsMeta.filter(project => project.tags
															  .some(tag => activeTags.has(tag)));
	renderProjects(filtered);
}

function buildFilters(): void {
	const filterContainer = document.getElementById("filter-container")!;
	filterContainer.replaceChildren();

	// Group project tags by category.
	const groupedTags: Record<string, Set<string>> = {};
	allProjectsMeta.forEach(project => {
		project.tags.forEach(tag => {
			// Search through tagCategories to find the matching full tag and category.
			let found = false;
			for (const category in tagCategories) {
				const fullTags = tagCategories[category];
				for (let i = 0; i < fullTags.length; i++) {
					if (fullTags[i].includes(tag)) {
						if (!groupedTags[category])
							groupedTags[category] = new Set();

						groupedTags[category].add(tag);
						found = true;
						break;
					}
				}
				if (found) break;
			}

			// If not found in tagCategories, put under "Other".
			if (!found) {
				if (!groupedTags["Other"])
					groupedTags["Other"] = new Set();

				groupedTags["Other"].add(tag);
			}
		});
	});

	// Render grouped filters.
	for (const category in groupedTags) {
		// Header for the category.
		const groupTitle = document.createElement("button");
		groupTitle.textContent = category;
		groupTitle.classList.add("collapsible");
		filterContainer.appendChild(groupTitle);

		// Symbol.
		const collapsibleIcon = document.createElement("span");
		collapsibleIcon.textContent = "+";
		collapsibleIcon.classList.add("symbol");
		groupTitle.appendChild(collapsibleIcon);

		// Collapsible content.
		const buttonContainer = document.createElement("div");
		buttonContainer.classList.add("content");
		filterContainer.appendChild(buttonContainer);

		groupTitle.onclick = () => {
			groupTitle.classList.toggle("active");
			const isOpen = buttonContainer.classList.toggle("is-open");
			buttonContainer.style.maxHeight = isOpen ? buttonContainer.scrollHeight + "px" : "0";
			collapsibleIcon.textContent = isOpen ? "−" : "+";
		};

		const tags = groupedTags[category];
		tags.forEach(tag => {
			// Find the full display name in tagCategories.
			let displayName = tag;
			for (const cat in tagCategories) {
				const fullTags = tagCategories[cat];
				for (let i = 0; i < fullTags.length; i++) {
					if (fullTags[i].includes(tag)) {
						displayName = fullTags[i];
						break;
					}
				}
			}

			const button = document.createElement("button");
			button.textContent = displayName;
			button.classList.add("filter-button");
			button.onclick = () => {
				filterByTag(tag);
				button.classList.toggle("active");
			};
			buttonContainer.appendChild(button);
		});
	}
}

function resetFilters(): void {
	displayedProjects = 0;
	const container = document.getElementById("projects") as HTMLElement;
	container.replaceChildren();
	renderProjects();
}

async function loadProjects(): Promise<void> {
	// Update page title.
	if (Vars.websiteName)
		document.title = Vars.websiteName;

	const list: ProjectMetadata[] = [];

	// Load Projects meta data.
	for (const folder of Vars.viewableProjects) {
		const meta = await fetch(`projects/${folder}/metadata.json`)
			.then(res => res.json()) as ProjectMetadata;
		meta.folder = folder;
		list.push(meta);
	}

	// Load Tag categories.
	tagCategories = await fetch("data/tag-categories.json").then(res => res.json());

	allProjectsMeta = list;
	renderProjects();
	buildFilters();
}

document.addEventListener("DOMContentLoaded", async () => {
	await loadProjects();

	// Attach load more button AFTER it exists.
	const loadMoreButton = document.getElementById("loadMoreButton") as HTMLButtonElement;
	if (loadMoreButton) {
		loadMoreButton.onclick = () => renderProjects();
	}
});