
<!DOCTYPE HTML>
<?php
class Record {
    private $server;
    private $user;
    private $pass;
    private $dbname;
    private $db;

    public function __construct() {
        $this->server = "localhost";
        $this->user = "DBUSER2024";
        $this->pass = "DBPSWD2024";
        $this->dbname = "records";
        $this->connect();
        $this->insert();
    }

    private function connect() {
        $this->db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
        if ($this->db->connect_error) {
            exit("<h3>ERROR de conexión: " . $this->db->connect_error . "</h3>");
        } 
    }

    public function insert() {
        if (count($_POST) > 0) {
            $nombre = $_POST["nombre"];
            $apellidos = $_POST["apellidos"];
            $nivel = $_POST["nivel"];
            $tiempo = $_POST["tiempo"];

            // Prepara la sentencia de inserción
            $consultaPre = $this->db->prepare("INSERT INTO registro (nombre, apellidos, nivel, tiempo) VALUES (?, ?, ?, ?)");
            // Añade los parámetros de la variable Predefinida $_POST
            $consultaPre->bind_param('ssdd', $nombre, $apellidos, $nivel, $tiempo);
            // Ejecuta la sentencia
            $consultaPre->execute();
            // Muestra los resultados
            $consultaPre->close();
            // Cierra la base de datos
            $this->db->close();
        }
    }
}

new Record();
?>


<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <meta name ="author" content ="Laura Labrada Campos" />
    <meta name ="description" content ="documento para utilizar en otros módulos de la asignatura" />
    <meta name ="keywords" content ="juegos, f1, formula1, semáforo, reacción" />
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
    <title>F1 Desktop - Juegos</title>
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css">
    <link rel="stylesheet" type="text/css" href="estilo/semaforo_grid.css">
    <link rel="icon" href="multimedia/favicon.ico">
    <script
        src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="
        crossorigin="anonymous"></script>
    <script src="js/semaforo.js"></script>
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
    <p>Estás en: Inicio > Juegos > Semáforo</p>
    <h2>Juegos</h2>
    <section>
        <h3>Menú:</h3>
        <a href="memoria.html" title="memoria">Memoria</a>
        <a href="semaforo.php" title="semaforo">Semáforo</a>
    </section>
    <script>
        let semaforo = new Semáforo();
    </script>
</body>
</html>