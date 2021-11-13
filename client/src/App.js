import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

import Login from './containers/Login';
import Dashboard from './containers/Dashboard';
import Home from './containers/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="header">
            <NavLink exact activeclassname="active" to="/">Home</NavLink>
            <NavLink activeclassname="active" to="/login">Login</NavLink>
          </div>
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;