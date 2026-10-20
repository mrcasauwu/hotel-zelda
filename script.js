
const formulario = document.getElementById("formularioReserva");

// Inicializar EmailJS
emailjs.init({
    publicKey: "TU_PUBLIC_KEY"
});

formulario.addEventListener("submit", async function(event) {

    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const entrada = document.getElementById("entrada").value;
    const salida = document.getElementById("salida").value;
    const huespedes = document.getElementById("huespedes").value;

    const selector = document.getElementById("habitacion");
    const precio = Number(selector.value);
    const habitacion = selector.options[selector.selectedIndex].text;

    // Validar fechas
    const fechaEntrada = new Date(entrada + "T00:00:00");
    const fechaSalida = new Date(salida + "T00:00:00");

    const diferencia = fechaSalida - fechaEntrada;
    const noches = diferencia / (1000 * 60 * 60 * 24);

    if (noches <= 0) {
        alert("La salida debe ser posterior a la entrada.");
        return;
    }

    const total = noches * precio;

    const parametros = {
        nombre: nombre,
        correo: correo,
        entrada: entrada,
        salida: salida,
        huespedes: huespedes,
        habitacion: habitacion,
        noches: noches,
        total: total
    };

    try {

        const boton = formulario.querySelector("button");
        boton.disabled = true;
        boton.textContent = "ENVIANDO SOLICITUD...";

        await emailjs.send(
            "TU_SERVICE_ID",
            "TU_TEMPLATE_ID",
            parametros
        );

        alert(
            "Tu solicitud fue enviada correctamente.\n\n" +
            "Recibirás una respuesta en tu correo: " + correo +
            "\n\nTu habitación todavía no está confirmada."
        );

        formulario.reset();

    } catch (error) {

        console.error("Error al enviar:", error);

        alert("No se pudo enviar la solicitud. Intenta nuevamente.");

    } finally {

        const boton = formulario.querySelector("button");
        boton.disabled = false;
        boton.textContent = "SOLICITAR RESERVA";

    }

});

