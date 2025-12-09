import {ProjectMetadata} from "./types/types";

const projectsFolders: string[] = ["testProject", "testProject2", "testProject3"];
let allProjectsMeta: ProjectMetadata[] = [];
let displayedProjects = 0;
const batchSize = 3;
const activeTags = new Set<string>();


function renderProjects(filteredMetaData?: ProjectMetadata[]): void {
	const container = document.getElementById("projects") as HTMLElement;
	const list: ProjectMetadata[] = filteredMetaData || allProjectsMeta;
	const slice: ProjectMetadata[] = list.slice(displayedProjects, displayedProjects + batchSize);
	displayedProjects += slice.length;

	// Generate a card based on the project information.
	slice.forEach(project => {
		container.innerHTML += `
		<a href="projects/${project.folder}/${project.page}" class="project-card">
		<img src="projects/${project.folder}/${project.cover}" alt="${project.name} Cover">
		<h3>${project.name}</h3>
		<p>${project.short}</p>
		<div class="tags">
			${project.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
		</div>
		</a>`;
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
	container.innerHTML = "";

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

	// Create a checkbox object for each tag.
	/*	tags.forEach(tag => {
	 const label = document.createElement("label");
	 label.classList.add("filter-option");

	 const checkbox = document.createElement("input");
	 checkbox.type = "checkbox";
	 checkbox.value = tag;
	 checkbox.onclick = () => filterByTag(tag);

	 label.appendChild(checkbox);
	 label.append(tag);
	 filterContainer.appendChild(label);
	 });*/

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
	container.innerHTML = "";
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