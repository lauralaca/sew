class Noticias{
    constructor(){
        if (window.File && window.FileReader && window.FileList && window.Blob) 
        {  
            //El navegador soporta el API File
            document.write("<p>Este navegador soporta el API File </p>");
        }
            else document.write("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");
          
    }

    readInputFile(files) {
        var archivo = files[0];
        var errorArchivo = document.getElementById("errorLectura");
        var tipoTexto = /text.*/;
        if (archivo.type.match(tipoTexto)) {
            var lector = new FileReader();
            lector.onload = function (evento) {
                var contenido = lector.result;
                var lineas = contenido.split('\n');
                var section = document.querySelector("section");
    
                lineas.forEach(function (linea) {
                    if (linea.trim() !== '') {
                        var partes = linea.split('_');
                        var titular = partes[0];
                        var entradilla = partes[1];
                        var autor = partes[2];
    
                        var noticia = document.createElement('article');
                        
                        var titularElemento = document.createElement('h4');
                        titularElemento.textContent = titular;
                        noticia.appendChild(titularElemento);
    
                        var entradillaElemento = document.createElement('p');
                        entradillaElemento.textContent = entradilla;
                        noticia.appendChild(entradillaElemento);
    
                        var autorElemento = document.createElement('p');
                        autorElemento.textContent = 'Por: ' + autor;
                        noticia.appendChild(autorElemento);
    
                        section.appendChild(noticia);
                    }
                });
            };
            lector.readAsText(archivo);
        } else {
            errorArchivo.innerText = "Error : ¡¡¡ Archivo no válido !!!";
        }
    }
    
    crearNoticia(){
        let titularE = $('[name="titular"]').val();
        let entradillaE = $('[name="entradilla"]').val();
        let autorE = $('[name="autor"]').val();
        
        if (titularE && entradillaE && autorE) {

            let noticia = document.createElement("article");
            let titular = document.createElement("h4");
            titular.appendChild(document.createTextNode(titularE));

            let entradilla = document.createElement("p");
            entradilla.appendChild(document.createTextNode(entradillaE));

            let autor = document.createElement("p");
            autor.appendChild(document.createTextNode('Por: ' + autorE));
        
            noticia.appendChild(titular);
            noticia.appendChild(entradilla);
            noticia.appendChild(autor);

            let section = document.querySelector("section");
            section.appendChild(noticia);
        
            
            $('[name="titular"]').val('');
            $('[name="entradilla"]').val('');
            $('[name="autor"]').val('');
        } else {
            alert('Por favor, completa todos los campos.');
        }
    };
        
    
}