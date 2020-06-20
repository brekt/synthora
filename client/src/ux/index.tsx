import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import { Button } from '@material-ui/core';

function App() {
    return <Button color="primary">Hello World</Button>;
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
