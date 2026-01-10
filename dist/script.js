var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const projectsFolders = ["testProject", "testProject2", "testProject3", "testProject4"];
let allProjectsMeta = [];
let displayedProjects = 0;
const batchSize = 3;
const activeTags = new Set();
function renderProjects(filteredMetaData) {
    const cardContainer = document.getElementById("projects");
    const list = filteredMetaData || allProjectsMeta;
    const slice = list.slice(displayedProjects, displayedProjects + batchSize);
    displayedProjects += slice.length;
    // Generate a card based on the project information.
    const cardTemplate = document.getElementById("project-card-template");
    slice.forEach(project => {
        const cardClone = cardTemplate.content.cloneNode(true);
        cardClone.querySelector("a").href = `projects/${project.folder}/${project.page}`;
        const coverImg = cardClone.querySelector("img");
        coverImg.src = `projects/${project.folder}/${project.cover}`;
        coverImg.alt = `${project.name} Cover`;
        cardClone.querySelector("#name").textContent = project.name;
        cardClone.querySelector("p").textContent = project.short;
        const tagsContainer = cardClone.querySelector(".tags");
        project.tags.forEach(tag => {
            const span = document.createElement("span");
            span.className = "tag";
            span.textContent = tag;
            tagsContainer.appendChild(span);
        });
        cardContainer.appendChild(cardClone);
    });
    // Show/hide the "Load More" button based if all projects are loaded.
    const button = document.getElementById("loadMoreButton");
    button.style.display = displayedProjects >= list.length ? "none" : "block";
}
function filterByTag(tag) {
    if (activeTags.has(tag))
        activeTags.delete(tag);
    else
        activeTags.add(tag);
    displayedProjects = 0;
    const container = document.getElementById("projects");
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
function buildFilters() {
    const filterContainer = document.getElementById("filter-container");
    filterContainer.innerHTML = "";
    const tags = new Set();
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
function resetFilters() {
    displayedProjects = 0;
    const container = document.getElementById("projects");
    container.replaceChildren();
    renderProjects();
}
function loadProjects() {
    return __awaiter(this, void 0, void 0, function* () {
        const list = [];
        for (const folder of projectsFolders) {
            const meta = yield fetch(`projects/${folder}/metadata.json`)
                .then(res => res.json());
            meta.folder = folder;
            list.push(meta);
        }
        allProjectsMeta = list;
        renderProjects();
        buildFilters();
    });
}
const loadMoreButton = document.getElementById("loadMoreButton");
loadMoreButton.onclick = () => renderProjects();
// Initialize homepage.
loadProjects();
export {};
