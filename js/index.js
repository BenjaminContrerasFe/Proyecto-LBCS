document.addEventListener("DOMContentLoaded", () => {

    /* ======================================================
       1. CONTROLES DEL DESPLEGABLE DE PASAJEROS
       ====================================================== */
    const pasajerosBtn = document.getElementById("pasajerosBtn");
    const pasajerosDropdown = document.getElementById("pasajerosDropdown");
    const pasajerosTexto = document.getElementById("pasajerosTexto");
    const btnListo = document.getElementById("btnPasajerosListo");

    const cantAdultos = document.getElementById("cant-adultos");
    const cantNinos = document.getElementById("cant-ninos");
    const cantHabitaciones = document.getElementById("cant-habitaciones");

    const estadoPasajeros = { adultos: 1, ninos: 0, habitaciones: 1 };
    const limites = {
        adultos: { min: 1, max: 10 },
        ninos: { min: 0, max: 6 },
        habitaciones: { min: 1, max: 5 }
    };

    // Abrir/cerrar dropdown
    if (pasajerosBtn) {
        pasajerosBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (pasajerosDropdown) pasajerosDropdown.classList.toggle("mostrar");
        });
    }

    if (btnListo) {
        btnListo.addEventListener("click", () => {
            if (pasajerosDropdown) pasajerosDropdown.classList.remove("mostrar");
        });
    }

    // Cerrar si se hace clic afuera
    document.addEventListener("click", (e) => {
        const contenedor = document.querySelector(".pasajeros-contenedor");
        if (contenedor && !contenedor.contains(e.target)) {
            if (pasajerosDropdown) pasajerosDropdown.classList.remove("mostrar");
        }
    });

    if (pasajerosDropdown) {
        pasajerosDropdown.addEventListener("click", (e) => e.stopPropagation());
    }

    // Botones + y -
    const botonesControl = document.querySelectorAll(".btn-control");
    botonesControl.forEach((boton) => {
        boton.addEventListener("click", () => {
            const tipo = boton.getAttribute("data-tipo");
            const esSuma = boton.classList.contains("plus");

            if (esSuma) {
                if (estadoPasajeros[tipo] < limites[tipo].max) estadoPasajeros[tipo]++;
            } else {
                if (estadoPasajeros[tipo] > limites[tipo].min) estadoPasajeros[tipo]--;
            }

            actualizarInterfaz();
        });
    });

    function actualizarInterfaz() {
        if (cantAdultos) cantAdultos.textContent = estadoPasajeros.adultos;
        if (cantNinos) cantNinos.textContent = estadoPasajeros.ninos;
        if (cantHabitaciones) cantHabitaciones.textContent = estadoPasajeros.habitaciones;

        const inputAdultos = document.getElementById("inputAdultos");
        const inputNinos = document.getElementById("inputNinos");
        const inputHabitaciones = document.getElementById("inputHabitaciones");

        if(inputAdultos) inputAdultos.value= estadoPasajeros.adultos;
        if(inputNinos) inputNinos.value= estadoPasajeros.ninos;
        if(inputHabitaciones) inputHabitaciones.value= estadoPasajeros.habitaciones;

        const textoAdultos = `${estadoPasajeros.adultos} ${estadoPasajeros.adultos === 1 ? 'adulto' : 'adultos'}`;
        const textoNinos = `${estadoPasajeros.ninos} ${estadoPasajeros.ninos === 1 ? 'niño' : 'niños'}`;
        const textoHabitaciones = `${estadoPasajeros.habitaciones} ${estadoPasajeros.habitaciones === 1 ? 'habitación' : 'habitaciones'}`;

        if (pasajerosTexto) {
            pasajerosTexto.textContent = `${textoAdultos} · ${textoNinos} · ${textoHabitaciones}`;
        }
    }


    /* ======================================================
       2. LÓGICA DE MOVIMIENTO DE FLECHAS EN EL CARRUSEL
       ====================================================== */

    const carruselContenedor = document.getElementById("carruselContenedor");
    const btnPrev = document.getElementById("btnPrev");
    const btnNext = document.getElementById("btnNext");

    const desplazamiento = 320; // Píxeles a mover en cada clic

    if (btnNext && carruselContenedor) {
        btnNext.addEventListener("click", () => {
            carruselContenedor.scrollBy({ left: desplazamiento, behavior: "smooth" });
        });
    }else{
        console.error("No se encontro btnnext o carruselContenedor");
    }

    if (btnPrev && carruselContenedor) {
        btnPrev.addEventListener("click", () => {
            carruselContenedor.scrollBy({ left: -desplazamiento, behavior: "smooth" });
        });
    }else{
        console.error("No se encontro btnprev o carruselContenedor");
    }


});