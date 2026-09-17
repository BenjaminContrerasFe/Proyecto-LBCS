document.addEventListener("DOMContentLoaded", () => {
  // Selecciona el contenedor de la página de perfil
  const perfilContent = document.querySelector(".perfil") || document.querySelector("main") || document.body;

  if (perfilContent) {
    // Animación de entrada con JS
    perfilContent.animate(
      [
        { opacity: 0, transform: "translateY(20px)" },
        { opacity: 1, transform: "translateY(0)" }
      ],
      {
        duration: 500,
        easing: "ease-out",
        fill: "forwards"
      }
    );
  }
});