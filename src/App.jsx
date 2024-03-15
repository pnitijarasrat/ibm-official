import Nav from './Nav/Nav'
import Home from './Home/Home'
import SignIn from './Authenticate/SignIn'
import Recruit from './Recruit/Recruit'
import AuthProvider from './Authenticate/AuthProvider'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import PrivateRoute from './Authenticate/PrivateRoute'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Nav />
        <Routes>
          <Route path='/sign-in' element={<SignIn />} />
          <Route element={<PrivateRoute />} >
            <Route path='/' element={<Home />} />
          </Route>
          <Route path='/recruit' element={<Recruit />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
