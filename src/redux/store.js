import {createStore} from 'redux';
import reducers from './reducers';

const initialState = {
    isConnected : false
}

export default createStore(reducers, initialState)