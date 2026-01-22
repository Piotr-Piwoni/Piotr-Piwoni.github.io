var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function InstanceHTMLElementTemplate(container, templatePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(templatePath);
        const htmlText = yield response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, "text/html");
        // Replace the placeholder with all template content.
        const children = Array.from(doc.body.children);
        container.replaceWith(...children);
    });
}
