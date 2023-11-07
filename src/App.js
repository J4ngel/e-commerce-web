import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Pages/Home';
import Signup from './components/Pages/Signup';
import NotFound from './components/Pages/NotFound';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
