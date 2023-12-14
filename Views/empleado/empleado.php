<?php require_once('../html/head2.php') ?>




<div class="row">
    <div class="card w-100">
        <div class="card-body p-4">
            <h5 class="card-title fw-semibold mb-4">Lista de empleado</h5>

            <div class="table-responsive">
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Modal_empleado">
                    Nuevo empleado
                </button>
                <table class="table text-nowrap mb-0 align-middle">
                    <thead class="text-dark fs-4">
                        <tr>
                            <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">#</h6>
                            </th>
                            <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Fotografia empleado</h6>
                            </th>
                            <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Cedula</h6>
                            </th>
                            <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Nombre</h6>
                            </th>
                            <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Apellido</h6>
                            </th>
                            <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Cargo</h6>
                            </th>
                            <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Salario Mensual</h6>
                            </th>
                            <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Fecha contrato</h6>
                            </th>
                        </tr>
                    </thead>
                    <tbody id="tabla_empleado">

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<!-- Ventana Modal-->

<!-- Button trigger modal -->


<!-- Modal -->
<div class="modal fade" id="Modal_empleado" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form method="post" id="form_empleado">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Empleado</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <input type="hidden" name="id_empleado" id="id_empleado">
                    <div class="form-group">


                        <div class="form-group">
                            <label for="cedula">Cédula</label>
                            <input type="text" onfocusout="algoritmo_cedula();cedula_repetida();" required class="form-control" id="cedula" name="cedula" placeholder="cedula">
                            <div class="alert alert-danger d-none" role="alert" id="errorCedula">
                            </div>
                            <div class="alert alert-danger d-none" role="alert" id="CedulaRepetida">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="nombre">Nombre</label>
                            <input type="text" required class="form-control" id="nombre" name="nombre" placeholder="nombre">
                        </div>

                        <div class="form-group">
                            <label for="apellido">Apellido</label>
                            <input type="text" required class="form-control" id="apellido" name="apellido" placeholder="apellido">
                        </div>

                        <div class="form-group">
                            <label for="cargo">Cargo</label>
                            <input type="text" required class="form-control" id="cargo" name="cargo" placeholder="cargo">
                        </div>

                        <div class="form-group">
                            <label for="salario">Salario Mensual</label>
                            <input type="text" required class="form-control" id="salario" name="salario" placeholder="salario">
                        </div>

                        <div class="form-group">
                            <label for="fecha_contratacion">Fecha contrato</label>
                            <input type="date" required class="form-control" id="fecha_contratacion" name="fecha_contratacion" placeholder="fecha_contratacion">
                        </div>
                        <div class="form-group">
                            <label for="imagen">Fotografia</label>
                            <img id="img_producto" name="img_producto" class="card-img-top d-none" width="100" height="100" alt="">
                            <input type="file" class="form-control" id="imagen" name="imagen" placeholder="Ingrese imagen">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary">Guardar</button>
                        <button type="button" class="btn btn-secondary" onclick="limpia_Cajas()" data-bs-dismiss="modal">Close</button>
                    </div>
            </form>
        </div>
    </div>
</div>

<?php require_once('../html/script2.php') ?>

<!-- <script src="empleado.controller.js"></script>
<script src="empleado.model.js"></script> -->
<script src="./empleado.js"></script>