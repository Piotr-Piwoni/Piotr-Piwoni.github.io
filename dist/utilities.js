if (!window.hljs) {
    // @ts-ignore
    await import("../third-party/highlight/highlight.js");
}
export async function InstanceHTMLElementTemplate(container, templatePath) {
    const templateUrl = new URL(templatePath, import.meta.url);
    const response = await fetch(templateUrl);
    const htmlText = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, "text/html");
    // Replace the placeholder with all template content.
    const children = Array.from(doc.body.children);
    container.replaceWith(...children);
}
export async function insertCodeblock(targetEl) {
    if (!targetEl)
        return;
    const filePath = targetEl.dataset.path;
    if (!filePath) {
        console.error("No data-path attribute found on element:", targetEl);
        return;
    }
    // Derive file name for header.
    const fileName = filePath.split("/").pop() ?? "Script";
    // Derive language from extension.
    const ext = fileName.split(".").pop()?.toLowerCase() ?? "";
    const langMap = {
        ahk: "autohotkey",
        sh: "bash",
        bash: "bash",
        c: "c",
        cmake: "cmake",
        cpp: "cpp",
        h: "cpp",
        cs: "csharp",
        css: "css",
        glsl: "glsl",
        http: "http",
        js: "javascript",
        javascript: "javascript",
        json: "json",
        tex: "latex",
        lua: "lua",
        md: "markdown",
        markdown: "markdown",
        m: "objectivec",
        objc: "objectivec",
        txt: "plaintext",
        ps1: "powershell",
        python: "python",
        py: "python",
        rs: "rust",
        scss: "scss",
        shell: "shell",
        ts: "typescript",
        typescript: "typescript",
        vim: "vim",
        xml: "xml",
        yml: "yaml",
        yaml: "yaml"
    };
    const languageClass = langMap[ext] ? `language-${langMap[ext]}` : "";
    try {
        const response = await fetch(filePath);
        if (!response.ok)
            throw new Error(`Failed to load file: ${filePath}`);
        const fileText = await response.text();
        // Grab the template.
        const template = document.getElementById("codeblock-template");
        if (!template) {
            console.error("No template with id 'codeblock-template' found");
            return;
        }
        const hljsInstance = window.hljs;
        const clone = template.content.cloneNode(true);
        const header = clone.querySelector("#codeblock-header");
        const codeEl = clone.querySelector("code");
        if (header)
            header.textContent = fileName;
        if (codeEl) {
            codeEl.textContent = fileText;
            if (languageClass)
                codeEl.classList.add(languageClass);
            hljsInstance.highlightElement(codeEl);
        }
        // Replace the target element.
        targetEl.replaceWith(clone);
    }
    catch (err) {
        console.error("Error inserting codeblock:", err);
    }
}
