import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdNoteAdd, MdInfo, MdDeleteForever, MdAdd, MdBackHand, MdRestaurant, MdBackspace, MdBackup, MdAssignmentReturn, Md9KPlus } from 'react-icons/md';
import axios from 'axios';
import { useUser } from "../../context/UserContext.jsx";
import Swal from 'sweetalert2';



const Estudiantes = () => {
    const { user } = useUser();
    const [estudiantes, setEstudiantes] = useState([])
    const navigate = useNavigate();

    const listarClientes = async () => {
        try {
            const token = localStorage.getItem("authToken")
            const url = `${import.meta.env.VITE_BACKEND_URL}/estudiantes/listar-estudiante`
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            console.log(respuesta.data);
            setEstudiantes(respuesta.data)
        } catch (error) {
            console.log(error);
        }
    }

    const [showForm, setShowForm] = useState(false);
    const [newCliente, setNewCliente] = useState({
        nombre: '',
        apellido: '',
        cedula: '',
        fecha_nacimiento: '',
        ciudad: '',
        direccion: '',
        telefono: '',
        email: '',
    });
    const handleCreateCliente = () => {
        setShowForm(true);
    };

    const handleReturnDashboard = () => {
        navigate('/dashboard')
    };


    //crear estudiantes
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("authToken")
            const url = `${import.meta.env.VITE_BACKEND_URL}/estudiantes/crear-estudiante`;
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }

            const respuesta = await axios.post(url, newCliente, { headers });
            console.log(respuesta.data);
            console.log("Creado exitosamente");
            listarClientes()
            setShowForm(false)
            setNewCliente([])
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: respuesta.data.msg,
                confirmButtonText: 'OK',
                confirmButtonColor: '#3085d6'
            });
        } catch (error) {
            console.log(error);
            const errorMessage = error.response?.data.msg || 'Ocurrió un error';
            console.log(errorMessage);
            // Muestra el mensaje de error del backend usando SweetAlert2
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
                confirmButtonText: 'OK',
                confirmButtonColor: '#3085d6'
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCliente({
            ...newCliente,
            [name]: value
        });
    };






    //eliminar estudiante
    const handleDelete = async (id) => {

        try {
            const confirmar = confirm("¿Estás seguro de eliminar este estudiante?")
            if (confirmar) {
                const token = localStorage.getItem("authToken")

                const url = `${import.meta.env.VITE_BACKEND_URL}/estudiantes/eliminar-estudiante/${id}`;
                const headers = {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
                const respuesta = await axios.delete(url, { headers });
                console.log(respuesta.data);
                console.log("eliminado exitosamente");
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: respuesta.data.msg,
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#3085d6'
                });
                listarClientes()
            }

        } catch (error) {
            console.log(error);
            // Muestra el mensaje de error del backend usando SweetAlert2
            const errorMessage = error.response?.data.msg || 'Ocurrió un error';
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
                confirmButtonText: 'OK',
                confirmButtonColor: '#3085d6'
            });
        }
    };


    useEffect(() => {
        listarClientes()
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Bienvenido - {localStorage.getItem('name')}</h1>

            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Lista de Estudiantes</h2>


            {/* Botón para crear estudiante */}
            <div className="mb-6 flex justify-between">
                <button
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg"
                    onClick={handleCreateCliente}
                >
                    <MdAdd className="inline-block mr-2" />
                    Crear Estudiante
                </button>
                {/* Botón para volver al dashboard */}

                <button
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg"
                    onClick={handleReturnDashboard}
                >
                    <MdAssignmentReturn className="inline-block mr-2" />
                    Volver
                </button>
            </div>

            {/* Formulario para crear cliente */}
            {showForm && (
                <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">Nuevo Estudiante</h3>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="nombre">
                            Nombre
                        </label>
                        <input
                            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="nombre"
                            name="nombre"
                            type="text"
                            value={newCliente.nombre}
                            onChange={handleInputChange}
                            placeholder="Nombre del cliente"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="apellido">
                            Apellido
                        </label>
                        <input
                            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="apellido"
                            name="apellido"
                            type="text"
                            value={newCliente.apellido}
                            onChange={handleInputChange}
                            placeholder="Apellido del cliente"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="cedula">
                            Cédula
                        </label>
                        <input
                            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="cedula"
                            name="cedula"
                            type="number"
                            value={newCliente.cedula}
                            onChange={handleInputChange}
                            placeholder="Número de cédula"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="fechaNacimiento">
                            Fecha de Nacimiento
                        </label>
                        <input
                            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="fecha_nacimiento"
                            name="fecha_nacimiento"
                            type="date"
                            value={newCliente.fecha_nacimiento}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="ciudad">
                            Ciudad
                        </label>
                        <input
                            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="ciudad"
                            name="ciudad"
                            type="text"
                            value={newCliente.ciudad}
                            onChange={handleInputChange}
                            placeholder="Ciudad del cliente"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="direccion">
                            Dirección
                        </label>
                        <input
                            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="direccion"
                            name="direccion"
                            type="text"
                            value={newCliente.direccion}
                            onChange={handleInputChange}
                            placeholder="Dirección del cliente"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="telefono">
                            Teléfono
                        </label>
                        <input
                            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="telefono"
                            name="telefono"
                            type="number"
                            value={newCliente.telefono}
                            onChange={handleInputChange}
                            placeholder="Número de teléfono"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="email"
                            name="email"
                            type="email"
                            value={newCliente.email}
                            onChange={handleInputChange}
                            placeholder="correo@ejemplo.com"
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                        >
                            Guardar Estudiante
                        </button>
                        <button
                            type="button"
                            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg"
                            onClick={() => setShowForm(false)}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            )}

            {/* Tabla de estudiantes */}
            {estudiantes.length === 0 ? (
                <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg text-center">
                    No existen registros
                </div>
            ) : (
                <table className="w-full bg-white shadow-lg rounded-lg mt-6">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="p-3">N°</th>
                            <th className="p-3">Nombre</th>
                            <th className="p-3">Apellido</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Ciudad</th>
                            <th className="p-3">Dirección</th>
                            <th className="p-3">Teléfono</th>
                            <th className="p-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {estudiantes.map((estudiante, index) => (
                            <tr key={estudiante._id}>
                                <td className="p-3 text-center">{index + 1}</td>
                                <td className="p-3 text-center">{estudiante.nombre}</td>
                                <td className="p-3 text-center">{estudiante.apellido}</td>

                                <td className="p-3 text-center">{estudiante.email}</td>
                                <td className="p-3 text-center" >{estudiante.ciudad}</td>
                                <td className="p-3 text-center">{estudiante.direccion}</td>
                                <td className="p-3 text-center">{estudiante.telefono}</td>

                                <td className="p-3 text-center">
                                    <button
                                        className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-lg mx-1"
                                        onClick={() => navigate(`/actualizar/cliente/${estudiante._id}`)}
                                    >
                                        <MdNoteAdd />
                                    </button>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg mx-1"
                                        onClick={() => navigate(`/detalle/cliente/${estudiante._id}`)}
                                    >
                                        <MdInfo />
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg mx-1"
                                        onClick={() => handleDelete(estudiante._id)}
                                    >
                                        <MdDeleteForever />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Estudiantes;
