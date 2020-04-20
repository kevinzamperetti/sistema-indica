import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import logo from './logo.svg';
import Login from "./pages/Login"
import Register from "./pages/Register"
import ResetPassword from "./pages/ResetPassword"

import './App.css';
// import './css/Register.css';

function App() {
  return (
    <Router>
      <Route path = "/login" component={ Login } />
      <Route path = "/register" exact component={ Register } />
      <Route path = "/reset-password" exact component={ ResetPassword } />
    </Router>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Indica - Sistema de indicação de pessoas
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
