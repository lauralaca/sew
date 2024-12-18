class Fondo{
    país;
    capital;
    circuito;
    constructor (país, capital, circuito){
        this.país=país;
        this.capital=capital;
        this.circuito=circuito;
    }
    getImagen(){
        var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        $.getJSON(flickrAPI, {
            tags: "f1, "+this.circuito,
            tagmode: "all",
            format: "json"
        }).done(function(data){
            let url = data.items[0].media.m.replace("_m","_b")
            $('body').css('background-image', 'url('+url+')').css('background-size','100%');
        });
    }
}