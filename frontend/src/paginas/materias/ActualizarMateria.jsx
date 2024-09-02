import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { MdAssignmentReturn } from 'react-icons/md';
import Swal from 'sweetalert2';

const ActualizarVehiculo = () => {
    const { vehiculoId } = useParams(); // Obtén el ID del vehículo de la URL
    const [vehiculo, setVehiculo] = useState(null);
    const [form, setForm] = useState({
        nombre: '',
        creditos: '',
        codigo: '',
        descripcion: ''
    });
    const navigate = useNavigate();

    const handleReturnVehiculo = () => {
        navigate('/vehiculos');
    };

    useEffect(() => {
        const fetchVehiculo = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const url = `${import.meta.env.VITE_BACKEND_URL}/materias/detalle-materia/${vehiculoId}`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                };
                const respuesta = await axios.get(url, options);
                setVehiculo(respuesta.data);
                setForm({
                    nombre: respuesta.data.nombre,
                    creditos: respuesta.data.creditos,
                    codigo: respuesta.data.codigo,
                    descripcion: respuesta.data.descripcion
                });
            } catch (error) {
                console.error('Error al obtener la materia:', error);
            }
        };
        fetchVehiculo();
    }, [vehiculoId]);

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
            const url = `${import.meta.env.VITE_BACKEND_URL}/materias/actualizar-materia/${vehiculoId}`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            const respuesta = await axios.put(url, form, options);
            navigate('/vehiculos'); // Redirige a la lista de vehículos o a otra página

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
            <h2 className="text-2xl font-bold mb-4">Actualizar Materia</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre de la Materia</label>
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
                    <label htmlFor="creditos" className="block text-sm font-medium text-gray-700">Créditos</label>
                    <input
                        id="creditos"
                        name="creditos"
                        type="number"
                        value={form.creditos}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="codigo" className="block text-sm font-medium text-gray-700">Código</label>
                    <input
                        id="codigo"
                        name="codigo"
                        type="number"
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

                <div className="mb-6 flex justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Guardar Cambios
                    </button>

                    {/* Botón para volver a los vehículos */}
                    <button
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg"
                        onClick={handleReturnVehiculo}
                    >
                        <MdAssignmentReturn className="inline-block mr-2" />
                        Volver
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ActualizarVehiculo;
