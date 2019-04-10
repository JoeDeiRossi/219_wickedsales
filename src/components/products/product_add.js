
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

class ProductAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            qty: 1
        }

        this.incrementQty = this.incrementQty.bind(this);
        this.decrementQty = this.decrementQty.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    incrementQty() {
        this.setState({
            qty: this.state.qty + 1
        })
    }

    decrementQty() {
        if (this.state.qty > 1) {
            this.setState({
                qty: this.state.qty - 1
            });
        }
    }

    addToCart() {
        const {productId} = this.props;
        const {qty} = this.state;

        axios.get(`/api/addcartitem.php?product_id=${productId}&quantity=${qty}`).then(response => {
            this.props.history.push('/cart');
        });
    }

    render() {
        return (
            <div className="center add-to-cart">
                <span className="qty-container">
                    <button onClick={this.decrementQty} className="btn btn-small btn-floating green">
                        <i className="material-icons">remove_circle_outline</i>
                    </button>
                    <span className="product-qty">{this.state.qty}</span>
                    <button onClick={this.incrementQty} className="btn btn-small btn-floating green">
                        <i className="material-icons">add_circle_outline</i>
                    </button>
                </span>
                
                <button onClick={this.addToCart} className="btn">
                    <i className="material-icons">add_shopping_cart</i>
                </button>
            </div>
        );
    }
}

export default withRouter(ProductAdd);
