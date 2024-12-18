class Viajes {
    longitud;
    latitud;
    precision;
    altitud;
    precisionAltitud;
    rumbo;
    velocidad;
    mensaje;
    mapaGeoposicionado;

    constructor() {
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
    }

    getPosicion(posicion) {
        this.mensaje = "Se ha realizado correctamente la petición de geolocalización";
        this.longitud = posicion.coords.longitude;
        this.latitud = posicion.coords.latitude;
        this.precision = posicion.coords.accuracy;
        this.altitud = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo = posicion.coords.heading;
        this.velocidad = posicion.coords.speed;

    }

    verErrores(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                this.mensaje = "El usuario no permite la petición de geolocalización";
                break;
            case error.POSITION_UNAVAILABLE:
                this.mensaje = "Información de geolocalización no disponible";
                break;
            case error.TIMEOUT:
                this.mensaje = "La petición de geolocalización ha caducado";
                break;
            case error.UNKNOWN_ERROR:
                this.mensaje = "Se ha producido un error desconocido";
                break;
        }
    }

    getMapaEstático() {
        var apiKey = "&key=AIzaSyBgvDj88QLqgOPN7xRY38xilCMy7Oid8r0";
        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        var centro = "center=" + this.latitud + "," + this.longitud;
        var zoom = "&zoom=15";
        var tamaño = "&size=800x600";
        var marcador = "&markers=color:red%7C" + this.latitud + "," + this.longitud;
        var sensor = "&sensor=false";

        this.imagenMapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;
        var section = document.createElement("section");
        var h3 = document.createElement("h3");
        h3.textContent = "Mapa estático"; 
        section.appendChild(h3);
        var img = document.createElement("img");
        img.setAttribute("src", this.imagenMapa);
        img.setAttribute("alt", "mapa estático google");
        section.appendChild(img);
        var main = document.querySelector("main");
        main.appendChild(section);

    }

    getLongitud(){
        return this.longitud;
    }
    getLatitud(){
        return this.latitud;
    }
    
}
var miMapa = new Viajes();

function getMapaDinamico(){
    setTimeout(function(){
        var centro = { lat: miMapa.getLatitud(), lng: miMapa.getLongitud() };
        var mapaGeoposicionado = new google.maps.Map(document.getElementsByTagName("div")[0], {
            zoom: 8,
            center: centro,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }); 
        let infoWindow = new google.maps.InfoWindow; 
        infoWindow.setPosition(centro);
        infoWindow.setContent('Localización encontrada');
        infoWindow.open(mapaGeoposicionado);
        mapaGeoposicionado.setCenter(centro);
    },2000);
    
}
 
miMapa.getMapaDinamico = getMapaDinamico;
