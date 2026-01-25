var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as Vars from "./variables.js";
import { InitThemeToggle } from "./themeToggle.js";
let allProjectsMeta = [];
let displayedProjects = 0;
const batchSize = 3;
const activeTags = new Set();
let tagCategories = {};
let searchQuery = "";
function filterBySearch() {
    const lowerQuery = searchQuery.toLowerCase();
    return allProjectsMeta.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(lowerQuery);
        const matchesTags = activeTags.size === 0 || project.tags.some(tag => activeTags.has(tag));
        return matchesSearch && matchesTags;
    });
}
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
        coverImg.src = `projects/${project.folder}/assets/${project.cover}`;
        coverImg.alt = `${project.name} Cover`;
        cardClone.querySelector("#name").textContent = project.name;
        cardClone.querySelector("p").textContent = project.short;
        const tagsContainer = cardClone.querySelector(".tags");
        [...new Set(project.tags)].forEach(tag => {
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
function filterByTag(tag) {
    if (activeTags.has(tag))
        activeTags.delete(tag);
    else
        activeTags.add(tag);
    const filtered = filterBySearch();
    updateFilters(filtered);
}
function buildFilters() {
    const filterContainer = document.getElementById("filter-container");
    filterContainer.replaceChildren();
    // Group project tags by category.
    const groupedTags = {};
    allProjectsMeta.forEach(project => {
        project.tags.forEach(tag => {
            let found = false;
            for (const category in tagCategories) {
                const fullTags = tagCategories[category];
                for (const fullTag of fullTags) {
                    if (!fullTag.includes(tag))
                        continue;
                    if (!groupedTags[category])
                        groupedTags[category] = new Set();
                    // Only add if the "fullTag" is not already in the Set.
                    if (!groupedTags[category].has(fullTag)) {
                        groupedTags[category].add(fullTag);
                    }
                    found = true;
                    break;
                }
                if (found)
                    break;
            }
            // In case a tag exists without a category.
            if (!found) {
                if (!groupedTags["Other"])
                    groupedTags["Other"] = new Set();
                if (!groupedTags["Other"].has(tag))
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
            const button = document.createElement("button");
            button.textContent = tag;
            button.classList.add("filter-button");
            button.onclick = () => {
                filterByTag(tag);
                button.classList.toggle("active");
            };
            buttonContainer.appendChild(button);
        });
    }
}
function updateFilters(filters) {
    displayedProjects = 0;
    const container = document.getElementById("projects");
    container.replaceChildren();
    renderProjects(filters);
}
function loadProjects() {
    return __awaiter(this, void 0, void 0, function* () {
        // Update page title.
        if (Vars.websiteName)
            document.title = Vars.websiteName;
        const list = [];
        // Load Projects meta data.
        for (const folder of Vars.viewableProjects) {
            const meta = yield fetch(`projects/${folder}/metadata.json`)
                .then(res => res.json());
            meta.folder = folder;
            list.push(meta);
        }
        // Load Tag categories.
        tagCategories = yield fetch("data/tag-categories.json").then(res => res.json());
        allProjectsMeta = list;
        renderProjects();
        buildFilters();
    });
}
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    yield loadProjects();
    InitThemeToggle(document.getElementById("theme-toggle"));
    // Attach load more button AFTER it exists.
    const loadMoreButton = document.getElementById("loadMoreButton");
    if (loadMoreButton) {
        loadMoreButton.onclick = () => renderProjects();
    }
    //Set up the search bar.
    const searchInput = document.getElementById("project-search-bar");
    searchInput.addEventListener("input", () => {
        searchQuery = searchInput.value;
        const filtered = filterBySearch();
        updateFilters(filtered);
    });
}));
