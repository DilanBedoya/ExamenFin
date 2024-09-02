import { Router } from "express";
const router = Router()

import { 
    loginUserController, 
    registerUserController } from "../controllers/usuarios_controller.js";

router.post("/usuario/login", loginUserController)
router.post("/usuario/register", registerUserController)


export default router
