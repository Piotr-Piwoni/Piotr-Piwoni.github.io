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
// @ts-ignore
import { InstanceHTMLElementTemplate } from "../dist/utilities.js";
function InstancePage(pageInstanceContainer) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("../../template/html/_projectPageTemplate.html");
        const htmlText = yield response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, "text/html");
        // Move all <body> children from the template and replace the placeholder with all template content.
        const children = Array.from(doc.body.children);
        pageInstanceContainer.replaceWith(...children);
        // Scripts needed.
        const script = document.createElement("script");
        script.src = "../../dist/project.js";
        script.type = "module";
        document.body.appendChild(script);
    });
}
function loadProjectTemplate() {
    return __awaiter(this, void 0, void 0, function* () {
        const pageInstanceContainer = document.getElementById("page-instance");
        if (!pageInstanceContainer)
            return;
        yield InstancePage(pageInstanceContainer);
        const headerInstanceContainer = document.getElementById("header-instance");
        if (!headerInstanceContainer)
            return;
        yield InstanceHTMLElementTemplate(headerInstanceContainer, "../../template/html/_headerTemplate.html");
        const footerInstanceContainer = document.getElementById("footer-instance");
        if (!footerInstanceContainer)
            return;
        yield InstanceHTMLElementTemplate(footerInstanceContainer, "../../template/html/_footerTemplate.html");
        // Handle theme toggling.
        const themeBtn = document.getElementById("theme-toggle");
        InitThemeToggle(themeBtn);
    });
}
document.addEventListener("DOMContentLoaded", loadProjectTemplate);
