import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import reducers from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

//!! 현재 확인해보니까 compose 사용 시 ie에서 안됨!
//chrome에서 디버깅 용도로 사용해야 할듯
const agent = navigator.userAgent.toLowerCase();

let store;

if(agent.indexOf("chrome") > -1){
    store = createStore(
        reducers
        , compose(
            applyMiddleware(thunk)
            , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );
}else{
    store = createStore(
        reducers
        , applyMiddleware(thunk)
    );
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
    
registerServiceWorker();
