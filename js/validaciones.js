// Estas lineas de codigo sirven, pero podriamos hacerlo que utilicemos la misma variable para el resto de los input
// const inputNacimiento = document.querySelector('#birth');

// inputNacimiento.addEventListener('blur', (evento) => { //blur cuando salimos del input date
//     validarNacimiento(evento.target);
// })

//Aqui haciendo el codigo mas funcional
export function validar(input) {
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]) { //Si existe dentro de validadores?
        validadores[tipoDeInput](input); // lo manda a llamar
    }

    if(input.validity.valid) { //si es true hacer tal cosa
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = '';
    } else {
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [ //para que la funcion mostrarMensajeDeError() recorra este array.
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]


// Dependiendo del error que muestre distintos mensajes
const mensajesDeError = {
    nombre: {
        valueMissing: 'El campo nombre no puede estar vacio'
    },
    email: {
        valueMissing: 'El campo email no puede estar vacio',
        typeMismatch: 'El correo no es valido'
    },
    password: {
        valueMissing: 'El campo email no puede estar vacio',
        patternMismatch: 'Al menos 6 caracteres, maximo 12, debe contener una letra minuscula, una letra mayuscula, un numero y no puede contener caracteres especiales.'
    },
    nacimiento: {
        valueMissing: 'El campo nacimiento no puede estar vacio',
        customError: 'Debes tener al menos 18 años de edad'
    },
    numero: {
        valueMissing: 'El campo numero no puede estar vacio',
        patternMismatch: 'El formato requerido es XXXXXXXXXX 10 numeros'
    },
    direccion: {
        valueMissing: 'El campo direccion no puede estar vacio',
        patternMismatch: 'La dirreccion debe contener entre 4 y 30 caracteres'
    },
    ciudad: {
        valueMissing: 'El campo ciudad no puede estar vacio',
        patternMismatch: 'La ciudad debe contener entre 4 y 30 caracteres'
    },
    provincia: {
        valueMissing: 'El campo provincia no puede estar vacio',
        patternMismatch: 'La provincia debe contener entre 4 y 30 caracteres'
    }
}

const validadores = {
    nacimiento: input => validarNacimiento(input),
}

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = '';
    tipoDeErrores.forEach((error) => { //para que recorra el array
        if(input.validity[error]) {
            console.log(tipoDeInput, error); //que tipo de error.
            console.log(input.validity[error]); // Devuelve si es true o false.
            console.log(mensajesDeError[tipoDeInput][error]); //Devuelve el mjs de error.
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje;
};

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = '';
    if(!mayorDeEdad(fechaCliente)) {
        mensaje = 'Debes tener al menos 18 años de edad';
    }
    input.setCustomValidity(mensaje); // Es el mensaje que sale como cuando agregamos title al html
}


// Aqui obtenemos true o false de la edad
function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, //sumamos 18 al año
        fecha.getUTCMonth(),
        fecha.getUTCDate()
        );
    return diferenciaFechas <= fechaActual;
}