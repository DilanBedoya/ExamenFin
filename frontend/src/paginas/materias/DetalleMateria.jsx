import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { MdAssignmentReturn } from 'react-icons/md';
import Swal from 'sweetalert2';

const VerVehiculo = () => {
    const { vehiculoId } = useParams(); // Obtén el ID del vehículo de la URL
    const [vehiculo, setVehiculo] = useState(null);
    const navigate = useNavigate();

    const handleReturnVehicle = () => {
        navigate('/vehiculos'); // Redirige a la lista de vehículos
    };

    const DetalleVehiculo = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const url = `${import.meta.env.VITE_BACKEND_URL}/materias/detalle-materia/${vehiculoId}`;
            
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            console.log('Fetching data with options:', options); 
            const respuesta = await axios.get(url, options);
            console.log('Response:', respuesta.data); 
            setVehiculo(respuesta.data);
        } catch (error) {
            console.error('Error al obtener el vehículo:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.msg || 'Ocurrió un error al obtener los datos del vehículo',
                confirmButtonText: 'OK',
                confirmButtonColor: '#3085d6'
            });
        }
    };

    useEffect(() => {
        if (vehiculoId) {
            DetalleVehiculo();
        } else {
            console.error('No se encontró vehiculoId');
        }
    }, [vehiculoId]);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Detalle de la Materia</h2>
            {vehiculo ? (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <p><strong>Nombre:</strong> {vehiculo.nombre}</p>
                    <p><strong>Créditos:</strong> {vehiculo.creditos}</p>
                    <p><strong>Código:</strong> {vehiculo.codigo}</p>
                    <p><strong>Descripción:</strong> {vehiculo.descripcion}</p>
                </div>
            ) : (
                <p>Cargando datos del vehículo...</p>
            )}

            {/* Botón para volver a la lista de vehículos */}
            <div className="mt-4">
                <button
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg"
                    onClick={handleReturnVehicle}
                >
                    <MdAssignmentReturn className="inline-block mr-2" />
                    Volver
                </button>
            </div>
        </div>
    );
};

export default VerVehiculo;
