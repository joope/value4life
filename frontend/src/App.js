import React from 'react';
import logo from './logo.svg';
import './App.css';
import Camera from './Camera';
import Summary from './Summary';

import { Router } from "@reach/router"
import Home from './Home';


function App() {
  return (
    <Router>
      <Home path="/" />
      <Camera path="/camera" />
      <Summary path="/summary"/>
    </Router>
  );
}

export default App;
