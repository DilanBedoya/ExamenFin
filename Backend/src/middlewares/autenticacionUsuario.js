
import usuarios from "../models/usuarios.js"
import jwt from "jsonwebtoken"

const autenticacionUsuario = async(req, res ,next) =>{
    const token = req.headers.authorization
    if(!token) return res.status(404).json({msg: "Lo sentimos, debes proporcionar un token"})

    const {authorization} = req.headers
    try {
        const {id, rol} = jwt.verify(authorization.split(" ")[1], process.env.JWT_SECRET)
        if(rol === "Usuario"){
            req.usuario = await usuarios.findById(id).lean()
            next()
        }
    } catch (error) {
        const e = new Error("Error al confirmar token")
        return res.status(404).json({msg: e.message})
    }


}


export default autenticacionUsuario