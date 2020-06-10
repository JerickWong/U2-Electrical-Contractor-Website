import React from 'react';
import ReactDOM from 'react-dom';
import LoginBox from './Login';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <LoginBox />, document.getElementById('root')
);
serviceWorker.unregister();
