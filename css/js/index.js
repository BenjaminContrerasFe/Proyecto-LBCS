document.addEventListener("DOMContentLoaded", () => {
    // 1. ELEMENTOS DEL DOM
    const pasajerosBtn = document.getElementById("pasajerosBtn");
    const pasajerosDropdown = document.getElementById("pasajerosDropdown");
    const pasajerosTexto = document.getElementById("pasajerosTexto");
    const btnListo = document.getElementById("btnPasajerosListo");

    const cantAdultos = document.getElementById("cant-adultos");
    const cantNinos = document.getElementById("cant-ninos");
    const cantHabitaciones = document.getElementById("cant-habitaciones");

    // 2. ESTADO INICIAL
    const estadoPasajeros = {
        adultos: 1,
        ninos: 0,
        habitaciones: 1
    };

    // LÍMITES PERMITIDOS
    const limites = {
        adultos: { min: 1, max: 10 },
        ninos: { min: 0, max: 6 },
        habitaciones: { min: 1, max: 5 }
    };

    // 3. TOGGLE DEL DESPLEGABLE
    pasajerosBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        pasajerosDropdown.classList.toggle("mostrar");
    });

    // Cerrar al hacer clic en "Listo"
    btnListo.addEventListener("click", () => {
        pasajerosDropdown.classList.remove("mostrar");
    });

    // Cerrar si se hace clic fuera del contenedor
    document.addEventListener("click", (e) => {
        const contenedor = document.querySelector(".pasajeros-contenedor");
        if (contenedor && !contenedor.contains(e.target)) {
            pasajerosDropdown.classList.remove("mostrar");
        }
    });

    // Evitar que el clic dentro del dropdown lo cierre por propagación
    pasajerosDropdown.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    // 4. LÓGICA DE CONTADORES (+ / -)
    const botonesControl = document.querySelectorAll(".btn-control");

    botonesControl.forEach((boton) => {
        boton.addEventListener("click", () => {
            const tipo = boton.getAttribute("data-tipo");
            const esSuma = boton.classList.contains("plus");

            if (esSuma) {
                if (estadoPasajeros[tipo] < limites[tipo].max) {
                    estadoPasajeros[tipo]++;
                }
            } else {
                if (estadoPasajeros[tipo] > limites[tipo].min) {
                    estadoPasajeros[tipo]--;
                }
            }

            actualizarInterfaz();
        });
    });

    // 5. ACTUALIZAR TEXTO Y CONTADORES EN PANTALLA
    function actualizarInterfaz() {
        // Actualizar números del panel
        cantAdultos.textContent = estadoPasajeros.adultos;
        cantNinos.textContent = estadoPasajeros.ninos;
        cantHabitaciones.textContent = estadoPasajeros.habitaciones;

        // Formatear texto del botón principal
        const textoAdultos = `${estadoPasajeros.adultos} ${estadoPasajeros.adultos === 1 ? 'adulto' : 'adultos'}`;
        const textoNinos = `${estadoPasajeros.ninos} ${estadoPasajeros.ninos === 1 ? 'niño' : 'niños'}`;
        const textoHabitaciones = `${estadoPasajeros.habitaciones} ${estadoPasajeros.habitaciones === 1 ? 'habitación' : 'habitaciones'}`;

        pasajerosTexto.textContent = `${textoAdultos} · ${textoNinos} · ${textoHabitaciones}`;
    }
});