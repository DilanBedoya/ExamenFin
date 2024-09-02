import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './paginas/Login';
import Dashboard from './paginas/Dashboard';
//clientes
import EstudiantesPage from './paginas/estudiantes/Estudiantes';
import ActualizarEstudiante from './paginas/estudiantes/ActualizarEstudiante';
import DetalleEstudiante from './paginas/estudiantes/DetalleEstudiante';

//vehiculos
import MateriasPage from './paginas/materias/Materias';
import ActualizarMateria from './paginas/materias/ActualizarMateria';
import DetalleMateria from './paginas/materias/DetalleMateria';

//Reservas
import ReservasPage from './paginas/reservas/Reservas';
import ActualizarReservas from './paginas/reservas/ActualizarylistarReserva';



import { NotFound } from './paginas/NotFound';
import { PrivateRoute } from './routes/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        //publicas
        <Route index element={<Login />} />
        <Route path='*' element={<NotFound />} />

        //privadas
        <Route path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/clientes"
          element={
            <PrivateRoute>
              <EstudiantesPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/actualizar/cliente/:clienteId"
          element={
            <PrivateRoute>
              <ActualizarEstudiante />
            </PrivateRoute>
          }
        />

        <Route
          path="/detalle/cliente/:clienteId"
          element={
            <PrivateRoute>
              <DetalleEstudiante />
            </PrivateRoute>
          }
        />


        <Route
          path="/vehiculos"
          element={
            <PrivateRoute>
              <MateriasPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/actualizar/vehiculo/:vehiculoId"
          element={
            <PrivateRoute>
              <ActualizarMateria />
            </PrivateRoute>
          }
        />

        <Route
          path="/detalle/vehiculo/:vehiculoId"
          element={
            <PrivateRoute>
              <DetalleMateria />
            </PrivateRoute>
          }
        />

        <Route
          path="/reservas"
          element={
            <PrivateRoute>
              <ReservasPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/actualizar/reserva/:reservaId"
          element={
            <PrivateRoute>
              <ActualizarReservas />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}