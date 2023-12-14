<?php
class SubirFoto{
    public function guardar($imagen){
        $destino = '../Public/assets/images/products/'. $_FILES["imagen"]["name"];
        copy($_FILES["imagen"]["tmp_name"],$destino);
        return '../'.$destino;
    } 
}