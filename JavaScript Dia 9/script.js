document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('Search').addEventListener('input', buscarPokemon);
    document.getElementById('nextBtn').addEventListener('click', nextPokemon);
    document.getElementById('prevBtn').addEventListener('click', prevPokemon);
});

let currentPokemonID = 25;

function buscarPokemon() {
    let busqueda = document.getElementById("Search").value.trim().toLowerCase();

    if (busqueda === "") {
        limpiarVista();
        return;
    }

    let URL = `https://pokeapi.co/api/v2/pokemon/${busqueda}/`;

    fetch(URL)
        .then(res => {
            if (!res.ok) {
                throw new Error('Pokémon no encontrado :(');
            }
            return res.json();
        })
        .then(data => {
            currentPokemonID = data.id;
            mostrarPokemon(data);
        })
        .catch(error => {
            limpiarVista();
            document.getElementById("view").innerHTML = `<p>${error.message}</p>`;
        });
}

function nextPokemon() {
    if (currentPokemonID < 1010) {
        currentPokemonID++;
        obtenerPokemonPorID(currentPokemonID);
    }
}

function prevPokemon() {
    if (currentPokemonID > 1) {
        currentPokemonID--;
        obtenerPokemonPorID(currentPokemonID);
    }
}

function obtenerPokemonPorID(id) {
    let URL = `https://pokeapi.co/api/v2/pokemon/${id}/`;

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            mostrarPokemon(data);
        })
        .catch(error => {
            limpiarVista();
            document.getElementById("view").innerHTML = `<p>${error.message}</p>`;
        });
}

function mostrarPokemon(data) {
    document.getElementById("Search").value = data.id;
    document.getElementById("nombre__pokemon").innerHTML = `<h2>${data.name.toUpperCase()}</h2>`;
    document.getElementById("img__pokemon").src = data.sprites.other.showdown.front_default;    
    document.getElementById("pokemonID").innerText = `${data.id} -`;

    document.getElementById("ID__pokemon").innerHTML = `
        <p class="Altura">Altura: ${(data.height / 10).toFixed(1)} m</p>
        <p class="Peso">Peso: ${(data.weight / 10).toFixed(1)} kg</p>
        <p class="Type">Tipos: ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
        <audio autoply src="${data.cries.latest}"></audio>
    `;
}

function limpiarVista() {
    document.getElementById("Search").value = "";
    document.getElementById("nombre__pokemon").innerHTML = "";
    document.getElementById("img__pokemon").src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/25.gif";
    document.getElementById("pokemonID").innerText = "";
    document.getElementById("ID__pokemon").innerHTML = "";
}

function actualizarBotones() {
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    if (currentPokemonID >= 1010) {
        nextBtn.classList.add('boton-inactive');
        nextBtn.classList.remove('boton-inactive');
    } else {
        nextBtn.classList.add('boton-active');
        nextBtn.classList.remove('boton-inactive');
    }

    if (currentPokemonID <= 1) {
        prevBtn.classList.add('boton-inactive');
        prevBtn.classList.remove('boton-inactive');
    } else {
        prevBtn.classList.add('boton-active');
        prevBtn.classList.remove('boton-inactive');
    }
}

console.log("Creado por Miguel Guerrero")