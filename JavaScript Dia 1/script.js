//Impresion en consola
console.log("Hola Mundo");

//tipo de dato - Number
Number1 = 1;
Number2 = 3.14;

//Verificacion de tipo de dato
console.log(typeof Number1);
console.log(typeof Number2);

//operaciones
operacion = ((((5 ** 6) + 256) / 5) ** 2);
console.log(operacion);

//Strings
texto1 = "campus";
texto2 = "Lands";

//Concatenacion
console.log(texto1 + texto2);

//Booleanos
Booleano1 = true;
Booleano2 = false;
Booleano3 = false;
Booleano4 = true;
operapodresBandera = (Booleano1 || Booleano2) & (Booleano3 || Booleano4);

// parametros con retorno
let resultado = (5 + 3);
console.log("El resultado es:", resultado);

// parmetros sin retorno
function mostrarMensaje(mensaje) {
    console.log("Mensaje recibido:", mensaje);
}

// sin parametros y con retorno
numero = prompt("Ingresa un numero: ");
console.log("El número que ingresaste es: ", numero);

// sin parametros y sin retorno
function imprimirMensaje() {
    console.log("¡Hola, mundo!");
}

//////////////////////////////////////////////////////////////

function Impresion(Word) {
    document.write(Word)
}

year = prompt("Ingresa tu año de nacimiento: ");

console.log("Naciste en ", year);

////////////////////////////////////////////////////////////
Convertidor = prompt("Ingresa los grados en celsius: ");
fahrenheit=32+(9*Convertidor/5);
console.log(Convertidor + " °C son: " + fahrenheit + " °F");
function Impresion(Word){
    document.write(Word)
}

///////////////////////////////////////////////////////////
function Descuento(NumeroCliente){
    if (NumeroCliente <= 20){
        return 30;
    } else if (NumeroCliente <= 50) {
        return 10;
    } else {
        return 0;
    }
}
let NumeroCliente=prompt("Ingresa tu numero en la fila: ")
let descuento= Descuento(NumeroCliente);  
console.log("Tu descuento por ser el cliente Numero: ",NumeroCliente,"es de:",descuento + "%")

console.log("Crea por Miguel Guerrero C.C 1090381839")