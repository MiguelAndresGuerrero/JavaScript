let Json = [
    {
        "informacion_personal": {
            "nombre": "Juan Pérez",
            "edad": 30,
            "direccion": {
                "calle": "Calle Principal",
                "numero": 123,
                "ciudad": "Ciudad Ejemplo"
            },
            "contacto": {
                "correo": "juan.perez@example.com",
                "telefono": "+123456789"
            }
        },
        "historial_educativo": [
            {
                "nivel": "Secundaria",
                "institucion": "Instituto Secundario",
                "anio_inicio": 2000,
                "anio_fin": 2005
            },
            {
                "nivel": "Universidad",
                "institucion": "Universidad Ejemplar",
                "titulo": "Licenciatura en Ciencias",
                "anio_inicio": 2006,
                "anio_fin": 2010
            }
        ],
        "experiencia_laboral": [
            {
                "puesto": "Desarrollador de Software",
                "empresa": "Tech Solutions",
                "periodo": "2010-2015",
                "responsabilidades": [
                    "Desarrollo de aplicaciones web",
                    "Mantenimiento de bases de datos"
                ]
            },
            {
                "puesto": "Gerente de Proyectos",
                "empresa": "Proyectos Avanzados",
                "periodo": "2016-actualidad",
                "responsabilidades": [
                    "Planificación y supervisión de proyectos",
                    "Coordinación de equipos"
                ]
            }
        ]
    }
];

function displayData() {
    const tableBody = document.getElementById('jsonTable');
    tableBody.innerHTML = '';

    Json.forEach((data, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${data.informacion_personal.nombre}</td>
            <td>${data.informacion_personal.edad}</td>
            <td>${data.informacion_personal.direccion.calle}, ${data.informacion_personal.direccion.numero}, ${data.informacion_personal.direccion.ciudad}</td>
            <td>${data.informacion_personal.contacto.correo}</td>
            <td>${data.informacion_personal.contacto.telefono}</td>
            <td>
                <button onclick="editData(${index})">Editar</button>
                <button onclick="deleteData(${index})">Eliminar</button>
            </td>
            <td>
                <button onclick="showDetails(${index})">Ver Detalles</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function showDetails(index) {
    const data = Json[index];

    let educationalHistory = "<strong>Historial Educativo:</strong><br>";
    data.historial_educativo.forEach((edu) => {
        educationalHistory += `${edu.nivel} en ${edu.institucion} (${edu.anio_inicio}-${edu.anio_fin})<br>`;
    });

    let workExperience = "<strong>Experiencia Laboral:</strong><br>";
    data.experiencia_laboral.forEach((work) => {
        workExperience += `${work.puesto} en ${work.empresa} (${work.periodo})<br>Responsabilidades:<br>`;
        work.responsabilidades.forEach((resp) => {
            workExperience += `- ${resp}<br>`;
        });
    });

    document.getElementById('educationalHistory').innerHTML = educationalHistory;
    document.getElementById('workExperience').innerHTML = workExperience;

    document.getElementById('detailsContainer').style.display = 'block';
}

function closeDetails() {
    document.getElementById('detailsContainer').style.display = 'none';
}

document.getElementById('addForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const newData = {
        "informacion_personal": {
            "nombre": document.getElementById('nombre').value,
            "edad": parseInt(document.getElementById('edad').value),
            "direccion": {
                "calle": document.getElementById('calle').value,
                "numero": parseInt(document.getElementById('numero').value),
                "ciudad": document.getElementById('ciudad').value
            },
            "contacto": {
                "correo": document.getElementById('correo').value,
                "telefono": document.getElementById('telefono').value
            }
        },
        "historial_educativo": [],
        "experiencia_laboral": []
    };

    Json.push(newData);
    displayData();

    this.reset();
});

function deleteData(index) {
    Json.splice(index, 1);
    displayData();
}

function editData(index) {
    const data = Json[index];
    document.getElementById('nombre').value = data.informacion_personal.nombre;
    document.getElementById('edad').value = data.informacion_personal.edad;
    document.getElementById('calle').value = data.informacion_personal.direccion.calle;
    document.getElementById('numero').value = data.informacion_personal.direccion.numero;
    document.getElementById('ciudad').value = data.informacion_personal.direccion.ciudad;
    document.getElementById('correo').value = data.informacion_personal.contacto.correo;
    document.getElementById('telefono').value = data.informacion_personal.contacto.telefono;

    document.getElementById('addForm').addEventListener('submit', function updateData(e) {
        e.preventDefault();
        Json[index] = {
            "informacion_personal": {
                "nombre": document.getElementById('nombre').value,
                "edad": parseInt(document.getElementById('edad').value),
                "direccion": {
                    "calle": document.getElementById('calle').value,
                    "numero": parseInt(document.getElementById('numero').value),
                    "ciudad": document.getElementById('ciudad').value
                },
                "contacto": {
                    "correo": document.getElementById('correo').value,
                    "telefono": document.getElementById('telefono').value
                }
            },
            "historial_educativo": data.historial_educativo,
            "experiencia_laboral": data.experiencia_laboral
        };
        displayData();

        this.reset();
        this.removeEventListener('submit', updateData);
    });
}

displayData();
console.log("Creado por Miguel Guerrero C.C 1090381839")