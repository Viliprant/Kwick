import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import RouterController from './Components/RouterController';

function App() {

  return (
    //Change le router s'il est connecté ou non.
    <RouterController/>
  );
}

export default App;
