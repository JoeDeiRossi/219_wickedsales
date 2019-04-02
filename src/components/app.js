import React from 'react';
import '../assets/css/app.scss';
import logo from '../assets/images/Rocket-PNG-File.png';

const App = () => (
    <div>
        <div className="app">
            <img src={logo} className="logo rotate"/>
            <h1>Welcome to React</h1>
        </div>
    </div>
);

export default App;
