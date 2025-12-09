var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function loadProjectPage() {
    return __awaiter(this, void 0, void 0, function* () {
        const meta = yield fetch("metadata.json").then(res => res.json());
        document.title = meta.name;
        document.getElementById("project-title").textContent = meta.name;
        document.getElementById("project-description").textContent = meta.long || meta.short;
        document.getElementById("project-cover").src = meta.cover;
        const tagsDiv = document.getElementById("tags");
        meta.tags.forEach(tag => {
            const span = document.createElement("span");
            span.textContent = tag;
            span.className = "tag";
            tagsDiv.appendChild(span);
        });
    });
}
loadProjectPage();
export {};
