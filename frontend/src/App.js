import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route} from 'react-router-dom';
import Userlogin from './auth/Userlogin';
import Registerform from './auth/Registerform';
import ProtectedRouter from './auth/Protect';
import Dashboard from './pages/Dashboard';
import Service from './pages/Services';
import Resetpwd from './auth/Resetpwd';
import Resetpwdform from './auth/Resetpwdform';
import Files from './pages/Files';
import NotFound from './pages/NotFound';
import Testvalidation from './pages/Testvalidation';
const App = () => {
  return (
        <Routes>
          <Route exact path='/test-upload' element = {<Testvalidation/>} />
          <Route exact path="/" element={<Userlogin />} />
          <Route exact path="/login" element={<Userlogin />} />
          <Route exact path="/register" element={<Registerform />} />
          <Route path="*" element={<NotFound/>} />
          <Route exact path="/reset-password" element={<Resetpwd />} />
          <Route exact path="/reset-password/:id/:token" element={<Resetpwdform />} />
          <Route exact path='/' element={<ProtectedRouter/>}>
            <Route exact path='/dashboard' element={<Dashboard/>}/>
            <Route exact path='/employee' element={<Service/>}/>
            <Route exact path='/files' element={<Files/>}/>
          </Route>
        </Routes>
 
  );
};

export default App;