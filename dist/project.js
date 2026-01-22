var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function CreateActionButtons(meta) {
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
                link.href = file;
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
function loadProjectPage() {
    return __awaiter(this, void 0, void 0, function* () {
        const meta = yield fetch("metadata.json").then(res => res.json());
        document.title = meta.name;
        document.getElementById("title").textContent = meta.name;
        document.getElementById("description").textContent = meta.long || meta.short;
        document.getElementById("cover").src = meta.cover;
        // Create tag elements.
        const tagsDiv = document.getElementById("tags");
        [...new Set(meta.tags)].forEach(tag => {
            const span = document.createElement("span");
            span.className = "tag";
            span.textContent = tag;
            tagsDiv.appendChild(span);
        });
        CreateActionButtons(meta);
        // Load addition project assets.
        const gallery = document.getElementById("gallery");
        meta.additionalAssets.forEach(asset => {
            const assetImage = document.createElement("img");
            assetImage.src = asset;
            gallery.appendChild(assetImage);
        });
    });
}
loadProjectPage();
export {};
