document.addEventListener("DOMContentLoaded", () => {
    // 1. Obtener parámetros de la URL
    const params = new URLSearchParams(window.location.search);

    const tipo = params.get("tipo") || "todos";
    const adultos = parseInt(params.get("adultos")) || 1;
    const ninos = parseInt(params.get("ninos")) || 0;
    const habitaciones = parseInt(params.get("habitaciones")) || 1;

    const totalHuespedes = adultos + ninos;

    // 2. Actualizar texto informativo
    const subtitulo = document.getElementById("subtituloBusqueda");
    if (subtitulo) {
        subtitulo.textContent = `Búsqueda para ${totalHuespedes} huésped(es) · ${habitaciones} habitación(es)`;
    }

    // 3. Filtrado inicial
    aplicarFiltro(tipo, totalHuespedes, habitaciones);

    // 4. Botones de filtro rápido
    const botonesFiltro = document.querySelectorAll(".filter-btn");
    botonesFiltro.forEach(boton => {
        boton.addEventListener("click", (e) => {
            const filtroElegido = e.target.getAttribute("data-filtro");

            botonesFiltro.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");

            aplicarFiltro(filtroElegido, totalHuespedes, habitaciones);
        });
    });
});

function aplicarFiltro(tipoSeleccionado, totalHuespedes, habitacionesRequeridas) {
    const tarjetas = document.querySelectorAll(".property-card, .alojamiento-card");
    let visibles = 0;

    tarjetas.forEach(tarjeta => {
        const tipoTarjeta = tarjeta.getAttribute("data-type");
        const capacidadTarjeta = parseInt(tarjeta.getAttribute("data-capacidad")) || 99;
        const habitacionesTarjeta = parseInt(tarjeta.getAttribute("data-habitaciones")) || 1;

        // Validaciones
        const coincideTipo = (tipoSeleccionado === "todos" || tipoTarjeta === tipoSeleccionado);
        const soportaPersonas = capacidadTarjeta >= totalHuespedes;
        const soportaCuartos = habitacionesTarjeta >= habitacionesRequeridas;

        if (coincideTipo && soportaPersonas && soportaCuartos) {
            tarjeta.classList.remove("oculto");
            visibles++;
        } else {
            tarjeta.classList.add("oculto");
        }
    });

    // Mensaje si no hay resultados
    let msj = document.getElementById("sinResultados");
    const contenedor = document.getElementById("resultsList");

    if (visibles === 0) {
        if (!msj && contenedor) {
            msj = document.createElement("p");
            msj.id = "sinResultados";
            msj.style.padding = "20px";
            msj.style.color = "#666";
            msj.textContent = "No se encontraron alojamientos que cumplan con los criterios seleccionados.";
            contenedor.appendChild(msj);
        }
    } else if (msj) {
        msj.remove();
    }
}