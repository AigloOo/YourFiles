const templateForm = document.getElementById('templateForm');
const templateNameInput = document.getElementById('templateName');
const templateCodeInput = document.getElementById('templateCode');
const templateSection = document.getElementById('templates');
const toggleFormButton = document.getElementById('toggleForm');
const addTemplateSection = document.getElementById('addTemplate');

toggleFormButton.addEventListener('click', function () {
    addTemplateSection.classList.toggle('hidden');
});

templateForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const templateName = templateNameInput.value.trim();
    const templateCode = templateCodeInput.value.trim();

    if (templateName === '' || templateCode === '') {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    // Créer un nouveau template
    const templateElement = document.createElement('div');
    templateElement.classList.add('template');
    templateElement.innerHTML = `
        <h3>${templateName}</h3>
        <pre><code>${templateCode}</code></pre>
    `;

    // Ajouter le template à la section des templates
    templateSection.appendChild(templateElement);

    // Effacer les champs du formulaire
    templateNameInput.value = '';
    templateCodeInput.value = '';

    // Masquer le formulaire après l'ajout
    addTemplateSection.classList.add('hidden');
});
