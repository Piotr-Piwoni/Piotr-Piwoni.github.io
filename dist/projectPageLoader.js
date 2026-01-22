var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-ignore
import { InitThemeToggle } from "../dist/themeToggle.js";
function loadProjectTemplate() {
    return __awaiter(this, void 0, void 0, function* () {
        const instanceContainer = document.getElementById("Page Instance");
        if (!instanceContainer)
            return;
        const response = yield fetch("../../template/html/_projectPageTemplate.html");
        const htmlText = yield response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, "text/html");
        // Move all <body> children from the template
        const templateBody = doc.body;
        const children = Array.from(templateBody.children);
        // Replace the placeholder with all template content
        instanceContainer.replaceWith(...children);
        // Scripts need to be added after content exists
        const script = document.createElement("script");
        script.src = "../../dist/project.js";
        script.type = "module";
        document.body.appendChild(script);
        const themeBtn = document.getElementById("theme-toggle");
        InitThemeToggle(themeBtn);
    });
}
document.addEventListener("DOMContentLoaded", loadProjectTemplate);
