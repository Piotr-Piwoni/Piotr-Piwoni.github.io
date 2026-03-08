import * as Vars from "./variables.js";
import { initThemeToggle } from "./themeToggle.js";
import { insertCodeblock } from "./utilities.js";
let trackIndex = 0;
let selectedTrackItem = 0;
let galleryTrack = null;
let galleryTrackItems = null;
function createActionButtons(meta) {
    // Get the required containers for the action buttons.
    const actionsContainer = document.getElementById("actions");
    const outlinkContainer = document.getElementById("outlinks");
    // Create a download button if there are files.
    const downloadTemplate = document.getElementById("download-all-template");
    if (meta.downloadFiles && meta.downloadFiles.length > 0) {
        const downloadClone = downloadTemplate.content.cloneNode(true);
        const downloadButton = downloadClone.querySelector("a");
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
    const outlinkTemplate = document.getElementById("outlink-template");
    meta.outLinks.forEach(outlink => {
        const outlinkClone = outlinkTemplate.content.cloneNode(true);
        const link = outlinkClone.querySelector("a");
        link.href = outlink.url;
        link.textContent = outlink.name;
        outlinkContainer.appendChild(outlinkClone);
    });
}
function renderFormattedText(container, text) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div>${text}</div>`, "text/html");
    const fragment = document.createDocumentFragment();
    Array.from(doc.body.firstElementChild.childNodes).forEach(node => {
        fragment.appendChild(node.cloneNode(true));
    });
    container.replaceChildren(fragment);
}
function updateCarousel() {
    if (!galleryTrackItems || !galleryTrack)
        return;
    const viewport = galleryTrack.parentElement;
    const selected = galleryTrackItems[trackIndex];
    const viewportWidth = viewport.offsetWidth;
    const itemCenter = selected.offsetLeft + selected.offsetWidth / 2;
    const offset = itemCenter - viewportWidth / 2;
    galleryTrack.style.transform = `translateX(${-offset}px)`;
}
function galleryNext() {
    if (!galleryTrackItems)
        return;
    trackIndex = Math.min(trackIndex + 1, galleryTrackItems.length - 1);
    updateCarousel();
}
function galleryPrev() {
    trackIndex = Math.max(trackIndex - 1, 0);
    updateCarousel();
}
function setMainFocus(item) {
    const focus = document.querySelector("#gallery-dialog .main-focus");
    // Clear previous content.
    focus.innerHTML = "";
    // Clone the clicked element so we don't move it from the carousel.
    focus.appendChild(item.cloneNode(true));
}
function setSelectedMedia(indexValue, galleryModel) {
    trackIndex = indexValue;
    if (galleryModel && !galleryModel.open) {
        galleryModel.showModal();
    }
    // Wait until the dialog has rendered its layout.
    requestAnimationFrame(() => {
        updateCarousel();
        const item = galleryTrackItems?.[trackIndex];
        if (item) {
            selectedTrackItem = trackIndex;
            item.classList.add("selected");
            setMainFocus(item);
        }
    });
}
async function loadPage() {
    const meta = await fetch("metadata.json").then(res => res.json());
    // Update page title.
    let titleStr = document.title.split(" - ");
    document.title = `${Vars.websiteName || titleStr[0]} - ${meta.name || titleStr[1]}`;
    document.getElementById("title").textContent = meta.name;
    const descriptionEl = document.getElementById("description");
    // Check if the paragraph is empty or only whitespace.
    if (!descriptionEl.textContent || descriptionEl.textContent.trim() === "") {
        renderFormattedText(descriptionEl, meta.short);
    }
    // Create tag elements.
    const tagsDiv = document.getElementById("tags");
    [...new Set(meta.tags)].forEach(tag => {
        const span = document.createElement("span");
        span.className = "tag";
        span.textContent = tag;
        tagsDiv.appendChild(span);
    });
    createActionButtons(meta);
    // Set up gallery dialog.
    const enlargedGallery = document.getElementById("gallery-dialog");
    galleryTrack = enlargedGallery.querySelector(".carousel .track");
    // Set up the cover image.
    const cover = document.getElementById("cover");
    cover.src = `assets/${meta.cover}`;
    // Try and add the cover to the gallery dialog track.
    galleryTrack?.appendChild(cover.cloneNode(true));
    // Set up the cover's button.
    const coverButton = cover.parentElement;
    coverButton.onclick = () => { setSelectedMedia(0, enlargedGallery); };
    // Load addition project assets.
    const gallery = document.getElementById("gallery");
    meta.additionalAssets.forEach((asset, i) => {
        const button = document.createElement("button");
        button.className = "dialog-open";
        button.onclick = () => { setSelectedMedia(i + 1, enlargedGallery); };
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
        galleryTrack?.appendChild(button.firstChild?.cloneNode(true));
    });
    galleryTrackItems = enlargedGallery.querySelectorAll(".carousel .track > *");
    if (galleryTrack && galleryTrackItems) {
        // Set the close button on click function.
        enlargedGallery.querySelector(".dialog-close").onclick = () => {
            enlargedGallery.close();
            galleryTrackItems[selectedTrackItem].classList.remove("selected");
        };
        enlargedGallery.querySelector(".next").onclick = galleryNext;
        enlargedGallery.querySelector(".prev").onclick = galleryPrev;
        // Set the on click function for all the tack items.
        galleryTrackItems.forEach((item, i) => {
            item.onclick = () => {
                galleryTrackItems[selectedTrackItem].classList.remove("selected");
                setSelectedMedia(i, null);
            };
        });
    }
    // Insert codeblocks.
    const codeblocks = document.querySelectorAll(".placeCodeblock");
    codeblocks.forEach(cb => insertCodeblock(cb));
}
document.addEventListener("DOMContentLoaded", async () => {
    await loadPage();
    initThemeToggle(document.getElementById("theme-toggle"));
});
