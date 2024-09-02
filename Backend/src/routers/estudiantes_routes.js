import { Router } from "express";
const router = Router()

import {
    crearEstudiantesController,
    detalleEstudianteController,
    listarEstudiantesController,
    actualizarEstudiantesController,
    eliminarEstudianteController
} from "../controllers/estudiantes_controller.js";

import autenticacionUsuario from "../middlewares/autenticacionUsuario.js";

//Crear
router.post("/estudiantes/crear-estudiante", autenticacionUsuario, crearEstudiantesController)
//Detalle
router.get("/estudiantes/detalle-estudiante/:id", autenticacionUsuario, detalleEstudianteController)
router.get("/estudiantes/listar-estudiante", autenticacionUsuario, listarEstudiantesController)

// //Actualizar
router.put("/estudiantes/actualizar-estudiante/:id", autenticacionUsuario, actualizarEstudiantesController)
// //Eliminar
router.delete("/estudiantes/eliminar-estudiante/:id", autenticacionUsuario, eliminarEstudianteController)


export default router

