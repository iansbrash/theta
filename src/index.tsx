import React from 'react';
import { render } from 'react-dom';
import AppTwo from './App 2'

// redux
import store from './redux/store'
import { Provider } from 'react-redux'

render(
    <Provider store={store}>
        <AppTwo />
    </Provider>, 
document.getElementById('root'));
