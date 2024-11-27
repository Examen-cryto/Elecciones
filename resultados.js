// Ejemplo de resultados de candidatos
const resultados = [
    { nombre: "Candidato A", votos: 150 },
    { nombre: "Candidato B", votos: 200 },
    { nombre: "Candidato C", votos: 50 }
];

const totalVotos = resultados.reduce((acc, candidato) => acc + candidato.votos, 0);

// Mostrar los resultados en la tabla
function mostrarResultados() {
    const tbody = document.querySelector("#resultadosTable tbody");
    resultados.forEach(candidato => {
        const fila = document.createElement("tr");
        const porcentaje = ((candidato.votos / totalVotos) * 100).toFixed(2);

        fila.innerHTML = `
            <td>${candidato.nombre}</td>
            <td>${candidato.votos}</td>
            <td>${porcentaje}%</td>
        `;
        tbody.appendChild(fila);
    });
}

// Función para descargar los resultados en diferentes formatos
function downloadResults(formato) {
    switch (formato) {
        case 'pdf':
            descargarPDF();
            break;
        case 'excel':
            descargarExcel();
            break;
        case 'word':
            descargarWord();
            break;
        default:
            alert("Formato no soportado");
    }
}

// Descargar en PDF usando html2pdf.js
function descargarPDF() {
    const element = document.querySelector('.container');
    html2pdf()
        .from(element)
        .save('resultados_votacion.pdf');
}

// Descargar en Excel usando XLSX.js
function descargarExcel() {
    const ws = XLSX.utils.table_to_sheet(document.querySelector("#resultadosTable"));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Resultados");
    XLSX.writeFile(wb, "resultados_votacion.xlsx");
}

// Descargar en Word (usando un enfoque simple de texto)
function descargarWord() {
    let htmlContent = "<h1>Resultados de Votación</h1><table border='1'><tr><th>Candidato</th><th>Votos</th><th>Porcentaje</th></tr>";
    resultados.forEach(candidato => {
        const porcentaje = ((candidato.votos / totalVotos) * 100).toFixed(2);
        htmlContent += `<tr><td>${candidato.nombre}</td><td>${candidato.votos}</td><td>${porcentaje}%</td></tr>`;
    });
    htmlContent += "</table>";

    const blob = new Blob([htmlContent], { type: 'application/msword' });
    saveAs(blob, 'resultados_votacion.doc');
}

// Inicializar y mostrar los resultados al cargar la página
mostrarResultados();
