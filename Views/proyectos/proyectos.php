<?php require_once('../html/head2.php') ?>




<div class="row">


    <div class="card w-100">
        <div class="card-body p-4">
            <h5 class="card-title fw-semibold mb-4">Lista de Proyectos</h5>

            <div class="table-responsive">
                <button type="button" onclick="cargaempleados()" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Modal_proyecto">
                    Nuevo Proyecto
                </button>
                <table class="table text-nowrap mb-0 align-middle">
                    <thead class="text-dark fs-4">
                        <tr>
                            <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">#</h6>
                            </th>
                            <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Nombre Proyecto</h6>
                            </th>
                            <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Empleado a cargo</h6>
                            </th>
                            <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Fecha de inicio</h6>
                            </th>
                            <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Fecha final</h6>
                            </th>
                        </tr>
                    </thead>
                    <tbody id="tabla_proyecto">

                    </tbody>
                </table>
            </div>
        </div>
    </div>

</div>

<!-- Ventana Modal-->

<!-- Button trigger modal -->


<!-- Modal -->
<div class="modal fade" id="Modal_proyecto" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form method="post" id="frm_proyectos">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Proyectos</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <input type="hidden" name="id_proyecto" id="id_proyecto">
                    <div class="form-group">
                        <label for="nombre_pro">Nombre del proyecto</label>
                        <input type="text" required class="form-control" id="nombre_pro" name="nombre_pro" placeholder="Ingrese el nombre del proyecto">
                    </div>
                    <div class="form-group">
                        <label for="id_empleado">Empleado a cargo</label>
                        <select name="id_empleado" id="id_empleado" class="form-control">
                            <option value="0">Seleccione un pais</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="fecha_inicio">Fecha inicio</label>
                        <input type="date" required class="form-control" id="fecha_inicio" name="fecha_inicio" placeholder="fecha de inicio de proyecto">
                    </div>
                    <div class="form-group">
                        <label for="fecha_fin">Fecha fin</label>
                        <input type="date" required class="form-control" id="fecha_fin" name="fecha_fin" placeholder="fecha fin de proyecto">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary">Grabar</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </form>
        </div>
    </div>
</div>

<?php require_once('../html/script2.php') ?>

<script src="proyectos.js"></script>