
import mongoose from "mongoose"
import materias from "../models/materias.js"
import matriculas from "../models/Matriculas.js"

//Crear materias
const crearMateriaController = async (req, res) => {
    //especificar en año de fabricacion : año
    const { nombre, creditos, codigo, descripcion } = req.body
    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Por favor, completa todos los campos" })

    // Validar que todos los campos estén presentes y no vacíos
    if (!nombre || !creditos || !codigo || !descripcion) {
        return res.status(400).json({ msg: "Por favor, completa todos los campos" });
    }

    // Validar que los campos que deben ser numéricos efectivamente lo sean
    if (isNaN(codigo)) {
        return res.status(400).json({ msg: "código debe ser valores numéricos" });
    }

    const validarCodigo = await materias.findOne({ codigo })
    if (validarCodigo) return res.status(404).json({ msg: "Lo sentimos, el código de la materia ya se encuentra registrado" })

    const nuevaMateria = new materias(req.body)
    await nuevaMateria?.save()


    res.status(200).json({ msg: "materia creada con éxito", nuevaMateria })
}


//Detalle materia

const detalleMateriaController = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: "Lo sentimos, el id no es válido" })

    const buscarMateria = await materias.findById(id)
    if (!buscarMateria) return res.status(404).json({ msg: "Lo sentimos, la materia no existe" })

    res.status(200).json(buscarMateria)
}

//Listar las materias

const listarMateriasController = async (req, res) => {
    try {
        // Obtener todas los materias
        const todasLasMaterias = await materias.find().select("-createdAt -updatedAt -__v");


        // Verificar si hay materias
        if (todasLasMaterias.length === 0) {
            return res.status(404).json({ msg: "No se encontraron materias" });
        }

        // Enviar respuesta con todos las materias
        res.status(200).json(todasLasMaterias);
    } catch (err) {
        // Manejo de errores
        console.error('Error al listar materias:', err);
        res.status(500).json({ msg: "Hubo un error al listar las materias" });
    }
};

//Actualizar materias 

const actualizarMateriasController = async (req, res) => {
    const { id } = req.params
    const { codigo } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: "Lo sentimos, el id no es válido" })
    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Por favor, completa todos los campos" })

    // Validar que los campos que deben ser numéricos efectivamente lo sean
    if (isNaN(codigo)) {
        return res.status(400).json({ msg: "codigo debe ser valores numéricos" });
    }

    const buscarMateria = await materias.findByIdAndUpdate(id, req.body)
    if (!buscarMateria) return res.status(404).json({ msg: "Lo sentimos, la materia no existe" })

    res.status(200).json({ msg: "Materia actualizada con éxito" })

}

//Eliminar materia

const eliminarMateriaController = async (req, res) => {

    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: "Lo sentimos, el id no es válido" })

    const buscarMateria = await materias.findById(id)
    if (!buscarMateria) return res.status(404).json({ msg: "Lo sentimos, la materia no existe" })

    // Verificar si ma materia tiene matriculas asociadas
    const matriculaExistente = await matriculas.findOne({ 'materia': id });
    if (matriculaExistente) return res.status(400).json({ msg: "No se puede eliminar la materia porque tiene matricula asociada" });

    // Eliminar a la materia
    await materias.findByIdAndDelete(id);

    res.status(200).json({ msg: "Materia eliminado con éxito" })
}


export {
    crearMateriaController,
    detalleMateriaController,
    listarMateriasController,
    actualizarMateriasController,
    eliminarMateriaController
}
