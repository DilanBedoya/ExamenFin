import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";
import { MdAdd, MdAssignmentReturn, MdBook, MdBookmark, MdBookmarkAdd, MdCarRental, MdCarRepair, MdDeleteForever, MdInfo, MdLogout, MdNoteAdd, MdPerson, MdPersonAdd } from 'react-icons/md';
const Dashboard = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("authToken");
    localStorage.removeItem("name");

    navigate("/");
  };

  const handleClient = () => {
    navigate("/clientes");
  };

  const handleVehicles = () => {
    navigate("/vehiculos");
  };

  const handleReservations = () => {
    navigate("/reservas");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-300 to-gray-500"
    >

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">
          GESTIÓN DE MATRICULAS
        </h1>
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">

          <MdPerson className="inline-block mr-2 text"></MdPerson>
          Bienvenido - {localStorage.getItem('name')}
        </h1>

        <div className="flex flex-col space-y-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg w-full"
            onClick={handleClient}
          >
            <MdPersonAdd className="inline-block mr-2 text-2xl"></MdPersonAdd>
            Estudiantes
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg w-full"
            onClick={handleVehicles}
          >
            <MdBook className="inline-block mr-2 text-2xl"></MdBook>
            Materias

          </button>
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg w-full"
            onClick={handleReservations}
          >
            <MdBookmarkAdd className="inline-block mr-2 text-2xl"></MdBookmarkAdd>

            Matriculas
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg w-full"
            onClick={handleLogout}
          >
            <MdLogout className="inline-block mr-2 text-2xl"></MdLogout>

            Cerrar Sesión
          </button>
        </div>
        
      </div>
      
    </div>
  );
};

export default Dashboard;
