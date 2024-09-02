import {Schema, model} from "mongoose";
 

const EstudiantesSchema = new Schema({
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
    cedula: {
        type: String,
        require: true,
        trim: true, 
        unique: true
    },
    fecha_nacimiento: {
        type: Date,
        require: true,
        trim: true
    },
    ciudad: {
        type: String,
        default: null
    },
    direccion: {
        type: String,
        require: true,
        trim: true
    },
    telefono: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique:true
    },

},{
    timestamps: true
})


export default model("Estudiantes", EstudiantesSchema)