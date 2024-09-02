import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MdAdd, MdAssignmentReturn, MdDeleteForever, MdInfo, MdNoteAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const CrearReserva = () => {
    const [codigo, setCodigo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [estudiante, setCliente] = useState('');
    const [clientes, setClientes] = useState([]);
    const [todosVehiculos, setTodosVehiculos] = useState([]);
    const [vehiculosSeleccionados, setVehiculosSeleccionados] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [reservas, setReservas] = useState([])
    const navigate = useNavigate();

    
    
    //listar reservas
    const fetchReservas = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const url = `${import.meta.env.VITE_BACKEND_URL}/matriculas/listar-matricula`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
            const respuesta = await axios.get(url, options);
            setReservas(respuesta.data);
            console.log(respuesta.data);
        } catch (error) {
            console.log('Error al obtener clientes:', error);
        }
    }

    useEffect(() => {
        fetchReservas()

    }, [])

    useEffect(() => {
        // Obtener lista de clientes
        const fetchClientes = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const url = `${import.meta.env.VITE_BACKEND_URL}/estudiantes/listar-estudiante`;
                const options = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                };
                const respuesta = await axios.get(url, options);
                setClientes(respuesta.data);
            } catch (error) {
                console.log('Error al obtener clientes:', error);
            }
        };

        // Obtener lista de vehículos
        const fetchVehiculos = async () => {
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
                setTodosVehiculos(respuesta.data);
            } catch (error) {
                console.log('Error al obtener vehículos:', error);
            }
        };

        fetchClientes();
        fetchVehiculos();
    }, []);

    const handleAgregarVehiculo = (vehiculoId) => {
        if (!vehiculosSeleccionados.includes(vehiculoId)) {
            setVehiculosSeleccionados([...vehiculosSeleccionados, vehiculoId]);
        }
    };

    const handleEliminarVehiculo = (vehiculoId) => {
        setVehiculosSeleccionados(vehiculosSeleccionados.filter(id => id !== vehiculoId));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("authToken");
            const respuesta = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/matriculas/crear-matricula`, {
                codigo,
                descripcion,
                estudiante,
                materia: vehiculosSeleccionados
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            setShowForm(false)
            fetchReservas()
            console.log(respuesta);
            
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: respuesta.data.msg,
                confirmButtonText: 'OK',
                confirmButtonColor: '#3085d6'
            });
        } catch (error) {
            console.error('Error al crear la matricula:', error);
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

    const handleReturnDashboard = () => {
        navigate('/dashboard')
    }

    const handleCreateReserva = () => {
        setShowForm(true)
    }


    //eliminar reservas
    const handleDelete = async (id) => {

        try {
            const confirmar = confirm("¿Estás seguro de eliminar esta matricula?")
            if (confirmar) {
                const token = localStorage.getItem("authToken")

                const url = `${import.meta.env.VITE_BACKEND_URL}/matriculas/eliminar-matricula/${id}`;
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

                fetchReservas()
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
    }
    return (

        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Bienvenido - {localStorage.getItem('name')}</h1>

            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Lista de Reservas</h2>
            <div className="mb-6 flex justify-between">
                {/*Boton para crear reserva*/}
                <button
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg"
                    onClick={handleCreateReserva}
                >
                    <MdAdd className="inline-block mr-2" />
                    Crear Matricula
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

            {
                showForm && (

                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Crear Matricula</h2>
                        <div className="mb-4">
                            <label htmlFor="codigo" className="block text-sm font-medium text-gray-700">Código</label>
                            <input
                                id="codigo"
                                type="text"
                                value={codigo}
                                onChange={(e) => setCodigo(e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
                            <input
                                id="descripcion"
                                type="text"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="cliente" className="block text-sm font-medium text-gray-700">Cliente</label>
                            <select
                                id="cliente"
                                value={estudiante}
                                onChange={(e) => setCliente(e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                required
                            >
                                <option value="">Selecciona un Estudiante</option>
                                {clientes.map(c => (
                                    <option key={c._id} value={c._id}>{c.nombre + " " + c.apellido}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Materias</label>
                            <div className="flex flex-col">
                                {todosVehiculos.map(v => (
                                    <div key={v._id} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`vehiculo-${v._id}`}
                                            checked={vehiculosSeleccionados.includes(v._id)}
                                            onChange={() => {
                                                if (vehiculosSeleccionados.includes(v._id)) {
                                                    handleEliminarVehiculo(v._id);
                                                } else {
                                                    handleAgregarVehiculo(v._id);
                                                }
                                            }}
                                            className="mr-2"
                                        />
                                        <label htmlFor={`vehiculo-${v._id}`}>{v.nombre}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="vehiculos-seleccionados" className="block text-sm font-medium text-gray-700">Vehículos Seleccionados</label>
                            <input
                                id="vehiculos-seleccionados"
                                type="text"
                                value={vehiculosSeleccionados.map(id => todosVehiculos.find(v => v._id === id)?.nombre).join(', ')}
                                readOnly
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100"
                            />
                        </div>
                        <div className='flex justify-between'>
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"

                            >
                                Crear Matricula
                            </button>
                            <button
                                type="button"
                                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg"
                                onClick={() => { setShowForm(false) }}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                )
            }

            {reservas.length === 0 ? (
                <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg text-center">
                    No existen registros
                </div>
            ) : (
                <table className="w-full bg-white shadow-lg rounded-lg mt-6">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="p-3">N°</th>
                            <th className="p-3">Descripción</th>
                            <th className="p-3">Estudiante</th>
                            <th className="p-3">Materia Matriculado</th>
                            <th className="p-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservas.map((reservas, index) => (
                            <tr key={reservas._id}>
                                <td className="p-3 text-center">{index + 1}</td>
                                <td className="p-3 text-center">{reservas.descripcion}</td>
                                <td className="p-3 text-center">{reservas.estudiante.nombre + " " + reservas.estudiante.apellido}</td>
                                <td className="p-3 text-center">{reservas.materia.map((v, index) => (<div key={index}>{v.nombre }</div>))}</td>
                                <td className="p-3 text-center">
                                    {/* <button
                                        className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-lg mx-1"
                                        onClick={() => navigate(`/actualizar/reserva/${reservas._id}`)}
                                    >
                                        <MdNoteAdd />
                                    </button> */}
                                   
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg mx-1"
                                        onClick={() => handleDelete(reservas._id)}
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

export default CrearReserva;
