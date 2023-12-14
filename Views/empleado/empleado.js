//aqui va a estar el codigo de usuarios.model.js

function init() {
  $("#form_empleado").on("submit", function (e) {
    guardaryeditar(e);
  });
}

$().ready(() => {
  todos();
});

var todos = () => {
  var html = "";
  $.get("../../Controllers/empleado.controller.php?op=todos", (res) => {
    res = JSON.parse(res);
    $.each(res, (index, valor) => {
      html += `<tr>
      <td>${index + 1}</td>
      <td><img src="${valor.imagen}" class="card-img-top"></td>
      <td>${valor.cedula}</td>
      <td>${valor.nombre}</td>
      <td>${valor.apellido}</td>
      <td>${valor.cargo}</td>
      <td>${valor.salario}</td>
      <td>${valor.fecha_contratacion}</td>
  <td>
  <button class='btn btn-success' onclick='editar(${
    valor.id_empleado
  })'>Editar</button>
  <button class='btn btn-danger' onclick='eliminar(${
    valor.id_empleado
  })'>Eliminar</button>
  </td></tr>
      `;
});
$("#tabla_empleado").html(html);
});
}

var guardaryeditar = (e) => {
  e.preventDefault();
  var dato = new FormData($("#form_empleado")[0]);
  var ruta = "";
  var id_empleado = document.getElementById("id_empleado").value;
  if (id_empleado > 0) {
    ruta = "../../Controllers/empleado.controller.php?op=actualizar";
  } else {
    ruta = "../../Controllers/empleado.controller.php?op=insertar";
  }
  $.ajax({
    url: ruta,
    type: "POST",
    data: dato,
    contentType: false,
    processData: false,
    success: function (res) {
      res = JSON.parse(res);
      
      if (res == "ok") {
        Swal.fire("Empleado", "Registrado con éxito", "success");
        todos();
        limpia_Cajas();
      } else {
        Swal.fire("Empelado", "Error al guardo, intente mas tarde", "error");
      }
    },
  });
};

var editar = async (id_empleado) => {
  $.post(
    "../../Controllers/empleado.controller.php?op=uno",
    { id_empleado: id_empleado },
    (res) => {
      res = JSON.parse(res);
      $("#id_empleado ").val(res.id_empleado );
      $("#cedula").val(res.cedula);
      $("#nombre").val(res.nombre);
      $("#apellido").val(res.apellido);
      $("#cargo").val(res.cargo);
      $("#salario").val(res.salario);
      $("#fecha_contratacion").val(res.fecha_contratacion); 
     // $("#id_empleado").val(res.id_empleado);
      //document.getElementById("id_empleado").value = res.PaisesId;
    }
  );
  $("#Modal_empleado").modal("show");
};
var eliminar = (id_empleado) => {
  Swal.fire({
    title: "Empleado",
    text: "Esta seguro de eliminar la provincia",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Eliminar",
  }).then((result) => {
    if (result.isConfirmed) {
      $.post(
        "../../Controllers/empleado.controller.php?op=eliminar",
        { id_empleado: id_empleado },
        (res) => {
          res = JSON.parse(res);
          if (res === "ok") {
            Swal.fire("Empleado", "Empleado Eliminado", "success");
            todos();
          } else {
            Swal.fire("Error", res, "error");
          }
        }
      );
    }
  });

  impia_Cajas();
};



var limpia_Cajas = () => {
    document.getElementById("id_empleado").value = "";
    document.getElementById("cedula").value = "";
    document.getElementById("nombre").value = "";  
    document.getElementById("apellido").value = "";
    document.getElementById("cargo").value = "";
    document.getElementById("salario").value = "";
    document.getElementById("fecha_contratacion").value = "";
    document.getElementById("imagen").value = "";
    $("#Modal_empleado").modal("hide");
  }


  var algoritmo_cedula = () => {
    var cedula = $("#cedula").val();
    if (cedula.length == 10) {
      var digito_region = cedula.substring(0, 2);
      if (digito_region >= 1 && digito_region <= 24) {
        // Extraigo el ultimo digito
        var ultimo_digito = cedula.substring(9, 10);
        var pares =
          parseInt(cedula.substring(1, 2)) +
          parseInt(cedula.substring(3, 4)) +
          parseInt(cedula.substring(5, 6)) +
          parseInt(cedula.substring(7, 8));
        var numero1 = cedula.substring(0, 1);
        var numero1 = numero1 * 2;
        if (numero1 > 9) {
          var numero1 = numero1 - 9;
        }
        var numero3 = cedula.substring(2, 3);
        var numero3 = numero3 * 2;
        if (numero3 > 9) {
          var numero3 = numero3 - 9;
        }
        var numero5 = cedula.substring(4, 5);
        var numero5 = numero5 * 2;
        if (numero5 > 9) {
          var numero5 = numero5 - 9;
        }
        var numero7 = cedula.substring(6, 7);
        var numero7 = numero7 * 2;
        if (numero7 > 9) {
          var numero7 = numero7 - 9;
        }
        var numero9 = cedula.substring(8, 9);
        var numero9 = numero9 * 2;
        if (numero9 > 9) {
          var numero9 = numero9 - 9;
        }
        var impares = numero1 + numero3 + numero5 + numero7 + numero9;
        var suma_total = pares + impares;
        // extraemos el primero digito
        var primer_digito_suma = String(suma_total).substring(0, 1);
        // Obtenemos la decena inmediata
        var decena = (parseInt(primer_digito_suma) + 1) * 10;
        // Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
        var digito_validador = decena - suma_total;
        // Si el digito validador es = a 10 toma el valor de 0
        if (digito_validador == 10) var digito_validador = 0;
        // Validamos que el digito validador sea igual al de la cedula
        if (digito_validador == ultimo_digito) {
          $("#errorCedula").addClass("d-none");
          $("button").prop("disabled", false);
        } else {
          $("#errorCedula").removeClass("d-none");
          $("#errorCedula").html("El número de cédula ingresado no es correcto");
          $("button").prop("disabled", true);
        }
      } else {
        // imprimimos en consola si la region no pertenece
        $("#errorCedula").removeClass("d-none");
        $("#errorCedula").html("El número de cédula ingresado no es correcto");
        $("button").prop("disabled", true);
      }
    }
  };

  var cedula_repetida = () => {
    var cedula = $("#cedula").val(); // Obtener el valor de la cédula
    $.post(
        "../../Controllers/empleado.controller.php?op=cedula_repetida",
        { cedula: cedula },
        (res) => {
            res = JSON.parse(res);
            if (parseInt(res.cedula_repetida) > 0) {
                $("#CedulaRepetida").removeClass("d-none");
                $("#CedulaRepetida").html(
                    "La cédula ingresada ya existe en la base de datos"
                );
                $("button").prop("disabled", true);
            } else {
                $("#CedulaRepetida").addClass("d-none");
                $("button").prop("disabled", false);
            }
        }
    );
}


  init();