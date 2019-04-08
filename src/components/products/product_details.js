
import React, {Component} from 'react';
import axios from 'axios';
import ProductCarousel from './product_carousel';

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
    }

    render() {
        const {details} = this.state;
        console.log(details);
        if (details === null) {
            return <h1>Loading...</h1>
        } else if (!details) {
            return <h1 className="center">No Product Found</h1>
        }
        
        const {description, name, images, price, miscDetails} = details;
        // const miscDetailsArray = Object.entries(miscDetails);
        // const miscDetailsTable = <table></table>;
        
        // for (var detailsIndex = 0; detailsIndex < miscDetailsArray.length; detailsIndex++) {
        //     const tableRow = <tr>
        //                          <td>{miscDetailsArray[detailsIndex][0]}</td>
        //                          <td>{miscDetailsArray[detailsIndex][1]}</td>
        //                      </tr>;
            // $(miscDetailsTable).append(tableRow);
        // }

        return (
            <div className="product-details">
                <h1 className="center">{name}</h1>
                <ProductCarousel images={images}/>
                {/* <img src={`../../dist/${images[0]}`} alt={name}/> */}
                {/* <h3 className="center">${(price/100).toFixed(2)}</h3> */}
                <p>{description}</p>
                {/* {miscDetailsTable} */}
            </div>
        );
    }
}

export default ProductDetails;
