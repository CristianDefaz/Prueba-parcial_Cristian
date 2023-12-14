class Empleado_model {
  constructor(
    id_empleado ,
    cedula,
    nombre,
    apellido,
    cargo,
    salario,
    fecha_contratacion,
    data,
    Ruta
  ) {
    this.id_empleado  = id_empleado ;
    this.cedula = cedula;
    this.nombre = nombre;
    this.apellido = apellido;
    this.cargo = cargo;
    this.salario = salario;
    this.fecha_contratacion = fecha_contratacion;
    this.Ruta = Ruta;
    this.data = data; 
  }
  todos() {
    var html = "";
    $.get("../../Controllers/empleado.controller.php?op=todos" 
    + this.Ruta, (res) => {
      res = JSON.parse(res);
      console.log(res);
      $.each(res, (index, valor) => {
        var fondo;
        html += `<tr>
                <td>${index + 1}</td>
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
            <button class='btn btn-info' onclick='ver(${
              valor.id_empleado 
            })'>Ver</button>
            </td></tr>
                `;
      });
      $("#tabla_empleado").html(html);
    });
  }

  
  insertar() {
    var dato = new FormData();
    dato= this.data;
    $.ajax({
      url: "../../Controllers/empleado.controller.php?op=insertar",
      type: "POST",
      data: dato,
      contentType: false,
      processData: false,
      success: function (res) {
        res = JSON.parse(res);
        if (res === "ok") {
          Swal.fire("Empleado", "Empleado Ingresada", "success");
          todos_controlador(); 
        } else {
          Swal.fire("Error", res, "error");
        }
      }
    });
    limpia_Cajas();
  }

  cedula_repetida() {
    var cedula = this.cedula;
    $.post(
      "../../Controllers/empleado.controller.php?op=cedula_repetida",
      { cedula: cedula },
      (res) => {
        res = JSON.parse(res);
        if (parseInt(res.cedula_repetida) > 0) {
          $("#CedulaRepetida").removeClass("d-none");
          $("#CedulaRepetida").html(
            "La cédula ingresa, ya exite en la base de datos"
          );
          $("button").prop("disabled", true);
        } else {
          $("#CedulaRepetida").addClass("d-none");
          $("button").prop("disabled", false);
        }
      }
    );
  }
  uno() {
    var id_empleado  = this.id_empleado ;
    $.post(
      "../../Controllers/empleado.controller.php?op=uno",
      { id_empleado : id_empleado  },
      (res) => {
        console.log(res);
        res = JSON.parse(res);
        $("#id_empleado ").val(res.id_empleado );
        $("#cedula").val(res.cedula);
        $("#nombre").val(res.nombre);
        $("#apellido").val(res.apellido);
        $("#cargo").val(res.cargo);
        $("#salario").val(res.salario);

        document.getElementById("fecha_contratacion").value = res.fecha_contratacion; //asiganr al select el valor
      }
    );
    $("#Modal_empleado").modal("show");
  }

  editar() {
    var dato = new FormData();
    dato = this.data;
    $.ajax({
      url: "../../Controllers/empleado.controller.php?op=actualizar",
      type: "POST",
      data: dato,
      contentType: false,
      processData: false,
      success: function (res) {
        res = JSON.parse(res);
        if (res === "ok") {
          Swal.fire("Empleado", "Empleado Actualizado", "success");
          todos_controlador();
        } else {
          Swal.fire("Error", res, "error");
        }
      },
    });
    this.limpia_Cajas();
  }

  eliminar() {
    var id_empleado  = this.id_empleado ;

    Swal.fire({
      title: "empleado",
      text: "Esta seguro de eliminar el computador",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        $.post(
          "../../Controllers/empleado.controller.php?op=eliminar",
          { id_empleado : id_empleado  },
          (res) => {
            console.log(res);
            res = JSON.parse(res);
            if (res === "ok") {
              Swal.fire("Empleado", "Empleado Eliminado", "success");
              todos_controlador();
            } else {
              Swal.fire("Error", res, "error");
            }
          }
        );
      }
    });

    this.limpia_Cajas();
  }


  limpia_Cajas(){
    document.getElementById("cedula").value = "";
    document.getElementById("nombre").value = "";  
    document.getElementById("apellido").value = "";
    document.getElementById("cargo").value = "";
    document.getElementById("salario").value = "";
    document.getElementById("fecha_contratacion").value = "";
    $("#Modal_empleado").modal("hide");
  }
}