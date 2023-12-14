<?php
require_once('../Models/cls_empleado.model.php');
$empleado = new Clase_Empleado;
switch ($_GET["op"]) {
    case 'todos':
        $datos = array(); //defino un arreglo
        $datos = $empleado->todos(); //llamo al modelo de usuarios e invoco al procedimiento todos y almaceno en una variable
        while ($fila = mysqli_fetch_assoc($datos)) { //recorro el arreglo de datos
            $todos[] = $fila;
        }
        echo json_encode($todos); //devuelvo el arreglo en formato json
        break;
    case "uno":
        $id_empleado = $_POST["id_empleado"]; //defino una variable para almacenar el id del usuario, la variable se obtiene mediante POST
        $datos = array(); //defino un arreglo
        $datos = $empleado->uno($id_empleado); //llamo al modelo de usuarios e invoco al procedimiento uno y almaceno en una variable
        $uno = mysqli_fetch_assoc($datos); //recorro el arreglo de datos
        echo json_encode($uno); //devuelvo el arreglo en formato json
        break;
    case 'insertar':
        $cedula = $_POST["cedula"];
        $nombre = $_POST["nombre"];
        $apellido = $_POST["apellido"];
        $cargo = $_POST["cargo"];
        $salario = $_POST["salario"];
        $fecha_contratacion = $_POST["fecha_contratacion"];
        $datos = array(); //defino un arreglo
        $datos = $empleado->insertar($cedula, $nombre, $apellido, $cargo, $salario, $fecha_contratacion); //llamo al modelo de usuarios e invoco al procedimiento insertar
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;
    case 'actualizar':
        $id_empleado = $_POST["id_empleado"];
        $cedula = $_POST["cedula"];
        $nombre = $_POST["nombre"];
        $apellido = $_POST["apellido"];
        $cargo = $_POST["cargo"];
        $salario = $_POST["salario"];
        $fecha_contratacion = $_POST["fecha_contratacion"];
        $datos = array(); //defino un arreglo
        $datos = $empleado->actualizar($id_empleado, $cedula, $nombre, $apellido, $cargo, $salario, $fecha_contratacion); //llamo al modelo de usuarios e invoco al procedimiento actualizar
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;
    case 'eliminar':
        $id_empleado = $_POST["id_empleado"]; //defino una variable para almacenar el id del usuario, la variable se obtiene mediante POST
        $datos = array(); //defino un arreglo
        $datos = $empleado->eliminar($id_empleado); //llamo al modelo de usuarios e invoco al procedimiento eliminar
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;
    case "cedula_repetida":
        $cedula = $_POST["cedula"];
        $datos = array(); //defino un arreglo
        $datos = $empleado->cedula_repetida($cedula); //llamo al modelo de usuarios e invoco al procedimiento uno y almaceno en una variable
        $uno = mysqli_fetch_assoc($datos); //recorro el arreglo de datos
        echo json_encode($uno); //devuelvo el arreglo en formato json
        break;
}
