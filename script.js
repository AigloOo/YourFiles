document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("template-upload-form");
    const templateList = document.getElementById("templates");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("template-name").value;
        const description = document.getElementById("template-description").value;
        const file = document.getElementById("template-file").files[0];

        if (name.trim() === '' || description.trim() === '' || !file) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        const template = {
            name: name,
            description: description,
            file: file
        };

        addTemplate(template);
        form.reset();
    });

    function addTemplate(template) {
        const li = document.createElement("li");
        li.classList.add("template-item");
        li.innerHTML = `
            <div class="template-header">
                <h3>${template.name}</h3>
                <p>${template.description}</p>
                <a href="#" class="download-link" download="${template.name}.zip">Télécharger</a>
            </div>
            <div class="template-preview"></div>
        `;
        templateList.appendChild(li);

        const downloadLink = li.querySelector(".download-link");
        downloadLink.addEventListener("click", function (event) {
            event.preventDefault();
            downloadTemplate(template);
        });

        li.addEventListener("mouseenter", function () {
            const preview = li.querySelector(".template-preview");
            preview.innerHTML = `<strong>Prévisualisation du Fichier:</strong><br>`;
            readZipContents(template.file, preview);
            preview.style.display = "block";
        });

        li.addEventListener("mouseleave", function () {
            const preview = li.querySelector(".template-preview");
            preview.style.display = "none";
        });
    }

    function readZipContents(file, previewElement) {
        const zip = new JSZip();
        zip.loadAsync(file)
            .then(function (contents) {
                contents.forEach(function (path, file) {
                    if (!file.dir) {
                        file.async("string").then(function (content) {
                            const fileName = file.name.split('/').pop();
                            const pre = document.createElement('pre');
                            pre.innerText = `${fileName}:\n${content}`;
                            previewElement.appendChild(pre);
                        });
                    }
                });
            })
            .catch(function (error) {
                console.error("Erreur de lecture du fichier zip:", error);
            });
    }

    function downloadTemplate(template) {
        const url = URL.createObjectURL(template.file);
        const a = document.createElement("a");
        a.href = url;
        a.download = template.file.name;
        a.click();
        URL.revokeObjectURL(url);
    }
});
