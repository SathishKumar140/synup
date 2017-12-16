import Home from '../app/components/Home';
import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import synupReducer from './Reducers';
import thunk from 'redux-thunk';

let middleWare = applyMiddleware(
    thunk
)(createStore);

let store = middleWare(synupReducer);

render(
    <Provider store={store}>
        <Home/> 
    </Provider>
    , 
    document.getElementById('app')
)
