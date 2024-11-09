// Inicializa EmailJS con tu Public Key (User ID)
(function() {
    emailjs.init("Rd49ckEW23EpcRPNC"); // Reemplaza con tu Public Key de EmailJS
})();

// Maneja el clic en el botón de "Pide un deseo"
document.getElementById("wish-button").addEventListener("click", function() {
    const sound = document.getElementById("birthday-sound");

    // Intenta reproducir el sonido
    sound.play().then(() => {
        console.log("Sonido reproducido correctamente");
    }).catch(error => {
        console.log("Error al intentar reproducir el sonido:", error);
    });

    // Muestra el cuadro de texto para el deseo y oculta el botón
    document.getElementById("wish-input-container").style.display = "block";
    this.style.display = "none"; // Oculta el botón después de hacer clic
});

// Función para enviar el deseo por EmailJS
function submitWish() {
    const wish = document.getElementById("wish-input").value;
    if (wish) {


    
