import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { MdAssignmentReturn } from 'react-icons/md';
import Swal from 'sweetalert2';

const VerCliente = () => {
    const { clienteId } = useParams(); // Obtén el ID del cliente de la URL
    const [cliente, setCliente] = useState(null);
    const navigate = useNavigate();

    const handleReturnClient = () => {
        navigate('/clientes');
    };

    const DetalleCliente = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const url = `${import.meta.env.VITE_BACKEND_URL}/estudiantes/detalle-estudiante/${clienteId}`;
            
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            console.log('Fetching data with options:', options); 
            const respuesta = await axios.get(url, options);
            console.log('Response:', respuesta.data); 
            setCliente(respuesta.data);
        } catch (error) {
            console.error('Error al obtener el cliente:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.msg || 'Ocurrió un error al obtener los datos del cliente',
                confirmButtonText: 'OK',
                confirmButtonColor: '#3085d6'
            });
        }
    };


    useEffect(() => {
        if (clienteId) {
            DetalleCliente();
        } else {
            console.error('No se encontró clienteId');
        }
    }, [clienteId]);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Detalles del Estudiante</h2>
            {cliente ? (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <p><strong>Nombre:</strong> {cliente.nombre}</p>
                    <p><strong>Apellido:</strong> {cliente.apellido}</p>
                    <p><strong>Cédula:</strong> {cliente.cedula}</p>
                    <p><strong>Fecha de Nacimiento:</strong> {cliente.fecha_nacimiento.split('T')[0]}</p>
                    <p><strong>Ciudad:</strong> {cliente.ciudad}</p>
                    <p><strong>Dirección:</strong> {cliente.direccion}</p>
                    <p><strong>Teléfono:</strong> {cliente.telefono}</p>
                    <p><strong>Email:</strong> {cliente.email}</p>
                </div>
            ) : (
                <p>Cargando datos del cliente...</p>
            )}

            {/* Botón para volver a los clientes */}
            <div className="mt-4">
                <button
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg"
                    onClick={handleReturnClient}
                >
                    <MdAssignmentReturn className="inline-block mr-2" />
                    Volver
                </button>
            </div>
        </div>
    );
};

export default VerCliente;
