document.addEventListener("DOMContentLoaded", () => {
    // 1. Obtener los parámetros de la URL
    const params = new URLSearchParams(window.location.search);

    const tipo = params.get("tipo") || "todos";
    const adultos = parseInt(params.get("adultos")) || 1;
    const ninos = parseInt(params.get("ninos")) || 0;
    const habitaciones = parseInt(params.get("habitaciones")) || 1;

    const totalHuespedes = adultos + ninos;

    // 2. Actualizar el subtítulo dinámico
    const subtitulo = document.getElementById("subtituloBusqueda");
    if (subtitulo) {
        subtitulo.textContent = `Búsqueda para ${totalHuespedes} huésped(es) · ${habitaciones} habitación(es)`;
    }

    // 3. Ejecutar el filtrado inicial completo al cargar
    aplicarFiltro(tipo, totalHuespedes, habitaciones);

    // 4. Agregar evento Click a los botones de filtro rápido
    const botonesFiltro = document.querySelectorAll(".filter-btn");
    botonesFiltro.forEach(boton => {
        boton.addEventListener("click", (e) => {
            const filtroElegido = e.target.getAttribute("data-filtro");
            
            // Cambiar clase activa visualmente en los botones
            botonesFiltro.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");

            // Re-aplicar el filtro manteniendo personas y cuartos
            aplicarFiltro(filtroElegido, totalHuespedes, habitaciones);
        });
    });
});

function aplicarFiltro(tipoSeleccionado, totalHuespedes, habitacionesRequeridas) {
    // Busca las tarjetas de propiedades
    const tarjetas = document.querySelectorAll(".property-card, .alojamiento-card");
    let visibles = 0;

    tarjetas.forEach(tarjeta => {
        const tipoTarjeta = tarjeta.getAttribute("data-type");
        const capacidadTarjeta = parseInt(tarjeta.getAttribute("data-capacidad")) || 99;
        const habitacionesTarjeta = parseInt(tarjeta.getAttribute("data-habitaciones")) || 1;

        // Validaciones combinadas
        const coincideTipo = (tipoSeleccionado === "todos" || tipoTarjeta === tipoSeleccionado);
        const soportaPersonas = capacidadTarjeta >= totalHuespedes;
        const soportaCuartos = habitacionesTarjeta >= habitacionesRequeridas;

        if (coincideTipo && soportaPersonas && soportaCuartos) {
            tarjeta.style.setProperty("display", "flex", "important");
            visibles++;
        } else {
            tarjeta.style.setProperty("display", "none", "important");
        }
    });

    // Control del mensaje cuando no hay resultados
    let msj = document.getElementById("sinResultados");
    const contenedor = document.getElementById("resultsList");

    if (visibles === 0) {
        if (!msj && contenedor) {
            msj = document.createElement("p");
            msj.id = "sinResultados";
            msj.style.padding = "20px";
            msj.style.color = "#666";
            msj.textContent = "No se encontraron alojamientos que cumplan con todos los criterios seleccionados.";
            contenedor.appendChild(msj);
        }
    } else if (msj) {
        msj.remove();
    }
}