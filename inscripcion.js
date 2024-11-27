// inscripcion.js

const candidateForm = document.getElementById('candidateForm');
const candidateName = document.getElementById('candidateName');
const partyName = document.getElementById('partyName');
const candidatesList = document.getElementById('candidates');

let candidates = [];

candidateForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = candidateName.value.trim();
    const party = partyName.value.trim();

    if (name && party) {
        candidates.push({ name, party });
        renderCandidates();
        candidateName.value = '';
        partyName.value = '';
    } else {
        alert('Por favor, ingrese todos los campos.');
    }
});

function renderCandidates() {
    candidatesList.innerHTML = '';
    candidates.forEach((candidate, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${candidate.name} (${candidate.party}) <button class="delete-btn" onclick="deleteCandidate(${index})">Eliminar</button>`;
        candidatesList.appendChild(li);
    });
}

function deleteCandidate(index) {
    candidates.splice(index, 1);
    renderCandidates();
}

// Borrar la lista
function clearList() {
    candidates = [];
    renderCandidates();
}

// Si quieres un botón para borrar la lista:
const clearButton = document.createElement('button');
clearButton.textContent = "Borrar Lista";
clearButton.addEventListener('click', clearList);
document.querySelector('.container.inscripcion').appendChild(clearButton);
