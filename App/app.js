let textoACifrar = '';
let resultado = '';
let textoPorCaracter= [''];
let textoADescifrar = '';
let clave = new Map();
clave.set('a', 'ai')
clave.set('e', 'enter');
clave.set('i', 'imes');
clave.set('o', 'ober');
clave.set('u', 'ufat');

// Crear un Map inverso para el descifrado
let claveInversa = new Map([...clave].map(([key, value]) => [value, key]));

function cifrarTexto() {
    const textoACifrar = document.getElementById('texto').value.toLowerCase(); // Convertir a minúsculas
    const textoPorCaracter = textoACifrar.split('');
    const resultado = textoPorCaracter.map(caracter => {
        const cifrado = clave.get(caracter);
        return cifrado ? cifrado : caracter; // Mantener caracteres no incluidos en la clave
    }).join('');

    document.getElementById('texto').value = '';
    document.getElementById('texto__mostrar').style.display = 'none';
    document.getElementById('ocultar').style.display = 'block';
    document.getElementById('texto__procesado').textContent = resultado;
    document.getElementById('texto__procesado').style.display = 'block';
    document.querySelector('.boton__3').style.display = 'block';
}

function descifrarTexto() {
    const textoADescifrar = document.getElementById('texto').value;
    let resultado = '';
    let i = 0;

    while (i < textoADescifrar.length) {
        let encontrado = false;

        // Intentar encontrar un valor cifrado de hasta 5 caracteres
        for (let j = 5; j > 0; j--) {
            const subTexto = textoADescifrar.slice(i, i + j);
            const valorCifrado = claveInversa.get(subTexto);

            if (valorCifrado) {
                resultado += valorCifrado;
                i += j; // Avanzar j caracteres si se encontró un valor cifrado
                encontrado = true;
                break; // Salir del bucle si se encontró un valor cifrado
            }
        }

        if (!encontrado) {
            resultado += textoADescifrar[i];
            i++; 
        }
    }
    document.getElementById('texto__mostrar').style.display = 'none';
    document.getElementById('ocultar').style.display = 'block';
    document.getElementById('texto__procesado').textContent = resultado;
    document.getElementById('texto__procesado').style.display = 'block';
    document.querySelector('.boton__3').style.display = 'block';
}


function copiarTexto() {
    const resultado = document.getElementById('texto__procesado').textContent;
    navigator.clipboard.writeText(resultado).then(() => {
        alert('Texto copiado al portapapeles');
    }).catch(err => {
        console.error('Error al copiar el texto: ', err);
    });
}