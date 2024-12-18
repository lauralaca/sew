class Semáforo{
    levels = [0.2, 0.5, 0.8];
    lights = 4;
    unload__moment = null;
    clic_moment = null;
    difficulty;
    constructor(){
        let index = Math.floor(Math.random() * this.levels.length);
        this.difficulty = this.levels[index];
        this.createStructure();
    }

    createStructure(){
        let main = document.createElement("main");
        let h4 = document.createElement("h4");
        h4.appendChild(document.createTextNode("Semáforo"));
        main.appendChild(h4);
    
        for(let i = 0; i < 4; i++){ 
            let div = document.createElement("div");
            main.appendChild(div);
        }
    
        let buttonArranque = document.createElement("button");
        buttonArranque.appendChild(document.createTextNode("Arranque"));
        
        buttonArranque.onclick = () => {
            this.initSequence();
            buttonArranque.disabled = true; 
        };
        
        main.appendChild(buttonArranque);
    
        let buttonReaccion = document.createElement("button");
        buttonReaccion.appendChild(document.createTextNode("Reacción"));
        buttonReaccion.disabled = true;
        buttonReaccion.onclick = () => {
            this.stopReaction();
        };
        main.appendChild(buttonReaccion);
    
        let body = document.querySelector("body");
        body.appendChild(main);
    }
    
    initSequence(){
        let main = document.querySelector("main");
        main.classList.add('load');
        let time = 2000+(this.difficulty*100);
        setTimeout(() => {  
            main.classList.remove('load');
            main.unload__moment = Date.now();
            this.endSequence();
        }, time);
    }
    
    endSequence(){
        let buttonReaccion = document.querySelectorAll("button")[1];
        buttonReaccion.disabled = false;
        let main = document.querySelector("main");  
        main.classList.add("unload");      
    }
    stopReaction(){
        let main = document.querySelector("main");
        main.clic_moment = Date.now();

        let tiempoReacción = main.clic_moment - main.unload__moment;

        let prevParrafo = document.querySelectorAll("p");
        if(prevParrafo.length>1){
            main.removeChild(prevParrafo[1] );
        }
        let parrafo = document.createElement("p");
        parrafo.appendChild(document.createTextNode("Tiempo de reacción: "+tiempoReacción+" ms"));
        main.appendChild(parrafo);
        this.createRecordForm(tiempoReacción);
        main.classList.remove("load");
        main.classList.remove("unload");

        
        let buttonArranque = document.querySelectorAll("button")[0];
        let buttonReaccion = document.querySelectorAll("button")[1];
        buttonReaccion.disabled = true; 
        buttonArranque.disabled = false; 
    }
    createRecordForm(tiempoReacción){
        let main = document.querySelector("main"); 
        let section = $('<section></section>'); 
        section.append($('<h3></h3>').text("Resultados")); 
        main.append(section[0]); 
        let form = $('<form></form>').attr('method', 'post').attr('action', 'semaforo.php'); 
        form.append($('<label></label>').text('Nombre:').append($('<input>').attr('type', 'text').attr('name', 'nombre'))); 
        form.append($('<label></label>').text('Apellidos:').append($('<input>').attr('type', 'text').attr('name', 'apellidos'))); 
        form.append($('<label></label>').text('Nivel:').append($('<input>').attr('type', 'text').attr('name', 'nivel').val(this.difficulty).prop('readonly', true))); 
        form.append($('<label></label>').text('Tiempo de reacción:').append($('<input>').attr('type', 'text').attr('name', 'tiempo').val(tiempoReacción / 1000).prop('readonly', true))); 
        form.append($('<button></button>').attr('type', 'submit').text('Guardar')); 
        $(section).append(form);
        
    }
}