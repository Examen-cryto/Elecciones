// votacion.js

const votingForm = document.getElementById('votingForm');
const candidateList = document.getElementById('candidateList');
const errorMessage = document.getElementById('error');

// Obtener los candidatos inscritos
const candidates = JSON.parse(localStorage.getItem('candidates')) || [];

let hasVoted = false;

if (candidates.length > 0) {
    candidates.forEach((candidate, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<input type="radio" name="candidate" value="${index}"> ${candidate.name} (${candidate.party})`;
        candidateList.appendChild(li);
    });
}

votingForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (hasVoted) {
        errorMessage.textContent = "Ya has votado, no puedes votar nuevamente.";
        return;
    }

    const selectedCandidate = document.querySelector('input[name="candidate"]:checked');
    if (selectedCandidate) {
        // Incrementar el contador de votos para el candidato seleccionado
        const candidateIndex = selectedCandidate.value;
        let votes = JSON.parse(localStorage.getItem('votes')) || [];
        votes[candidateIndex] = (votes[candidateIndex] || 0) + 1;
        localStorage.setItem('votes', JSON.stringify(votes));

        // Marcar que ya votó
        hasVoted = true;
        errorMessage.textContent = '';
        alert('Gracias por tu voto!');
    } else {
        errorMessage.textContent = "Por favor selecciona un candidato antes de votar.";
    }
});

