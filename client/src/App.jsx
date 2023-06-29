import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import HomePage from './pages/HomePage'
import Layout from './Layout'
import Register from './pages/Register'
import axios from 'axios'
import { UserContextProvider } from '../UserContext'

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App
