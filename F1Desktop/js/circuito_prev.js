class Circuito {
    constructor() {
        this.init();
    }

    init() {
        document.querySelector('input[type="file"]').addEventListener('change', (event) => this.handleFileSelect(event));
    }

    handleFileSelect(event) {
        var archivo = event.target.files[0];
        if (archivo) {
            var lector = new FileReader();
            lector.onload = (e) => this.processFile(e);
            lector.readAsText(archivo);
        }
    }

    processFile(e) {
        var contenidoXML = e.target.result;
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(contenidoXML, "text/xml");
        this.mostrarContenidoXML(xmlDoc);
    }

    mostrarContenidoXML(xmlDoc) {
        /* var contenidoHTML = this.convertirXMLaHTML(xmlDoc.documentElement);
        document.querySelectorAll('section')[0].innerHTML = contenidoHTML; */

        var contenidoHTML = this.convertirXMLaHTML(xmlDoc.documentElement); 
        var section = document.querySelectorAll('section')[0]; 
        section.appendChild(contenidoHTML);
        
    }

    convertirXMLaHTML(node) {
       /*  var html = '';
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
        return html; */
        var html = document.createElement('div'); 
        if (node.nodeType === 1) { 
            var article = document.createElement('article');
            var h4 = document.createElement('h4'); 
            h4.textContent = node.nodeName; 
            article.appendChild(h4); 
            if (node.attributes.length > 0) { 
                var ul = document.createElement('ul'); 
                for (var j = 0; j < node.attributes.length; j++) { 
                    var attribute = node.attributes[j]; 
                    var li = document.createElement('li'); 
                    li.textContent = attribute.name + ': ' + attribute.value; ul.appendChild(li); 
                } article.appendChild(ul); 
            } if (node.childNodes.length > 0) { 
                for (var i = 0; i < node.childNodes.length; i++) { 
                    article.appendChild(this.convertirXMLaHTML(node.childNodes[i])); 
                } } 
                else { 
                    var p = document.createElement('p'); 
                    p.textContent = node.textContent; 
                    article.appendChild(p); 
                } 
                html.appendChild(article); } 
                else if (node.nodeType === 3) { 
                    var p = document.createElement('p'); 
                    p.textContent = node.nodeValue.trim(); 
                    html.appendChild(p); 
                } 
                return html; 
        
    }
}
