<?php
require_once('../Models/cls_proyectos.model.php');
$proyecto = new Clase_Proyectos;
switch ($_GET["op"]) {
    case 'todos':
        $datos = array(); //defino un arreglo
        $datos = $proyecto->todos(); //llamo al modelo de usuarios e invoco al procedimiento todos y almaceno en una variable
        while ($fila = mysqli_fetch_assoc($datos)) { //recorro el arreglo de datos
            $todos[] = $fila;
        }
        echo json_encode($todos); //devuelvo el arreglo en formato json
        break;
    case "uno":
        $id_proyecto = $_POST["id_proyecto"]; //defino una variable para almacenar el id del usuario, la variable se obtiene mediante POST
        $datos = array(); //defino un arreglo
        $datos = $proyecto->uno($id_proyecto); //llamo al modelo de usuarios e invoco al procedimiento uno y almaceno en una variable
        $uno = mysqli_fetch_assoc($datos); //recorro el arreglo de datos
        echo json_encode($uno); //devuelvo el arreglo en formato json
        break;
    case 'insertar':
        $nombre_pro = $_POST["nombre_pro"];
        $id_empleado = $_POST["id_empleado"];
        $fecha_inicio = $_POST["fecha_inicio"];
        $fecha_fin = $_POST["fecha_fin"];
        $datos = array(); //defino un arreglo
        $datos = $proyecto->insertar($nombre_pro,$id_empleado,$fecha_inicio,$fecha_fin); //llamo al modelo de usuarios e invoco al procedimiento uno y almaceno en una variable
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;
    case 'actualizar':
        $id_proyecto = $_POST["id_proyecto"];
        $nombre_pro = $_POST["nombre_pro"];
        $id_empleado = $_POST["id_empleado"];
        $fecha_inicio = $_POST["fecha_inicio"];
        $fecha_fin = $_POST["fecha_fin"];
        $datos = array(); //defino un arreglo
        $datos = $proyecto->actualizar($id_proyecto, $nombre_pro,$id_empleado,$fecha_inicio,$fecha_fin); //llamo al modelo de usuarios e invoco al procedimiento actual
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;
    case 'eliminar':
        $id_proyecto = $_POST["id_proyecto"]; //defino una variable para almacenar el id del usuario, la variable se obtiene mediante POST
        $datos = array(); //defino un arreglo
        $datos = $proyecto->eliminar($id_proyecto); //llamo al modelo de usuarios e invoco al procedimiento uno y almaceno en una variable
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;
}
