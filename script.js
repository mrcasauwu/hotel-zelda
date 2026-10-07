const formulario = document.getElementById("formularioReserva");


formulario.addEventListener("submit", function(event) {

    event.preventDefault();


    const nombre =
        document.getElementById("nombre").value;

    const entrada =
        document.getElementById("entrada").value;

    const salida =
        document.getElementById("salida").value;

    const huespedes =
        document.getElementById("huespedes").value;

    const precio =
        Number(document.getElementById("habitacion").value);


    if (salida <= entrada) {

        alert(
            "La fecha de salida debe ser posterior a la fecha de entrada."
        );

        return;
    }


    const fechaEntrada =
        new Date(entrada);

    const fechaSalida =
        new Date(salida);


    const diferencia =
        fechaSalida - fechaEntrada;


    const noches =
        Math.ceil(
            diferencia /
            (1000 * 60 * 60 * 24)
        );


    const total =
        noches * precio;


    alert(

        "🏨 HOTEL ZELDA\n\n" +

        "Huésped: " + nombre + "\n" +

        "Entrada: " + entrada + "\n" +

        "Salida: " + salida + "\n" +

        "Huéspedes: " + huespedes + "\n" +

        "Noches: " + noches + "\n" +

        "Total: $" + total

    );

});