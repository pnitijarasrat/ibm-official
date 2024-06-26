import Nav from './Nav/Nav'
import Home from './Home/Home'
import SignIn from './Authenticate/SignIn'
import Recruit from './Recruit/Recruit'
import RecruitTable from './Recruit/RecruitTable'
import NewRecruitment from './Recruit/NewRecruitment'
import NewAnnouncement from './Home/newAnnouncement'
import Personal from './Personal/Personal'
import AuthProvider from './Authenticate/AuthProvider'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import AdminRoute from './Authenticate/AdminRoute'
import PrivateRoute from './Authenticate/PrivateRoute'
import Register from './Register/Register'
import LinkTree from './LinkTree/LinkTree'
import NewLink from './LinkTree/NewLink'
import AllEmployee from './AdminPage/Employee/AllEmployee'
import AllRecruitment from './AdminPage/Recruitment/AllRecruitment'
import JobDesc from './AdminPage/Recruitment/JobDesc'
import Leaderboard from './Personal/Leaderboard'
import Learning from './Learning/Learning'
import NewLearn from './Learning/NewLearning'
import Evaluation from './Personal/Evaluation'
import Assessed from './Personal/Assessed'
import Calculation from './Personal/Calculation'
import ShowScore from './Personal/ShowScore'
import EvaluationProjectOwner from './Personal/EvaluateProjectOwner'
import EditPersonal from './Personal/EditPersonal'
import ForgetPassword from './Register/ForgetPassword'
import ShowLeaderboard from './Personal/showLeaderboard'

function App() {
  // getDisplayRole function

  return (
    <BrowserRouter>
      <AuthProvider>
        <Nav />
        <Routes>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgetpassword' element={<ForgetPassword />} />
          <Route element={<PrivateRoute />} >
            <Route element={<AdminRoute />} >
              <Route path='/new-recruit' element={<NewRecruitment />} />
              <Route path='/new-link' element={<NewLink />} />
              <Route path='/new-announcement' element={<NewAnnouncement />} />
              <Route path='/admin-all-employee' element={<AllEmployee />} />
              <Route path='/admin-all-recruitment' element={<AllRecruitment />} />
              <Route path='/new-learn' element={<NewLearn />} />
              <Route path='/edit/:userId' element={<EditPersonal />} />
            </Route>
            <Route path='/' element={<Home />} />
            <Route path='/:userId' element={<><Personal /><Calculation /></>} />
            <Route path='/leaderboard' element={<ShowLeaderboard />} />
            <Route path='/link-tree' element={<LinkTree />} />
            <Route path='/recruit-table' element={<RecruitTable />} />
            <Route path='/recruit' element={<Recruit />} />
            <Route path='/recruit/:jobId' element={<JobDesc />} />
            <Route path='/learning' element={<Learning />} />
            <Route path='/evaluation/:jobName/:userId' element={<Evaluation />} />
            <Route path='/assessed/:assessed_person/:jobName/:userId/:assessor' element={<Assessed />} />
            <Route path='/evaluate/:jobName/:userId/:assessor' element={<EvaluationProjectOwner />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
