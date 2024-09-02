import {Schema, model} from "mongoose";
import bcrypt from "bcryptjs"
 

const UsuariosSchema = new Schema({
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    apellido: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true, 
        unique: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    token: {
        type: String,
        default: null
    }

},{
    timestamps: true
})


UsuariosSchema.methods.encryptPassword = async function (password) {
    const salt = await bcrypt.genSalt(10)
    const passwordEncrypt = await bcrypt.hash(password, salt)
    return passwordEncrypt
}

UsuariosSchema.methods.mathPassword = async function (password) {
    const response = await bcrypt.compare(password, this.password)
    return response
}

UsuariosSchema.methods.crearToken = function () {
    const tokenGenerado = this.token = Math.random().toString(36).slice(2)
    return tokenGenerado
}



export default model("Usuarios", UsuariosSchema)