<!DOCTYPE HTML>
<?php
class Carrusel {
    private $nombreCapital;
    private $nombrePaís;

    public function __construct($nombreCapital, $nombrePaís) {
        $this->nombreCapital = $nombreCapital;
        $this->nombrePaís = $nombrePaís;
    }

    public function fotos() {
        $url = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        $url .= "&tags=" . $this->nombreCapital . "," . $this->nombrePaís;
        $url .= '&format=json';

        $respuesta = @file_get_contents($url);
        if ($respuesta === FALSE) {
            echo "Error fetching data.";
            return;
        }

        $json = json_decode($respuesta);
        if ($json != null) {
            print_r($json);
        } else {
            echo "Error decoding JSON.";
        }
    }
}

$carrusel = new Carrusel("Doha", "Qatar");
$carrusel->fotos();
?>

<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <meta name ="author" content ="Laura Labrada Campos" />
    <meta name ="description" content ="documento para utilizar en otros módulos de la asignatura" />
    <meta name ="keywords" content ="viajes, f1, formula1" />
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
    <title>F1 Desktop - Viajes</title>
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css">
    <link rel="icon" href="multimedia/favicon.ico">  
    <script src="js/viajes.js"></script>
</head>

<body>
    <!-- Datos con el contenidos que aparece en el navegador -->
    <header>
        <h1><a href="index.html">F1 Desktop</a></h1>
        <nav>
            <a href="index.html" title="incio">Inicio</a>
            <a href="piloto.html" title="piloto">Piloto</a>
            <a href="noticias.html" title="noticias">Noticias</a>
            <a href="calendario.html" title="calendario">Calendario</a>
            <a href="meteorologia.html" title="meteorología">Meteorología</a>
            <a href="circuito.html" title="circuito">Circuito</a>
            <a href="viajes.php" title="viajes">Viajes</a>
            <a href="juegos.html" title="juegos">Juegos</a>
        </nav>
    </header>
    <p>Estás en: Inicio > Viajes</p>
    <h2>Viajes</h2>
    <main> 
      
        <section>
            <h3>Mapa Dinámico</h3>
            <div></div>
        </section>
       <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&callback=miMapa.getMapaDinamico"></script>
       
       
        <input type="button" value="Obtener mapa estático" onClick = "miMapa.getMapaEstático();"/>
    </main>
    
</body>
</html>