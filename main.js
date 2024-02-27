let texto = document.getElementById("textarea-ingresado");
let vistaSinMensaje = document.getElementById("sinMensaje");
let mensajeEncriptado = document.getElementById("msj-encriptado");
let revelarTexto = document.getElementById("texto-revelado");

const cambiarAside = () => {
  vistaSinMensaje.style.display = "none";
  mensajeEncriptado.style.display = "block";
};

// Función para verificar si el texto contiene letras mayúsculas o con acentos
const validarTexto = (texto) => {
  // Expresión regular para verificar si el texto contiene letras mayúsculas o con acentos
  let regex = /[A-ZÁÉÍÓÚÜáéíóúü"#$%&'()*+,-./:;<=>@[\]^_`{|}~]/;
  if (regex.test(texto)) {
    alert("Por favor, ingresa solo letras minúsculas sin acentos.");
    return false;
  }
  return true;
};

//objeto remplazos
const remplazos = {
  'a': "ai",
  'e': "enter",
  'i': "imes",
  'o': "ober",
  'u': "ufat",
};

const encriptar = () => {
  let contenido = texto.value;
  if (!validarTexto(contenido)) return; // Validar el texto, si no cumple se detiene
  let letras = contenido.split("");

  let resultado = letras.map( letra => remplazos[letra] ? remplazos[letra] : letra).join('');

  revelarTexto.textContent = resultado;
  cambiarAside();
};


const desencriptar = () => {
  let contenido = texto.value;
  if (!validarTexto(contenido)) return; 
  // Utilizamos una expresión regular para buscar todas las secuencias de reemplazo
  let textoDesencriptado = contenido.replace(/(ai)|(enter)|(imes)|(ober)|(ufat)/g, (match) => {
    // Por cada secuencia de reemplazo, devolvemos la vocal correspondiente
    switch (match) {
      case "ai":
        return "a";
      case "enter":
        return "e";
      case "imes":
        return "i";
      case "ober":
        return "o";
      case "ufat":
        return "u";
      default:
        return match; // Si no hay coincidencia, devolvemos la misma secuencia
    }
  });

  // Mostramos el texto desencriptado en el área de texto revelado
  revelarTexto.textContent = textoDesencriptado;
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
