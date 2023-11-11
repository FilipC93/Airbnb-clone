import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import axios from 'axios'
import { UserContextProvider } from '../UserContext'
import Login from './pages/Login'
import HomePage from './pages/HomePage'
import Register from './pages/Register'
import AccountPage from './pages/Account'
import PlacesPage from './pages/PlacesPage'
import PlacesFormPage from './pages/PlacesFormPage'
import SinglePlacePage from './pages/SinglePlacePage'
import Bookings from './pages/Bookings'
import SingleBooking from './pages/SingleBooking'

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
          <Route path='/account' element={<AccountPage />} />
          <Route path='account/bookings' element={<Bookings />} />
          <Route path='account/booking/:id' element={<SingleBooking />} />
          <Route path='/account/places' element={<PlacesPage />} />
          <Route path='/account/places/new' element={<PlacesFormPage />} />
          <Route path='/account/places/:id' element={<PlacesFormPage />} />
          <Route path='/place/:id' element={<SinglePlacePage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App
