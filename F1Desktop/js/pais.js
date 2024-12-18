class País {
    nombrePaís;
    nombreCapital;
    nombreCircuitoF1;
    cantidadPoblacion;
    formaGobierno;
    coordenadasLíneaMeta;
    religiónMayoritaria;
    días;;
    constructor(nombrePaís, nombreCapital, cantidadPoblacion) {
        this.nombrePaís = nombrePaís;
        this.nombreCapital = nombreCapital;
        this.cantidadPoblacion = cantidadPoblacion;
        this.días = [];
    }

    rellenaDatos(nombreCircuitoF1, formaGobierno, coordenadasLíneaMeta, religiónMayoritaria) {
        this.nombreCircuitoF1 = nombreCircuitoF1;
        this.formaGobierno = formaGobierno;
        this.coordenadasLíneaMeta = coordenadasLíneaMeta;
        this.religiónMayoritaria = religiónMayoritaria;
    }

    getNombrePaísString() {
        return this.nombrePaís + ""; 
    }

    getNombreCapitalString() {
        return this.nombreCapital + ""; 
    }

    getInfoSecundariaHTML() {
        var lista = "<ul><li>" + this.nombreCircuitoF1 + "</li>";
        lista += "<li>" + this.cantidadPoblacion + "</li>";
        lista += "<li>" + this.formaGobierno + "</li>";
        lista += "<li>" + this.religiónMayoritaria + "</li>";
        lista += "</ul>";
        return lista;
    }

    writeCoordendas() {
        document.write("<p>" + this.coordenadasLíneaMeta + "</p>");
    }

    getCoordenadas() {
        var coordenadas = this.coordenadasLíneaMeta.trim();
      
        return {
            latitud: coordenadas[0].trim(),
            longitud: coordenadas[1].trim()
        };
    }

    crearArticulo(imagen){
        
    }
    crearElemento(tipoElemento, texto, insertarDespuesDe) {
    // Crea un nuevo elemento modificando el árbol DOM
    // El elemento creado es de 'tipoElemento' con un 'texto' 
    // El elemento se coloca antes del elemento 'insertarAntesDe'
    var elemento = document.createElement(tipoElemento); 
    elemento.innerHTML = texto;
    $(insertarDespuesDe).after(elemento);
}

getTiempo() {
    var apikey = "3c195d9d8319e0fe5c9d5eea3d113f8c";
    var coordenadas = this.getCoordenadas();
    var urlTiempo = "https://api.openweathermap.org/data/2.5/forecast?lat=" + coordenadas.latitud + "&lon=" + coordenadas.longitud + "&appid=" + apikey + "&units=metric&mode=xml";
    var etiquetas = "";
    $.ajax({
        dataType: "xml",
        url: urlTiempo,
        method: 'GET',
        success: function(datos) {
            // Filtrar los datos para obtener los primeros 5 días a las 13:00
            var datosDias = $(datos).find('time').each(function() {
                let fromTime = $(this).attr('from');
                return (fromTime.includes('13:00:00')) ;
            }).slice(0, 5); // Obtener solo los primeros 5 días

            datosDias.each(function() {
                var item = $(this);
                var date = new Date(item.attr('from'));

                // Opciones para formatear la fecha
                const opcionesFecha = {
                    weekday: 'narrow', // Día de la semana
                    day: '2-digit', // Día con dos dígitos
                    month: '2-digit', // Mes con dos dígitos
                    year: 'numeric' // Año con cuatro dígitos
                };
                // Opciones para formatear la hora
                const opcionesHora = {
                    hour: '2-digit', // Hora con dos dígitos
                    minute: '2-digit' // Minutos con dos dígitos
                };

                // Formatear la fecha y la hora
                const fechaFormateada = date.toLocaleDateString('es-ES', opcionesFecha);
                const horaFormateada = date.toLocaleTimeString('es-ES', opcionesHora);

                // Combinar fecha y hora en el formato deseado
                const fechaHoraFormateada = `${fechaFormateada} ${horaFormateada}`;

                etiquetas += "<article>";
                etiquetas += "<img src='https://openweathermap.org/img/wn/" + item.find('symbol').attr('var') + "@2x.png' />";
                etiquetas += "<h5>" + fechaHoraFormateada + "</h5>";
                etiquetas += "<p>Temperatura máxima: " + item.find('temperature').attr('max') + "°C</p>";
                etiquetas += "<p>Temperatura mínima: " + item.find('temperature').attr('min') + "°C</p>";
                etiquetas += "<p>Humedad: " + item.find('humidity').attr('value') + "%</p>";
                let rain = item.find('precipitation').attr('value') || 0;
                etiquetas += "<p>Cantidad de lluvia: " + rain + " mm</p>";
                etiquetas += "</article>";
            });
            $("section").append(etiquetas);
        },
        error: function() {
            $("h3").html("¡Tenemos problemas! No puedo obtener XML de <a href='http://openweathermap.org'>OpenWeatherMap</a>");
        }
    });
}

    

  
}
