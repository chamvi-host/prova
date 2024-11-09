document.addEventListener("DOMContentLoaded", function() {
    console.log("Página completamente cargada. Iniciando script...");

    // Inicializa EmailJS con tu Public Key (User ID)
    (function() {
        emailjs.init("Rd49ckEW23EpcRPNC"); // Reemplaza con tu Public Key de EmailJS
        console.log("EmailJS inicializado.");
    })();

    // Función de verificación
    function verificarComponentes() {
        const elementos = {
            wishButton: document.getElementById("wish-button"),
            wishInputContainer: document.getElementById("wish-input-container"),
            wishInput: document.getElementById("wish-input"),
            wishMessage: document.getElementById("wish-message"),
            birthdaySound: document.getElementById("birthday-sound")
        };

        // Verifica si todos los elementos están presentes
        let verificacionExitosa = true;
        for (const [nombre, elemento] of Object.entries(elementos)) {
            if (!elemento) {
                console.error(`Error: No se encontró el elemento "${nombre}" en el DOM.`);
                verificacionExitosa = false;
            }
        }

        if (verificacionExitosa) {
            console.log("OK: Todos los elementos están presentes en el DOM.");
            return elementos;
        } else {
            console.error("Error: Faltan elementos en el DOM. Verifica tu HTML.");
            return null;
        }
    }

    // Llama a la función de verificación
    const elementos = verificarComponentes();
    if (!elementos) {
        alert("Error al cargar algunos elementos. Verifica la consola para más detalles.");
    } else {
        // Si todos los elementos están presentes, continúa con la funcionalidad
        elementos.wishButton.addEventListener("click", function() {
            const sound = elementos.birthdaySound;

            // Intenta reproducir el sonido
            sound.play().then(() => {
                console.log("Sonido reproducido correctamente");
            }).catch(error => {
                console.log("Error al intentar reproducir el sonido:", error);
            });

            // Muestra el cuadro de texto para el deseo y oculta el botón
            elementos.wishInputContainer.style.display = "block";
            this.style.display = "none"; // Oculta el botón después de hacer clic
        });
    }

    // Función para enviar el deseo por EmailJS
    window.submitWish = function() {
        if (!elementos) return;

        const wish = elementos.wishInput.value;
        if (wish) {
            // Enviar el deseo con EmailJS
            emailjs.send("tu_servicio_id", "tu_template_id", {
                message: wish,
                to_name: "Lizeth",
                from_name: "Amigo"
            }).then(function(response) {
                console.log("Correo enviado con éxito", response.status, response.text);
                elementos.wishMessage.style.display = "block";
                elementos.wishInputContainer.style.display = "none";
            }).catch(function(error) {
                console.log("Error al enviar el correo:", error);
            });
        } else {
            alert("Por favor, escribe un deseo antes de enviarlo.");
        }
    };
});
