import { validar } from "./validaciones.js";

//Ahora cada vez q el usuario salga del input se escuchara el eventListener
const inputs = document.querySelectorAll('input'); //Este querySelectorAll() debolvera arreglo

inputs.forEach(input => { //Recorreremos el array
    input.addEventListener('blur', (input) => {
        validar(input.target);
    }); // escucharemos el evento blur(salir del input).
})