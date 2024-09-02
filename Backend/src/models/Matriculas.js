import mongoose, { Schema, model } from "mongoose";



const MatriculasSchema = new Schema({
    codigo: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    descripcion: {
        type: String,
        require: true,
        trim: true
    },
    estudiante: {
        type: mongoose.Schema.Types.String,
        ref: "Estudiantes",
        required: true
    },
    materia: [{
        type: mongoose.Schema.Types.String,
        ref: "Materias",
        require: true
    }]

}, {
    timestamps: true
})


export default model("Matriculas", MatriculasSchema)