document.addEventListener("DOMContentLoaded", function() {
    console.log("Página completamente cargada. Iniciando script...");

    // Inicializa EmailJS con tu Public Key (User ID)
    emailjs.init("Rd49ckEW23EpcRPNC"); // Public Key de EmailJS

    // Verificar si ya se envió el deseo y ocultar todo el contenido de la página si es así
    if (localStorage.getItem("deseoEnviado")) {
        document.body.innerHTML = ""; // Borra todo el contenido del cuerpo
        return; // Termina el script aquí si ya se envió el deseo
    }

    // Función para enviar un correo cuando alguien entra a la página
    function enviarCorreoBienvenida() {
        emailjs.send("service_pr95j7p", "template_789shhs", {
            to_name: "Admin",
            from_name: "Página Web",
            message: "Una persona ha ingresado a la página."
        }).then(function(response) {
            console.log("Correo de bienvenida enviado", response.status, response.text);
        }).catch(function(error) {
            console.log("Error al enviar el correo de bienvenida:", error);
        });
    }

    // Llama a la función para enviar el correo al cargar la página
    enviarCorreoBienvenida();

    // Maneja el clic en el botón de "Pide un deseo"
    document.getElementById("wish-button").addEventListener("click", function() {
        document.getElementById("wish-input-container").style.display = "block";
        this.style.display = "none";
    });

    // Función para enviar el deseo
    window.submitWish = function() {
        const wish = document.getElementById("wish-input").value;
        if (wish) {
            emailjs.send("service_pr95j7p", "template_789shhs", {
                wish: wish
            })
            .then(function(response) {
                console.log("Éxito", response.status, response.text);
                
                // Guardar en localStorage que ya se envió el deseo
                localStorage.setItem("deseoEnviado", "true");

                // Borrar todo el contenido del cuerpo de la página
                document.body.innerHTML = "";
            }, function(error) {
                console.log("Error", error);
                alert("Hubo un problema al enviar tu deseo, por favor intenta de nuevo.");
            });
        } else {
            alert("Por favor, escribe un deseo antes de enviarlo.");
        }
    }
});
