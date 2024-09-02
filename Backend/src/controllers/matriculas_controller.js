import estudiantes from "../models/estudiantes.js"
import materias from "../models/materias.js"
import matriculas from "../models/Matriculas.js"
import mongoose from "mongoose"




//Crear matricula

const crearMatriculaController = async (req, res) => {

    const { codigo, descripcion, estudiante, materia } = req.body


    //validar que se completen los campos correctamente
    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Por favor completa todos los campos" })
    if (!mongoose.Types.ObjectId.isValid(estudiante)) return res.status(400).json({ msg: "Lo sentimos, el id del estudiante no es válido" })

    // Validar que todos los campos requeridos estén presentes y no vacíos
    if (!codigo || !descripcion || !estudiante || !materia) {
        return res.status(400).json({ msg: "Por favor completa todos los campos" });
    }

    // Verificar si `materia` es un array
    if (!Array.isArray(materia)) {
        return res.status(400).json({ msg: "Lo sentimos, las materia deben estar en un array" });
    }

    // Verificar si hay duplicados en el array de materia
    const materiasUnicos = [...new Set(materia)]; // crear un arreglo con id unicos

    //compara la longitud de los arreglos
    if (materiasUnicos.length !== materia.length) {
        return res.status(400).json({ msg: "Lo sentimos, no puedes incluir materias duplicadas en la reserva" });
    }

    // Verificar cada ID de materia en el array
    for (let i = 0; i < materia.length; i++) {
        if (!mongoose.Types.ObjectId.isValid(materia[i])) {
            return res.status(400).json({ msg: `Lo sentimos, el id de la materia en la posición ${i} no es válido` });
        }
    }

    //validar si el codigo ya se encuentra registrado
    const validarCodigo = await matriculas.findOne({ codigo })
    if (validarCodigo) return res.status(404).json({ msg: "Lo sentimos, el código ya se encuentra registrado" })



    //validar si en las matriculas el estudiante ya tiene reserva
    const validarEstudiante = await matriculas.findOne({ estudiante })
    if (validarEstudiante) return res.status(404).json({ msg: "Lo sentimos, el estudiante ya está matriculado" })


    // Verificar si el estudiante existe
    const buscarEstudiante = await estudiantes.findById(estudiante)
    if (!buscarEstudiante) return res.status(404).json({ msg: 'estudiante no Seleccionado' })


    // Verificar si la materia existe
    const BuscarMateria = await materias.findById(materia);
    if (!BuscarMateria) return res.status(404).json({ msg: 'Materia no Seleccionado' })

    const nuevaMatricula = new matriculas(req.body);
    await nuevaMatricula.save()

    res.status(201).json({ msg: "Matricula Creada con éxito" });

}

//Detalle matricula

const detalleMatriculaController = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: "Lo sentimos, el id no es válido" })

    const buscarMatricula = await matriculas.findById(id)
    if (!buscarMatricula) return res.status(404).json({ msg: "Lo sentimos, la matricula no existe" })

    const matriculaConDetalles = await matriculas.findById(id)
        .populate('estudiante', 'nombre apellido cedula ciudad direccion telefono') // Obtener los detalles del estudiante
        .populate('materia', 'nombre creditos codigo descripcion'); // Obtener los detalles de la materia

    res.status(200).json({ msg: "Detalle de Matricula", matriculaConDetalles })
}

//Listar las matriculas

const listarMatriculasController = async (req, res) => {
    try {
        // Obtener todas las matriculas
        const todosLasMatriculas = await matriculas.find().populate('estudiante', 'nombre apellido').populate('materia', 'nombre creditos codigo').select("-createdAt -updatedAt -__v");


        // Verificar si hay matriculas
        if (todosLasMatriculas.length === 0) {
            return res.status(404).json({ msg: "No se encontraron matriculas" });
        }

        // Enviar respuesta con todos los estudiantes
        res.status(200).json(todosLasMatriculas);
    } catch (err) {
        // Manejo de errores
        console.error('Error al listar matriculas:', err);
        res.status(500).json({ msg: "Hubo un error al listar las matriculas" });
    }
};

//Actualizar matricula 

const actualizarMatriculaController = async (req, res) => {
    const { id } = req.params
    const { materia, ...otrosParametros } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: "Lo sentimos, el id de la matricula no es válido" })

    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Por favor, completa todos los campos" })

    const buscarMatricula = await matriculas.findByIdAndUpdate(id, req.body)
    if (!buscarMatricula) return res.status(404).json({ msg: "Lo sentimos, la matricula no existe" })

    // Verificar si el array de materias tiene al menos una materia
    if (!Array.isArray(materia) || materia.length === 0) 
        return res.status(400).json({ msg: "Por favor, agrega al menos una materia a la matricula" });


    // Verificar si `materia` es un array
    if (!Array.isArray(materia)) {
        return res.status(400).json({ msg: "Lo sentimos, las materias deben estar en un array" });
    }

    // Verificar cada ID de materias en el array
    for (let i = 0; i < materia.length; i++) {
        if (!mongoose.Types.ObjectId.isValid(materia[i])) {
            return res.status(400).json({ msg: `Lo sentimos, el id de la materia en la posición ${i} no es válido` });
        }
    }

    // Verificar si hay duplicados en el array de materias
    const materiasUnicos = [...new Set(materia)]; // crear un arreglo con id unicos

    //compara la longitud de los arreglos
    if (materiasUnicos.length !== materia.length) {
        return res.status(400).json({ msg: "Lo sentimos, no puedes incluir materias duplicadas en la matricula" });
    }

    // Guardar la matricula actualizada
    await buscarMatricula.save();

    res.status(200).json({ msg: "Matricula actualizada con éxito" })

}

//Eliminar matricula

const eliminarMatriculaController = async (req, res) => {

    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: "Lo sentimos, el id no es válido" })

    const buscarMatricula = await matriculas.findByIdAndDelete(id)
    if (!buscarMatricula) return res.status(404).json({ msg: "Lo sentimos, la matricula no existe" })

    res.status(200).json({ msg: "Matricula eliminada con éxito" })
}

export {
    crearMatriculaController,
    detalleMatriculaController,
    listarMatriculasController,
    actualizarMatriculaController,
    eliminarMatriculaController
}