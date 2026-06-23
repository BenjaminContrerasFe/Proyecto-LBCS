document.addEventListener("DOMContentLoaded", () => {
    const pasajerosBtn = document.getElementById("pasajerosBtn");
    const pasajerosDropdown = document.getElementById("pasajerosDropdown");
    const pasajerosTexto = document.getElementById("pasajerosTexto");
    const btnPasajerosListo = document.getElementById("btnPasajerosListo");

    // Contadores iniciales
    let contadores = {
        adultos: 1,
        ninos: 0,
        habitaciones: 1
    };

    // Límites mínimos de Booking
    const minimos = { adultos: 1, ninos: 0, habitaciones: 1 };
    // Límites máximos razonables
    const maximos = { adultos: 30, ninos: 10, habitaciones: 10 };

    // 1. Abrir y cerrar el panel al hacer clic en el recuadro principal
    pasajerosBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Evita que se cierre inmediatamente
        pasajerosDropdown.classList.toggle("mostrar");
    });

    // 2. Cerrar al darle al botón "Listo"
    btnPasajerosListo.addEventListener("click", () => {
        pasajerosDropdown.classList.remove("mostrar");
    });

    // 3. Cerrar si el usuario hace clic en cualquier otra parte de la pantalla
    document.addEventListener("click", (e) => {
        if (!pasajerosDropdown.contains(e.target) && e.target !== pasajerosBtn) {
            pasajerosDropdown.classList.remove("mostrar");
        }
    });

    // Evitar que los clics dentro del menú lo cierren
    pasajerosDropdown.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    // 4. Lógica de los botones + y -
    const botones = pasajerosDropdown.querySelectorAll(".btn-control");
    
    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            const tipo = boton.getAttribute("data-tipo");
            const esMas = boton.classList.contains("plus");

            if (esMas) {
                if (contadores[tipo] < maximos[tipo]) {
                    contadores[tipo]++;
                }
            } else {
                if (contadores[tipo] > minimos[tipo]) {
                    contadores[tipo]--;
                }
            }

            // Actualizar el número visual en el dropdown
            document.getElementById(`cant-${tipo}`).innerText = contadores[tipo];
            
            // Actualizar la barra principal con los nuevos valores
            actualizarTextoBarra();
        });
    });

    // 5. Función para armar la cadena de texto de la barra principal
    function actualizarTextoBarra() {
        const textoAdultos = `${contadores.adultos} ${contadores.adultos === 1 ? 'adulto' : 'adultos'}`;
        const textoNinos = `${contadores.ninos} ${contadores.ninos === 1 ? 'niño' : 'niños'}`;
        const textoHabitaciones = `${contadores.habitaciones} ${contadores.habitaciones === 1 ? 'habitación' : 'habitaciones'}`;
        
        pasajerosTexto.innerText = `${textoAdultos} · ${textoNinos} · ${textoHabitaciones}`;
    }
});