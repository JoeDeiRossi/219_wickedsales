
import React from 'react';
import {Route} from 'react-router-dom';
import ProductList from './product_list';
import ProductDetails from './product_details';

export default props => {
    return (
        <div>
            <Route path="/products" component={ProductList} exact/>
            <Route path="/products/:product_id" component={ProductDetails} exact/>
        </div>
    );
}
