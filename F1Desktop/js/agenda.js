class Agenda{
    urlConsulta;
    constructor(urlConsulta){
        this.urlConsulta=urlConsulta;
    }

    getCarreras(){
        let urlCarreras = this.urlConsulta;
        $.ajax({
            dataType: "json",
            url: urlCarreras,
            method: 'GET',
            success: function(datos){
                $.each(datos.MRData.RaceTable.Races, function(i, item) {
                    
                    var stringDatos = "<article>";
                    stringDatos += "<h4>" + item.raceName + "</h4>";
                    stringDatos += "<ul><li>Circuito: " +item.Circuit.circuitName + "</li>";
                    stringDatos += "<ul><li>Coordenadas del circuito: " + item.Circuit.Location.lat+", "+ item.Circuit.Location.long+ " grados</li></ul>";
                    stringDatos += "<li>Fecha: " +item.date+", "+item.time + "</li>";
                    stringDatos +=  "</ul></article>";
                    $("section").append(stringDatos);
                });
            },
            error: function( thrownError) {
                console.error(thrownError);
            }
        });
    }
 
  
   
    


}