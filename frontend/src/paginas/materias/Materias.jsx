import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAdd, MdAssignmentReturn, MdDeleteForever, MdInfo, MdNoteAdd } from 'react-icons/md';
import axios from 'axios';
import Swal from 'sweetalert2';

const Vehiculos = () => {
    const [vehiculos, setVehiculos] = useState([]);
    const navigate = useNavigate();

    const listarVehiculos = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const url = `${import.meta.env.VITE_BACKEND_URL}/materias/listar-materia`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
            const respuesta = await axios.get(url, options);
            console.log(respuesta.data);
            setVehiculos(respuesta.data);
        } catch (error) {
            console.log(error);
        }
    };

    const [showForm, setShowForm] = useState(false);
    const [newVehiculo, setNewVehiculo] = useState({
        nombre: '',
        creditos: '',
        codigo: '',
        descripcion: ''
    });

    const handleCreateVehiculo = () => {
        setShowForm(true);
    };

    const handleReturnDashboard = () => {
        navigate('/dashboard');
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("authToken");
            const url = `${import.meta.env.VITE_BACKEND_URL}/materias/crear-materia`;
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            };

            const respuesta = await axios.post(url, newVehiculo, { headers });
            console.log(respuesta.data);
            listarVehiculos();
            setShowForm(false);
            setNewVehiculo({
                nombre: '',
                creditos: '',
                codigo: '',
                descripcion: ''
            });
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
        setNewVehiculo({
            ...newVehiculo,
            [name]: value
        });
    };

    const handleDelete = async (id) => {
        try {
            const confirmar = confirm("¿Estás seguro de eliminar esta Materia?");
            if (confirmar) {
                const token = localStorage.getItem("authToken");
                const url = `${import.meta.env.VITE_BACKEND_URL}/materias/eliminar-materia/${id}`;
                const headers = {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                };

                const respuesta = await axios.delete(url, { headers });
                console.log(respuesta.data);
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: respuesta.data.msg,
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#3085d6'
                });
                listarVehiculos();
            }
        } catch (error) {
            console.log(error);
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
        listarVehiculos();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Bienvenido - {localStorage.getItem('name')}</h1>

            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Lista de Materias</h2>

            <div className="mb-6 flex justify-between">
                <button
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg"
                    onClick={handleCreateVehiculo}
                >
                    <MdAdd className="inline-block mr-2" />
                    Crear Materia
                </button>

                <button
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg"
                    onClick={handleReturnDashboard}
                >
                    <MdAssignmentReturn className="inline-block mr-2" />
                    Volver
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">Nuevo Vehículo</h3>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="nombre">
                            Nombre de la Materia
                        </label>
                        <input
                            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="nombre"
                            name="nombre"
                            type="text"
                            value={newVehiculo.nombre}
                            onChange={handleInputChange}
                            placeholder="Nombre de la materia"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="creditos">
                            Créditos
                        </label>
                        <input
                            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="creditos"
                            name="creditos"
                            type="number"
                            value={newVehiculo.creditos}
                            onChange={handleInputChange}
                            placeholder="Créditos"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="codigo">
                            Código
                        </label>
                        <input
                            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="codigo"
                            name="codigo"
                            type="number"
                            value={newVehiculo.codigo}
                            onChange={handleInputChange}
                            placeholder="Código de la Materia"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="descripcion">
                            Descripción
                        </label>
                        <textarea
                            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="descripcion"
                            name="descripcion"
                            value={newVehiculo.descripcion}
                            onChange={handleInputChange}
                            placeholder="Descripción del vehículo"
                        ></textarea>
                    </div>
                    <div className="flex justify-between">

                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg"
                            type="submit"
                        >
                            Guardar Vehículo
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

            {vehiculos.length > 0 ? (
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-6 text-center">N°</th>
                            <th className="py-3 px-6 text-center">Nombre</th>
                            <th className="py-3 px-6 text-center">Créditos</th>
                            <th className="py-3 px-6 text-center">Descripción</th>

                            <th className="py-3 px-6 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehiculos.map((vehiculo, index) => (
                            <tr key={vehiculo._id} className="border-b border-gray-200">
                                <td className="p-3 px-6 text-center">{index + 1}</td>

                                <td className="py-4 px-6 text-center">{vehiculo.nombre}</td>
                                <td className="py-4 px-6 text-center">{vehiculo.creditos}</td>
                                <td className="py-4 px-6 text-center">{vehiculo.descripcion}</td>

                                <td className="py-4 px-6 text-center">

                                    <button
                                        className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-lg mx-1"
                                        onClick={() => navigate(`/actualizar/vehiculo/${vehiculo._id}`)}
                                    >
                                        <MdNoteAdd />
                                    </button>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg mx-1"
                                        onClick={() => navigate(`/detalle/vehiculo/${vehiculo._id}`)}
                                    >
                                        <MdInfo />
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg mx-1"
                                        onClick={() => handleDelete(vehiculo._id)}
                                    >
                                        <MdDeleteForever />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg text-center">
                    No existen registros de Vehiculos
                </div>
            )}
        </div>
    );
};

export default Vehiculos;
