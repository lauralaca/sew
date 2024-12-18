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
    crearElemento(tipoElemento, texto, insertarDespuesDe){
        // Crea un nuevo elemento modificando el árbol DOM
        // El elemnto creado es de 'tipoElemento' con un 'texto' 
        // El elemnto se coloca antes del elemnto 'insertarAntesDe'
        var elemento = document.createElement(tipoElemento); 
        elemento.innerHTML = texto;
        $(insertarDespuesDe).after(elemento);
    }
    getTiempo() {
        var apikey = "3c195d9d8319e0fe5c9d5eea3d113f8c";
        var coordenadas = this.getCoordenadas();
        var urlTiempo = "https://api.openweathermap.org/data/2.5/forecast?lat=" + coordenadas.latitud + "&lon=" + coordenadas.longitud + "&appid=" + apikey+"&units=metric";
        var etiquetas = "";
        $.ajax({
            dataType: "json",
            url: urlTiempo,
            method: 'GET',
            success: function(data) {
                var datosDias = data.list.filter(function(item) {
                    var date = new Date(item.dt * 1000);
                    return date.getHours() === 13;
                });
                $.each(datosDias, function(i, item) {
                    const date = new Date(item.dt * 1000);
                    
                    // Opciones para formatear la fecha
                    const opcionesFecha = {
                        weekday: 'narrow', // Día de la semana
                        day: '2-digit', // Día con dos dígitos
                        month: '2-digit', // Mes con dos dígitos
                        year: 'numeric' // Año con cuatro dígitos
                    };
                     // Opciones para formatear la hora
                     const opcionesHora = {
                        hour: '2-digit', // Hora con dos digitos
                        minute: '2-digit' //Minutos con dos dígitos
                    };
                    
                    
                    
                    // Formatear la fecha y la hora
                    const fechaFormateada = date.toLocaleDateString('es-ES',opcionesFecha);
                    const horaFormateada = date.toLocaleTimeString('es-ES',opcionesHora);
                    
                    // Combinar fecha y hora en el formato deseado
                    const fechaHoraFormateada = `${fechaFormateada} ${horaFormateada}`;
                  
                    etiquetas += "<article>";
                    etiquetas += "<img src='https://openweathermap.org/img/wn/" + item.weather[0].icon + "@2x.png' />";
                    etiquetas += "<h5>" + fechaHoraFormateada + "</h5>";
                    etiquetas += "<p>Temperatura máxima: " + item.main.temp_max + "°C</p>";
                    etiquetas += "<p>Temperatura mínima: " + item.main.temp_min + "°C</p>";
                    etiquetas += "<p>Humedad: " + item.main.humidity + "%</p>";
                    let rain = item.rain ? item.rain["3h"] : 0;
                    etiquetas += "<p>Cantidad de lluvia: " + rain + " mm</p>";
                    etiquetas += "</article>";
                });
                $("section").append(etiquetas);
                 
               
               
            },
            error: function() {
                console.error("Error fetching data");
            }
        });
        
        
    }

  
}
