class Circuito {
    constructor() {
        this.init();
    }

    init() {
      
        var inputXML = document.querySelectorAll('input[type="file"]')[0];
        inputXML.addEventListener('change', (event) => this.handleXMLFileSelect(event));
        var inputKML = document.querySelectorAll('input[type="file"]')[1];
        inputKML.addEventListener('change', (event) => this.handleKMLFileSelect(event));
    }

    handleXMLFileSelect(event) { 
        var archivo = event.target.files[0]; 
        if (archivo) { 
            var lector = new FileReader(); 
            lector.onload = (e) => this.processXMLFile(e); 
            lector.readAsText(archivo); 
        } 
    } 
    handleKMLFileSelect(event) { 
        var archivo = event.target.files[0]; 
        if (archivo) { 
            var lector = new FileReader(); 
            lector.onload = (e) => this.processKMLFile(e); 
            lector.readAsText(archivo); 
        }
    }

    processXMLFile(e) {
        var contenidoXML = e.target.result;
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(contenidoXML, "text/xml");
        this.mostrarContenidoXML(xmlDoc);
    }

    processKMLFile(e) {
        var contenidoKML = e.target.result;
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(contenidoKML, "application/xml");
        this.mostrarContenidoKML(xmlDoc);
    }

    mostrarContenidoXML(xmlDoc) {
        var contenidoHTML = this.convertirXMLaHTML(xmlDoc.documentElement);
        document.querySelectorAll('section')[0].innerHTML = contenidoHTML;
    }

    mostrarContenidoKML(xmlDoc) {
        var coordinates = xmlDoc.getElementsByTagName("coordinates")[0].childNodes[0].nodeValue.trim().split(/\s+/);
        var path = coordinates.map(function(coord) {
            var [lng, lat] = coord.split(',').map(Number);
            return { lat: lat, lng: lng };
        });

        var circuitoPath = new google.maps.Polyline({
            path: path,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        circuitoPath.setMap(mapaGeoposicionado);
        mapaGeoposicionado.setCenter(path[0]);
    }

    convertirXMLaHTML(node) {
        var html = '';
        if (node.nodeType === 1) { // Element node
            html += '<article>';
            html += '<h4>' + node.nodeName + '</h4>';
            if (node.attributes.length > 0) {
                html += '<ul>';
                for (var j = 0; j < node.attributes.length; j++) {
                    var attribute = node.attributes[j];
                    html += '<li>' + attribute.name + ': ' + attribute.value + '</li>';
                }
                html += '</ul>';
            }
            if (node.childNodes.length > 0) {
                for (var i = 0; i < node.childNodes.length; i++) {
                    html += this.convertirXMLaHTML(node.childNodes[i]);
                }
            } else {
                html += '<p>' + node.textContent + '</p>';
            }
            html += '</article>';
        } else if (node.nodeType === 3) { // Text node
            html += '<p>' + node.nodeValue.trim() + '</p>';
        }
        return html;
    }
}

var miMapa = new Circuito();

function initMap() {
    var mapaGeoposicionado = new google.maps.Map(document.getElementsByTagName("div")[0], {
        zoom: 8,
        center: { lat: 0, lng: 0 },
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    $('#archivoKML').on('change', function(event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            var text = e.target.result;
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(text, "application/xml");
            var coordinates = xmlDoc.getElementsByTagName("coordinates")[0].childNodes[0].nodeValue.trim().split(/\s+/);
            var path = coordinates.map(function(coord) {
                var [lng, lat] = coord.split(',').map(Number);
                return { lat: lat, lng: lng };
            });

            var circuitoPath = new google.maps.Polyline({
                path: path,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
            });

            circuitoPath.setMap(mapaGeoposicionado);
            mapaGeoposicionado.setCenter(path[0]);
        };
        reader.readAsText(file);
    });
}
