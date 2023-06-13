import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import HomePage from './pages/HomePage'

const App = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='/login' element={<Login />} />
    </Routes>

  )
}

export default App
