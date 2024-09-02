import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { MdNoteAdd, MdInfo, MdDeleteForever, MdAdd, MdBackHand, MdRestaurant, MdBackspace, MdBackup, MdAssignmentReturn } from 'react-icons/md';
import Swal from 'sweetalert2';

const ActualizarCliente = () => {
    const { clienteId } = useParams(); // Obtén el ID del cliente de la URL
    const [cliente, setCliente] = useState(null);
    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        cedula: '',
        fecha_nacimiento: '',
        ciudad: '',
        direccion: '',
        telefono: '',
        email: ''
    });
    const navigate = useNavigate();

    const handleReturnClient = () => {
        navigate('/clientes')
    };

    useEffect(() => {
        const fetchCliente = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const url = `${import.meta.env.VITE_BACKEND_URL}/estudiantes/detalle-estudiante/${clienteId}`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                };
                const respuesta = await axios.get(url, options);
                setCliente(respuesta.data);
                setForm({
                    nombre: respuesta.data.nombre,
                    apellido: respuesta.data.apellido,
                    cedula: respuesta.data.cedula,
                    fecha_nacimiento: respuesta.data.fecha_nacimiento.split('T')[0], // Solo la fecha
                    ciudad: respuesta.data.ciudad,
                    direccion: respuesta.data.direccion,
                    telefono: respuesta.data.telefono,
                    email: respuesta.data.email
                });
            } catch (error) {
                console.error('Error al obtener el cliente:', error);
            }
        };
        fetchCliente();
    }, [clienteId]);

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
            const url = `${import.meta.env.VITE_BACKEND_URL}/estudiantes/actualizar-estudiante/${clienteId}`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            const respuesta = await axios.put(url, form, options);
            navigate('/clientes'); // Redirige a la lista de clientes o a otra página
            
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

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Actualizar Estudiante</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                        id="nombre"
                        name="nombre"
                        type="text"
                        value={form.nombre}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">Apellido</label>
                    <input
                        id="apellido"
                        name="apellido"
                        type="text"
                        value={form.apellido}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="cedula" className="block text-sm font-medium text-gray-700">Cédula</label>
                    <input
                        id="cedula"
                        name="cedula"
                        type="number"
                        value={form.cedula}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="fecha_nacimiento" className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
                    <input
                        id="fecha_nacimiento"
                        name="fecha_nacimiento"
                        type="date"
                        value={form.fecha_nacimiento}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700">Ciudad</label>
                    <input
                        id="ciudad"
                        name="ciudad"
                        type="text"
                        value={form.ciudad}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">Dirección</label>
                    <input
                        id="direccion"
                        name="direccion"
                        type="text"
                        value={form.direccion}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
                    <input
                        id="telefono"
                        name="telefono"
                        type="number"
                        value={form.telefono}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div className="mb-6 flex justify-between">

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Guardar Cambios
                    </button>

                    {/* Botón para volver a los clientes */}

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

export default ActualizarCliente;
