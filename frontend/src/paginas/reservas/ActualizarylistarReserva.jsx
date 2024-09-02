import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { MdAssignmentReturn } from 'react-icons/md';
import Swal from 'sweetalert2';

const ActualizarReserva = () => {
    const { reservaId } = useParams();
    const [reserva, setReserva] = useState(null);
    const [todosVehiculos, setTodosVehiculos] = useState([]);
    const [vehiculosSeleccionados, setVehiculosSeleccionados] = useState([]);

    const [form, setForm] = useState({
        codigo: '',
        descripcion: '',
        estudiante: '',
        matricula: [],
    });
    const navigate = useNavigate();

    console.log(form);

    const handleReturnClient = () => {
        navigate('/reservas');
    };

    // Obtener lista de vehículos
    const fetchVehiculos = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const url = `${import.meta.env.VITE_BACKEND_URL}/vehiculos/listar-vehiculos`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
            const respuesta = await axios.get(url, options);
            setTodosVehiculos(respuesta.data); // Establecer el estado correcto
        } catch (error) {
            console.log('Error al obtener vehículos:', error);
        }
    };

    const handleAgregarVehiculo = (vehiculoId) => {
        if (!vehiculosSeleccionados.includes(vehiculoId)) {
            const nuevosVehiculosSeleccionados = [...vehiculosSeleccionados, vehiculoId];
            setVehiculosSeleccionados(nuevosVehiculosSeleccionados);
            setForm(prevForm => ({
                ...prevForm,
                vehiculo: nuevosVehiculosSeleccionados
            }));
        }
    };

    const handleEliminarVehiculo = (vehiculoId) => {
        const nuevosVehiculosSeleccionados = vehiculosSeleccionados.filter(id => id !== vehiculoId);
        setVehiculosSeleccionados(nuevosVehiculosSeleccionados);
        setForm(prevForm => ({
            ...prevForm,
            vehiculo: nuevosVehiculosSeleccionados
        }));
    };

    useEffect(() => {
        const fetchReserva = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const url = `${import.meta.env.VITE_BACKEND_URL}/reservas/detalle-reserva/${reservaId}`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                };
                const respuesta = await axios.get(url, options);
                setReserva(respuesta.data);
                const reservaDetalles = respuesta.data.reservaConDetalles;

                setForm({
                    codigo: reservaDetalles.codigo,
                    descripcion: reservaDetalles.descripcion,
                    estudiante: reservaDetalles.estudiante._id, // Cambiado a ID del cliente
                    materia: reservaDetalles.materia.map(v => v._id) || [], // Inicializa con IDs de vehículos
                });

                setVehiculosSeleccionados(reservaDetalles.vehiculo.map(v => v._id) || []); // Inicializa vehiculosSeleccionados
            } catch (error) {
                console.error('Error al obtener la reserva:', error);
            }
        };
        fetchReserva();
        fetchVehiculos();
    }, [reservaId]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('authToken');
            const url = `${import.meta.env.VITE_BACKEND_URL}/reservas/actualizar-reserva/${reservaId}`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            console.log(form);
            const respuesta = await axios.put(url, form, options);
            navigate('/reservas'); // Redirige a la lista de reservas o a otra página

            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: respuesta.data.msg,
                confirmButtonText: 'OK',
                confirmButtonColor: '#3085d6'
            });
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data.msg || 'Ocurrió un error';
            console.log(errorMessage);
            
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
                confirmButtonText: 'OK',
                confirmButtonColor: '#3085d6'
            });
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Actualizar Reserva</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="cliente" className="block text-sm font-medium text-gray-700"><strong>Cliente</strong></label>
                    <p><strong>{form.cliente}</strong></p> 
                </div>
                <div className="mb-4">
                    <label htmlFor="codigo" className="block text-sm font-medium text-gray-700">Código</label>
                    <input
                        id="codigo"
                        name="codigo"
                        type="text"
                        value={form.codigo}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
                    <input
                        id="descripcion"
                        name="descripcion"
                        type="text"
                        value={form.descripcion}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Vehículos</label>
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
                                <label htmlFor={`vehiculo-${v._id}`}>{v.marca + " " + v.modelo}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="vehiculos-seleccionados" className="block text-sm font-medium text-gray-700">Vehículos Seleccionados</label>
                    <input
                        id="vehiculos-seleccionados"
                        type="text"
                        value={vehiculosSeleccionados.map(id => todosVehiculos.find(v => v._id === id)?.descripcion).join(', ')}
                        readOnly
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100"
                    />
                </div>

                <div className="mb-6 flex justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Guardar Cambios
                    </button>
                    <button
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg"
                        onClick={handleReturnClient}
                    >
                        <MdAssignmentReturn className="inline-block mr-2" />
                        Volver
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ActualizarReserva;
