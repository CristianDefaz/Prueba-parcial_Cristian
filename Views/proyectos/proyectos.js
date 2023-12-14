//aqui va a estar el codigo de usuarios.model.js

function init() {
  $("#frm_proyectos").on("submit", function (e) {
    guardaryeditar(e);
  });
}

$().ready(() => {
  todos();
});

var todos = () => {
  var html = "";
  $.get("../../Controllers/proyectos.controller.php?op=todos", (res) => {
    res = JSON.parse(res);
    $.each(res, (index, valor) => {
      html += `<tr>
                <td>${index + 1}</td>
                <td>${valor.nombre_pro}</td>
                <td>${valor.nombre + " " + valor.apellido}</td>
                <td>${valor.fecha_inicio}</td>
                <td>${valor.fecha_fin}</td>
            <td>
            <button class='btn btn-success' onclick='editar(${
              valor.id_proyecto
            })'>Editar</button>
            <button class='btn btn-danger' onclick='eliminar(${
              valor.id_proyecto
            })'>Eliminar</button>
            <button class='btn btn-info' onclick='ver(${
              valor.id_proyecto
            })'>Ver</button>
            </td></tr>
                `;
    });
    $("#tabla_proyecto").html(html);
  });
};

var guardaryeditar = (e) => {
  e.preventDefault();
  var dato = new FormData($("#frm_proyectos")[0]);
  var ruta = "";
  var id_proyecto = document.getElementById("id_proyecto").value;
  if (id_proyecto > 0) {
    ruta = "../../Controllers/proyectos.controller.php?op=actualizar";
  } else {
    ruta = "../../Controllers/proyectos.controller.php?op=insertar";
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
        Swal.fire("Proyecto", "Registrado con éxito", "success");
        todos();
        limpia_Cajas();
      } else {
        Swal.fire("Proyecto", "Error al guardo, intente mas tarde", "error");
      }
    },
  });
};

var cargaempleados= () => {
  return new Promise((resolve, reject) => {
    $.post("../../Controllers/empleado.controller.php?op=todos", (res) => {
      res = JSON.parse(res);
      var html = "";
      $.each(res, (index, val) => {
        html += `<option value="${val.id_empleado}"> ${val.cedula+" "+val.nombre}</option>`;
      });
      $("#id_empleado").html(html);
      resolve();
    }).fail((error) => {
      reject(error);
    });
  });
};

var editar = async (id_proyecto) => {
  await cargaempleados();
  $.post(
    "../../Controllers/proyectos.controller.php?op=uno",
    { id_proyecto: id_proyecto },
    (res) => {
      res = JSON.parse(res);

      $("#id_proyecto").val(res.id_proyecto);
      $("#id_empleado").val(res.id_empleado);
      //document.getElementById("id_empleado").value = res.PaisesId;


      $("#Nombre").val(res.Nombre);
    }
  );
  $("#Modal_proyecto").modal("show");
};

var eliminar = (id_proyecto) => {
  Swal.fire({
    title: "Paises",
    text: "Esta seguro de eliminar la provincia",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Eliminar",
  }).then((result) => {
    if (result.isConfirmed) {
      $.post(
        "../../Controllers/proyectos.controller.php?op=eliminar",
        { id_proyecto: id_proyecto },
        (res) => {
          res = JSON.parse(res);
          if (res === "ok") {
            Swal.fire("Proyecto", "Provincia Eliminado", "success");
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
  document.getElementById("id_proyecto").value = "";
  document.getElementById("id_empleado").value = "";
  document.getElementById("fecha_inicio").value = "";
  document.getElementById("fecha_fin").value = "";
  $("#Modal_proyecto").modal("hide");
};
init();
