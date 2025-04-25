import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './context/Auth';
import Nav from './components/Nav';
import Products from './pages/Products';
import CreateProduct from './pages/Create';
import UpdateProduct from './pages/Update';
import Users from './pages/Users';
import CreateUser from './pages/CreateUser';

function App() {
  const { user } = useAuth();
  
  return (
    <div className='flex md:flex-row flex-col gap-8'>
      <Nav />

      <div className='h-[100vh] w-[100%] overflow-y-scroll'>
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/products"
            element={
                <PrivateRoute>
                  <Products />
                </PrivateRoute>
            }
          />
          <Route
            path="/create"
            element={
                <PrivateRoute>
                  <CreateProduct />
                </PrivateRoute>
            }
          />
          <Route
            path="/createuser"
            element={
                <PrivateRoute>
                  <CreateUser />
                </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
                <PrivateRoute>
                  <Users />
                </PrivateRoute>
            }
          />
          <Route
            path="/update/:id"
            element={
                <PrivateRoute>
                  <UpdateProduct />
                </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;