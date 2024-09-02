import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";
import Swal from 'sweetalert2';

export default function Login() {


  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { login } = useUser();
  const token = localStorage.getItem('authToken'); // O el método que uses para obtener el token

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  // estado para manejar la visibilidad de la contraseña
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/usuario/login`;
      const respuesta = await axios.post(url, form);
      console.log(respuesta);
      login(respuesta.data)
      navigate("/dashboard");
      console.log("logueado");
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión correcto',
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-300 to-gray-500"   >
      <div className="flex w-full max-w-6xl bg-white rounded-xl shadow-lg">
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Iniciar Sesión</h2>
          <div className="flex items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/128/4129/4129225.png"
              alt="login image"
              className="rounded-full"
              width={90}
              height={90}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                Correo Electrónico
              </label>
              <input
                className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                id="email"
                type="email"
                name="email"
                value={form.email || ""}
                onChange={handleChange}
                placeholder="correo@ejemplo.com"
              />
            </div>
            <div className="mb-6 relative">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                Contraseña
              </label>
              <input
                className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password || ""}
                onChange={handleChange}
                placeholder="******"
              />
            </div>
            <div className="mb-6 flex items-center">
              <input
                id="showPassword"
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="showPassword" className="ml-2 text-sm text-gray-700">
                Mostrar contraseña
              </label>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                type="submit"
              >
                Ingresar
              </button>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-center w-1/2" style={{ height: '100vh' }}>
          <img
            src="https://img.freepik.com/foto-gratis/grupo-multietnico-jovenes-estudiantes-concentrados_171337-13432.jpg"
            alt="login imagen"
            className="object-cover"
            style={{ width: '600px', height: '100%' }}
          />
        </div>
      </div>
      
    </div>
  );
}