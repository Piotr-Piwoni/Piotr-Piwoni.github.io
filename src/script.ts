import {ProjectMetadata} from "./types/types";

const projectsFolders: string[] = ["testProject", "testProject2", "testProject3", "testProject4"];
let allProjectsMeta: ProjectMetadata[] = [];
let displayedProjects = 0;
const batchSize = 3;
const activeTags = new Set<string>();


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
		coverImg.src = `projects/${project.folder}/${project.cover}`;
		coverImg.alt = `${project.name} Cover`;
		cardClone.querySelector("#name")!.textContent = project.name;
		cardClone.querySelector("p")!.textContent = project.short;
		const tagsContainer = cardClone.querySelector(".tags")!;
		project.tags.forEach(tag => {
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
	const filterContainer = document.getElementById("filter-container") as HTMLElement;
	filterContainer.innerHTML = "";
	const tags = new Set<string>();

	allProjectsMeta.forEach(project => project.tags.forEach((tag) => tags.add(tag)));

	// Create a button object for each tag.
	tags.forEach(tag => {
		const button = document.createElement("button");
		button.textContent = tag;
		button.classList.add("filter-button");
		button.onclick = () => {
			filterByTag(tag);
			button.classList.toggle("active");
		};
		filterContainer.appendChild(button);
	});
}

function resetFilters(): void {
	displayedProjects = 0;
	const container = document.getElementById("projects") as HTMLElement;
	container.replaceChildren();
	renderProjects();
}

async function loadProjects(): Promise<void> {
	const list: ProjectMetadata[] = [];

	for (const folder of projectsFolders) {
		const meta = await fetch(`projects/${folder}/metadata.json`)
			.then(res => res.json()) as ProjectMetadata;
		meta.folder = folder;
		list.push(meta);
	}

	allProjectsMeta = list;
	renderProjects();
	buildFilters();
}

const loadMoreButton = document.getElementById("loadMoreButton") as HTMLButtonElement;
loadMoreButton.onclick = () => renderProjects();

// Initialize homepage.
loadProjects();