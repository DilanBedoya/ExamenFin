import usuarios from "../models/usuarios.js"
import mongoose from "mongoose"
import crearToken from "../helpers/crearJWT.js"



const loginUserController = async(req, res) =>{
    const {email, password} = req.body
    if(Object.values(req.body).includes("")) return res.status(400).json({msg: "Por favor, completa todos los campos"})

    const usuarioEncontrado = await usuarios.findOne({email})
    if(!usuarioEncontrado) return res.status(404).json({msg: "El usuario es incorrecto, inténtalo nuevamente"})
    
    const confirmPassword =  await usuarioEncontrado.mathPassword(password)
    if(!confirmPassword) return res.status(404).json({msg: "La contraseña es incorrecta, inténtelo nuevamente"})
    
    const token = crearToken(usuarioEncontrado.id, "Usuario")
    const {_id, nombre, apellido} = usuarioEncontrado

    res.status(200).send({
        _id, 
        nombre, 
        apellido, 
        token, 
        email: usuarioEncontrado?.email
    })
}

//Endpoint no se usa en FrontEnd
const registerUserController = async(req, res) =>{
    const {email, password, nombre, apellido} = req.body
    if(Object.values(req.body).includes("")) return res.status(400).json({msg: "Por favor completa todos los campos"})
    
    const existe = await usuarios.findOne({email})
    if(existe) return res.status(400).json({msg: "Este usuario ya se encuentra registrado"})

    const respuesta = new usuarios(req.body)
    respuesta.password = await respuesta.encryptPassword(password)
    await respuesta.save()

    res.status(200).send(respuesta)    
}


export {loginUserController,
     registerUserController}