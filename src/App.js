import React from 'react';
import './App.css';

import RouterController from './Components/RouterController';

//REDUX
import store from './redux/store';
import { Provider} from 'react-redux';

function App() {

  return (
    <Provider store={store}>
      {/*Change le router s'il est connecté ou non.*/}
      <RouterController/>
    </Provider>
    
  );
}

export default App;
