import Nav from './Nav/Nav'
import Home from './Home/Home'
import SignIn from './Authenticate/SignIn'
import Recruit from './Recruit/Recruit'
import NewRecruitment from './Recruit/NewRecruitment'
import NewAnnouncement from './Home/newAnnouncement'
import AuthProvider from './Authenticate/AuthProvider'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import PrivateRoute from './Authenticate/PrivateRoute'
import Register from './Register/Register'

function App() {


  return (
    <BrowserRouter>
      <AuthProvider>
        <Nav />
        <Routes>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/register' element={<Register />} />
          <Route element={<PrivateRoute />} >
            <Route path='/' element={<Home />} />
            <Route path='/new-recruit' element={<NewRecruitment />} />
            <Route path='/new-announcement' element={<NewAnnouncement />} />
            <Route path='/recruit' element={<Recruit />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
