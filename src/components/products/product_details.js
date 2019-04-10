
import React, {Component} from 'react';
import axios from 'axios';
import ProductCarousel from './product_carousel';
import ProductAdd from './product_add';
import {formatMoney} from '../../helpers';
import MiscDetails from './misc_details';

class ProductDetails extends Component {
    state = {
        details: null
    }

    async componentDidMount() {
        const {params} = this.props.match;
        
        const response = await axios.get(`/api/getproductdetails.php?productId=${params.product_id}`);

        if (response.data.success) {
            this.setState({
                details: response.data.productInfo
            });
        } else {
            this.setState({
                details: false
            });
        }
        //call server to get product details
    }

    render() {
        const {details} = this.state;
        const {params} = this.props.match;

        if (details === null) {
            return <h1>Loading...</h1>
        } else if (!details) {
            return <h1 className="center">No Product Found</h1>
        }
        
        const {description, images, miscDetails, name, price} = details;

        return (
            <div className="product-details">
                <h1 className="center">{name}</h1>
                <div className="row">
                    <ProductCarousel images={images}/>
                    <div className="col s12 m4">
                        <div className="center product-price">{formatMoney(price)}</div>
                        <ProductAdd productId={params.product_id}/>
                        <p>{description}</p>
                        <MiscDetails details={miscDetails}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductDetails;
