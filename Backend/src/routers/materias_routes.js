import { Router } from "express";
const router = Router()

import {
    crearMateriaController,
    detalleMateriaController,
    listarMateriasController,
    actualizarMateriasController,
    eliminarMateriaController

} from "../controllers/materias_controller.js";

import autenticacionUsuario from "../middlewares/autenticacionUsuario.js";

//Crear
router.post("/materias/crear-materia", autenticacionUsuario, crearMateriaController)
// //Detalle
router.get("/materias/detalle-materia/:id", autenticacionUsuario, detalleMateriaController)
router.get("/materias/listar-materia", autenticacionUsuario, listarMateriasController)
// // //Actualizar
router.put("/materias/actualizar-materia/:id", autenticacionUsuario, actualizarMateriasController)
// // //Eliminar
router.delete("/materias/eliminar-materia/:id", autenticacionUsuario, eliminarMateriaController)


export default router

