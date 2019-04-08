
import React from 'react';
import ProductRoutes from './products/index';
import {Route} from 'react-router-dom';
import Home from './home';
import Nav from './nav';
import Test from './test';
import 'materialize-css/dist/js/materialize.min';
//Import materialize's css (or any external css) before your own css!
import 'materialize-css/dist/css/materialize.min.css';
import '../assets/css/app.scss';

const App = () => (
    <div>
        <Nav/>

        <div className="container">
            <Route path="/" component={Home} exact/>
            <Route path="/products" component={ProductRoutes}/>
            <Route path="/test" component={Test}/>
        </div>
    </div>
);

export default App;
