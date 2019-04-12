
import React, {Component} from 'react';
import ProductRoutes from './products/index';
import {Route, Switch} from 'react-router-dom';
import axios from 'axios';
import Home from './home';
import Nav from './nav';
import NotFound from './404';
import Cart from './cart';
import 'materialize-css/dist/js/materialize.min';
//Import materialize's css (or any external css) before your own css!
import 'materialize-css/dist/css/materialize.min.css';
import '../assets/css/app.scss';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cartItems: 0
        }

        this.updateCartItems = this.updateCartItems.bind(this);
    }

    componentDidMount() {
        this.getCartItemsCount();
    }

    async getCartItemsCount() {
        const response = await axios.get('/api/getcartitemcount.php');
        this.updateCartItems(response.data.itemCount);
    }

    updateCartItems(count) {
        this.setState({
            cartItems: count
        });
    }

    render() {
        return (
            <div>
                <Nav cartItems={this.state.cartItems}/>
                <div className="container">
                    <Switch>
                        <Route path="/" component={Home} exact/>
                        <Route path="/products" render={(routingProps) => {
                            return <ProductRoutes {...routingProps} updateCart={this.updateCartItems}/>
                        }}/>
                        <Route path="/cart" component={Cart}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
