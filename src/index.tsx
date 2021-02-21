import React from 'react';
import ReactDOM from 'react-dom';

import './tailwind.output.css';
import { App } from './App';

ReactDOM.render(
    <div className="container mx-auto py-6 px-4">
        <App />
    </div>,
    document.getElementById('root'),
);
