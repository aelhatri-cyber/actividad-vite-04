import "./style.css";
import { canciones } from "./datos.js";

const selector = document.getElementById("selector");
const tarjeta = document.getElementById("tarjeta");
const imagen = document.getElementById("imagen");
const titulo = document.getElementById("titulo");
const descripcion = document.getElementById("descripcion");
const reproductor = document.getElementById("reproductor");
const estado = document.getElementById("estado");

reproductor.volume = 0.4;

selector.addEventListener("change", () => {
  const idSeleccionado = Number(selector.value);

  reproductor.pause();
  reproductor.removeAttribute("src");
  reproductor.load();

  estado.textContent = "";

  if (!idSeleccionado) {
    imagen.src = "";
    imagen.alt = "";
    imagen.hidden = true;

    titulo.textContent = "¡Bienvenido!";
    descripcion.textContent = "Selecciona una canción para comenzar a escuchar música.";

    tarjeta.style.borderColor = "#cccccc";

    return;
  }

  const cancion = canciones.find(
    musica => musica.id == idSeleccionado
  );

  if (!cancion) {
    estado.textContent = "No se ha encontrado la canción.";
    return;
  }

  imagen.src = cancion.imagen;
  imagen.alt = cancion.nombre;
  imagen.hidden = false;

  titulo.textContent = cancion.nombre;

  descripcion.textContent = `${cancion.artista} - ${cancion.descripcion}`;

  tarjeta.style.borderColor = cancion.color;

  reproductor.src = cancion.audio;
  reproductor.volume = 0.4;

  reproductor.load();

  estado.textContent = "Cargando canción...";

  reproductor.play()
    .then(() => {
      estado.textContent = "Reproduciendo: " + cancion.nombre;
    })
    .catch(() => {
      estado.textContent = "No se ha podido reproducir la canción. Comprueba que el archivo existe.";
    });
});

reproductor.addEventListener("play", () => {
  estado.textContent = "Reproduciendo música...";
});

reproductor.addEventListener("pause", () => {
  if (reproductor.currentTime > 0 && !reproductor.ended) {
    estado.textContent = "Canción pausada.";
  }
});

reproductor.addEventListener("ended", () => {
  estado.textContent = "La canción ha terminado.";
});

reproductor.addEventListener("error", () => {
  if (reproductor.src) {
    estado.textContent = "Error al cargar el audio. Revisa la ruta del archivo.";
  }
});