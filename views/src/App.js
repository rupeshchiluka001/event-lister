import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Main from './components/Main/Main';
import CreateEvent from './components/CreateEvent/CreateEvent';

function App() {
  return (
      <>
      <Router>
        <Routes>
          <Route path="/" element={< Home />} />
          <Route path="/login" element={< Login />} />
          <Route path="/signup" element={< Signup />} />
          <Route path="/main" element={< Main />} />
          <Route path="/create-event" element={< CreateEvent />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
