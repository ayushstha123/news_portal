import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import About from './pages/About'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import CreatePost from './pages/CreatePost'
const App = () => {
  return (
 <BrowserRouter>
 <Header/>
 <Routes>
  <Route path="/" element={<Home/>} />
  <Route path="/about" element={<About/>} />
  <Route path="/signin" element={<SignIn/>} />
  <Route path="/signup" element={<SignUp/>} />
  <Route element={<OnlyAdminPrivateRoute/>}>
    <Route path="/create-post" element={<CreatePost/>} /></Route>

  <Route element={<PrivateRoute/>}><Route path="/dashboard" element={<Dashboard/>} />
</Route>
 </Routes>
 </BrowserRouter>
  )
}

export default App