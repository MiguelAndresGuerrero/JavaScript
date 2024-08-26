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
Json[0].informacion_personal;
console.log("Informacion personal");
console.log(Json[0].informacion_personal.nombre);
console.log(Json[0].informacion_personal.edad);
console.log("Direccion");
console.log(Json[0].informacion_personal.direccion.calle);
console.log(Json[0].informacion_personal.direccion.numero);
console.log(Json[0].informacion_personal.direccion.ciudad);
console.log("Contactos");
console.log(Json[0].informacion_personal.contacto.correo);
console.log(Json[0].informacion_personal.contacto.telefono);
console.log("Historial educativo");
console.log(Json[0].historial_educativo[0].nivel);
console.log(Json[0].historial_educativo[0].institucion);
console.log(Json[0].historial_educativo[0].anio_inicio);
console.log(Json[0].historial_educativo[0].anio_fin);
console.log(Json[0].historial_educativo[1].nivel);