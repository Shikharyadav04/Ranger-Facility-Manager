import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import PrivateRoutes from './routes/PrivateRoutes';
import RoleBasedRoutes from './routes/RoleBasedRoutes';
import Login from './pages/auth/Login';
import Singup from './pages/auth/Singup';

import { useAuth } from './context/authContext';

import AdminDashboard from './pages/admin/AdminDashboard';
import EngineerDashboard from './pages/engineer/EngineerDashBoard';
import RangerDashboard from './pages/ranger/RangerDashboard';


function App() {

  const {user} = useAuth();

  return (
    <BrowserRouter>
      <Routes>


        {/*Default redirecting based on role */}
        <Route 
          path="/" 
          element={
            user 
              ? <Navigate to={`/${user.role}/dashboard`} /> 
              : <Navigate to="/login" />
          }
        />

        <Route path = '/login' element = {<Login />} ></Route>
        <Route path = '/ranger/register' element = {<Singup />}></Route>


        <Route path = '/admin/dashboard' element = {
          <PrivateRoutes>
            <RoleBasedRoutes requiredRole={["admin"]} >
              <AdminDashboard />
            </RoleBasedRoutes>
          </PrivateRoutes>
        }>
          {/* ALL ROUTEs OF /admin/dashboard/?? */}
        </Route>


        <Route path = '/engineer/dashboard' element = {
          <PrivateRoutes>
            <RoleBasedRoutes requiredRole={["engineer", "admin"]}>
              <EngineerDashboard />
            </RoleBasedRoutes>
          </PrivateRoutes>
        }>
          {/* ALL ROUTEs OF /engineer/dashboard/?? */}
        </Route>


        <Route path = '/ranger/dashboard' element = {
          <PrivateRoutes>
            <RoleBasedRoutes requiredRole={["ranger"]}>
              <RangerDashboard />
            </RoleBasedRoutes>
          </PrivateRoutes>
        }>
          {/* ALL ROUTEs OF /ranger/dashboard/?? */}
        </Route>


      </Routes>
    </BrowserRouter>
  )
}

export default App
