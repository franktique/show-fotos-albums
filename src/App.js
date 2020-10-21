import React from 'react';
import logo from './logo.svg';
import './App.css';

import Fotos from './componentes/Fotos';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import './stilos.css'; 

function App() {
  return (
    <div className="App">
      <Fotos/>
    </div>
  );
}

export default App;
