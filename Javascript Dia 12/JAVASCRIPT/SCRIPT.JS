document.addEventListener('DOMContentLoaded', () => {
    const datosContenedor = document.querySelector('.opciones');
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');

    async function fetchData() {
        const res = await fetch('https://6674179975872d0e0a950e53.mockapi.io/todoList')
        data = await res.json();
        return data;
    }

    function displayCapsule(capsula) {
        datosContenedor.innerHTML = '';
        capsula.forEach(cap => {
            const capDiv = document.createElement('div');
            if (cap.status === "ready") {
                capDiv.classList.add('capsulanegativa');
                capDiv.innerHTML = `
            <div class="capsulanegativa">
        <div class="infotextnegativo">
            <p>${cap.task}</p>
        </div>
        <div class="botonesnegativo">
            <div class="terminadonegativo">
                <img src="/Javascript Dia 12/storage/img/pngwing.com (2).png" data-id="1" class="completado">
            </div>
            <div class="eliminadonegativo">
                <img src="/Javascript Dia 12/storage/img/pngwing.com (4).png" data-id="2" class="eliminado">
            </div>
        </div>
    </div>
            `
            }
            if (cap.status === "Oh hold") {
                capDiv.classList.add('capsula');
                capDiv.innerHTML = `
            <div class="capsula"></div>
        <div class="infotext">
            <p>${cap.task}</p>
        </div>
        <div class="botones">
            <div class="terminado">
                <img src="/Javascript Dia 12/storage/img/pngwing.com (2).png" data-id="${cap.id}" class="completado">
            </div>
            <div class="eliminado">
                <img src="/Javascript Dia 12/storage/img/pngwing.com (4).png" data-id="${cap.id}" class="eliminado">
            </div>
        </div>
    </div>
            `
            }
            datosContenedor.appendChild(capDiv)
        });
    }

    fetchData(), then(data => {
        console.log(data);
        displayCapsule(data);
    })
})