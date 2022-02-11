import React from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';


import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import MainContent from './components/MainContent';
import ForgotPassword from './components/ForgotPassword';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' exact element={<SignIn/>}></Route>
          <Route path='/SignUp' element={<SignUp/>}></Route>
          <Route path='/Comment' element={<MainContent/>}></Route>
          <Route path='/ForgotPassword' element={<ForgotPassword/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
