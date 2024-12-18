class Memoria{
    elements=[
        {
            element: "RedBull",
            source: "./multimedia/Red_Bull_Racing_logo.svg"
           // source: "https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg"
        },
        {
            element: "McLaren",
            source: "./multimedia/McLaren_Racing_logo.svg"
            //source: "https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg"
        },
        {
            element: "Alpine",
            source: "./multimedia/Alpine_F1_Team_2021_Logo.svg"
           // source: "https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg"
        },
        {
            element: "AstonMartin",
            source: "./multimedia/Aston_Martin_Aramco_Cognizant_F1.svg"
            //source: "https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg"
        },
        {
            element: "Ferrari",
            source: "./multimedia/Scuderia_Ferrari_Logo.svg"
            //source: "https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg"
        },
        {
            element: "Mercedes",
            source: "./multimedia/Mercedes_AMG_Petronas_F1_Logo.svg"
            //source: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg"
        },
        {
            element: "RedBull",
            source: "./multimedia/Red_Bull_Racing_logo.svg"
            //source: "https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg"
        },
        {
            element: "McLaren",
            source: "./multimedia/McLaren_Racing_logo.svg"
            //source: "https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg"
        },
        {
            element: "Alpine",
            source: "./multimedia/Alpine_F1_Team_2021_Logo.svg"
            //source: "https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg"
        },
        {
            element: "AstonMartin",
            source: "./multimedia/Aston_Martin_Aramco_Cognizant_F1.svg"
            //source: "https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg"
        },
        {
            element: "Ferrari",
            source: "./multimedia/Scuderia_Ferrari_Logo.svg"
            //source: "https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg"
        },
        {
            element: "Mercedes",
            source: "./multimedia/Mercedes_AMG_Petronas_F1_Logo.svg"
            //source: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg"
        }
    ];
        
    
    hasFlippedCard; 
    lockBoard; 
    firstCard;
    secondCard;
    constructor(){
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;
        this.shuffleElements();
        this.createElements();
        this.addEventListeners();
    }
   
    shuffleElements(){
        for (let i = this.elements.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); 
            [this.elements[i], this.elements[j]] = [this.elements[j], this.elements[i]]; 
        }
    }
    unflipCards(){
        this.lockBoard = true;
        setTimeout(() => {
            this.firstCard.removeAttribute('data-state');
            this.secondCard.removeAttribute('data-state');
            this.firstCard=null;
            this.secondCard=null;
            this.lockBoard=false;
          }, 2500);
        
        
    }
    resetBoard(){
        this.firstCard = null;
        this.secondCard = null;
        this.hasFlippedCard = false;
        this.lockBoard = false;
    }
    checkForMatch(){
        if(this.firstCard.getAttribute("data-element")==this.secondCard.getAttribute("data-element"))
            this.disableCards();
        else
            this.unflipCards();

    }
    disableCards(){
        this.firstCard.setAttribute("data-state","revealed") ;
        this.secondCard.setAttribute("data-state","revealed") ;
        this.resetBoard();
    }

    createElements(){
        let section = document.querySelectorAll("section")[1];      
        for(let i = this.elements.length-1; i>=0;i--){
            let article = document.createElement("article");
            article.setAttribute("data-element",this.elements[i].element);
            let h3 = document.createElement("h3"); 
            h3.appendChild(document.createTextNode("Tarjeta de memoria"));
            article.appendChild(h3);
            let img = document.createElement("img");
            img.setAttribute("src",this.elements[i].source);
            img.setAttribute("alt",this.elements[i].element);
            article.appendChild(img);
            section.appendChild(article);    
            

        }
    }
    addEventListeners(){
        let section = document.querySelectorAll("section")[1];
        let articles = section.querySelectorAll("article");
        articles.forEach((element) => {
            element.addEventListener("click",this.flipCard.bind(element,this));
        });
        
    }
    flipCard(game){
        if(game.lockBoard==true)
            return;
      
        this.setAttribute('data-state', 'flip');
           
        if(game.firstCard==null ){
            game.hasFlippedCard=true;
            game.firstCard=this;
            return;
        }
        
        if(game.firstCard!=null && game.secondCard==null){
            game.hasFlippedCard=true;
            game.secondCard=this;
            game.checkForMatch();
        }

    }

}