let texto = document.getElementById("textarea-ingresado");
let vistaSinMensaje = document.getElementById("sinMensaje");
let mensajeEncriptado = document.getElementById("msj-encriptado");
let revelarTexto = document.getElementById("texto-revelado");

const cambiarAside = () => {
  vistaSinMensaje.style.display = "none";
  mensajeEncriptado.style.display = "block";
};

//objeto remplazos
const reemplazos = {
  'a': "ai",
  'e': "enter",
  'i': "imes",
  'o': "ober",
  'u': "ufat",
};

const encriptar = () => {
  let contenido = texto.value;
  let letras = contenido.split("");

  let resultado = letras
    .map((letra) => {
      if (reemplazos.hasOwnProperty(letra)) {
        return reemplazos[letra];
      } else {
        return letra;
      }
    })
    .join("");

  revelarTexto.textContent = resultado;
  cambiarAside();
};

const desencriptar = () => {
  let contenido = texto.value;
  let esEncriptado = false;

  // Verificar si el contenido contiene algún valor de reemplazo
  for (let letra in reemplazos) {
    if (contenido.includes(reemplazos[letra])) {
      esEncriptado = true;
      break;
    }
  }
  // Si es un texto encriptado, desencriptarlo; de lo contrario, mostrarlo directamente
  if (esEncriptado) {
    for (let letra in reemplazos) {
      contenido = contenido.replace(new RegExp(reemplazos[letra], 'g'), letra);
    }
  }
  
  // Mostrar el texto desencriptado o el texto original en el área de texto
  revelarTexto.textContent = contenido;
};


// función utiliza la API del portapapeles del navegador para copiar el texto
const copiarMsjEncriptado = async () => {
  //.textContent para obtener el contenido de texto dentro de ese elemento
  let textoEncriptado = document.getElementById("texto-revelado").innerHTML;
  try {
    // Intentar copiar el texto al portapapeles utilizando la API del portapapeles
    await navigator.clipboard.writeText(textoEncriptado);
    console.log("Contenido copiado al portapapeles");
  } catch (error) {
    console.error("Error al copiar: ", error);
  }
};
