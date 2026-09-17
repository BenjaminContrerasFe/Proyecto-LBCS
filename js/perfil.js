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

    // Hover suave para tarjetas y botones
    const elementos = document.querySelectorAll(".settings-card, .btn-secondary, button");

    elementos.forEach((el) => {
      // Transición suave base en JS
      el.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";

      el.addEventListener("mouseenter", () => {
        el.style.transform = "translateY(-4px)";
        el.style.boxShadow = "0 6px 14px rgba(0, 0, 0, 0.15)";
      });

      el.addEventListener("mouseleave", () => {
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
      });
    });
  
}
});





