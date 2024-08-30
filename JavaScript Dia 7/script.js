function search_Id() {
    let search = document.getElementById("enterId").value.trim();
    if (search === "") {
        alert("Por favor, ingresa un ID válido.");
        return;
    }

    let link = `https://superheroapi.com/api.php/698be7cb9fca0eb8b25071ceccf1635c/${search}`;
    view(link);
}

function view(link) {
    fetch(link)
    .then(res => res.json())
    .then(data => {
        if (data.response === "error") {
            document.getElementById("view").innerHTML = `<p>Héroe no encontrado.</p>`;
        } else {
            document.getElementById("view").innerHTML = `
                <h2>${data.name} (ID: ${data.id})</h2>
                <img src="${data.image.url}" alt="${data.name}">
                <p><strong>Nombre completo:</strong> ${data.biography["full-name"]}</p>
                <p><strong>Inteligencia:</strong> ${data.powerstats.intelligence}</p>
                <p><strong>Fuerza:</strong> ${data.powerstats.strength}</p>
                <p><strong>Velocidad:</strong> ${data.powerstats.speed}</p>
                <p><strong>Durabilidad:</strong> ${data.powerstats.durability}</p>
                <p><strong>Poder:</strong> ${data.powerstats.power}</p>
                <p><strong>Combate:</strong> ${data.powerstats.combat}</p>
                <p><strong>Ocupación:</strong> ${data.work.occupation}</p>
                <p><strong>Lugar de nacimiento:</strong> ${data.biography["place-of-birth"]}</p>
                <p><strong>Alineación:</strong> ${data.biography.alignment}</p>
            `;
        }
    })
    .catch(error => {
        console.error('Error al realizar la solicitud a la API:', error);
        document.getElementById("view").innerHTML = '<p>Error al cargar los datos del héroe.</p>';
    });
}
console.log("Creado por Miguel Guerrero C.C 1090381839")