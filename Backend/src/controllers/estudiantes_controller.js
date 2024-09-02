import estudiantes from "../models/estudiantes.js"
import reservas from "../models/Matriculas.js"

import mongoose from "mongoose"


//Crear estudiantes
const crearEstudiantesController = async (req, res) => {
    //especificar en fecha de nacimiento : año-mes-dia
    const { cedula, email, nombre, apellido, fecha_nacimiento, ciudad, direccion, telefono } = req.body
    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Por favor completa todos los campos" })

    // Validar que todos los campos requeridos estén presentes y no vacíos
    if (!cedula || !email || !nombre || !fecha_nacimiento || !apellido || !ciudad || !direccion || !telefono) {
        return res.status(400).json({ msg: "Por favor completa todos los campos" });
    }

    // Validar que los campos que deben ser numéricos efectivamente lo sean
    if (isNaN(cedula) || isNaN(telefono)) {
        return res.status(400).json({ msg: "Cédula o teléfono deben ser valores numéricos" });
    }

    const validarCedula = await estudiantes.findOne({ cedula })
    if (validarCedula) return res.status(404).json({ msg: "Lo sentimos, la cédula del estudiante ya se encuentra registrado" })


    const validarEmail = await estudiantes.findOne({ email })
    if (validarEmail) return res.status(404).json({ msg: "Lo sentimos, el email del estudiante ya se encuentra registrado" })

    const nuevoEstudiante = new estudiantes(req.body)
    await nuevoEstudiante?.save()


    res.status(200).json({ msg: "Estudiante creado con éxito", nuevoEstudiante })
}


//Detalle estudiantes

const detalleEstudianteController = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: "Lo sentimos, el id no es válido" })

    const buscarEstudiante = await estudiantes.findById(id)
    if (!buscarEstudiante) return res.status(404).json({ msg: "Lo sentimos, el estudiante no existe" })

    res.status(200).json(buscarEstudiante)
}

//Listar los estudiantes

const listarEstudiantesController = async (req, res) => {
    try {
        // Obtener todos los estudiantes
        const todosLosEstudiantes = await estudiantes.find().select("-createdAt -updatedAt -__v");


        // Verificar si hay estudiantes
        if (todosLosEstudiantes.length === 0) {
            return res.status(404).json({ msg: "No se encontraron estudiantes" });
        }

        // Enviar respuesta con todos los estudiante
        res.status(200).json(todosLosEstudiantes);
    } catch (err) {
        // Manejo de errores
        console.error('Error al listar estudiantes:', err);
        res.status(500).json({ msg: "Hubo un error al listar los estudiantes" });
    }
};

//Actualizar estudiante 

const actualizarEstudiantesController = async (req, res) => {
    const { id } = req.params
    const { cedula, telefono } = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: "Lo sentimos, el id no es válido" })
    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Por favor, completa todos los campos" })


    // Validar que los campos que deben ser numéricos efectivamente lo sean
    if (isNaN(cedula) || isNaN(telefono)) {
        return res.status(400).json({ msg: "Cédula o teléfono deben ser valores numéricos" });
    }

    const buscarEstudiante = await estudiantes.findByIdAndUpdate(id, req.body)
    if (!buscarEstudiante) return res.status(404).json({ msg: "Lo sentimos, el estudiante no existe" })

    res.status(200).json({ msg: "Estudiante actualizado con éxito" })

}

//Eliminar estudiante

const eliminarEstudianteController = async (req, res) => {

    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: "Lo sentimos, el id no es válido" })

    const buscarEstudiante = await estudiantes.findById(id)
    if (!buscarEstudiante) return res.status(404).json({ msg: "Lo sentimos, el cliente no existe" })

    // Verificar si el estudiante tiene matriculas asociadas
    const matriculaExistente = await reservas.findOne({ 'estudiante': id });
    if (matriculaExistente) return res.status(400).json({ msg: "No se puede eliminar el estudiante porque tiene matriculas asociadas" });

    // Eliminar el cliente
    await estudiantes.findByIdAndDelete(id);
    
    res.status(200).json({ msg: "Estudiante eliminado con éxito" })
}


export {
    crearEstudiantesController,
    detalleEstudianteController,
    listarEstudiantesController,
    actualizarEstudiantesController,
    eliminarEstudianteController
}
