import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import './Product.css';
import Rating from 'react-rating';

const Product = (props) => {
   //console.log(props); 
   const {name,img,seller,price,stock,ratings} = props.product;
   const cartIcon = <FontAwesomeIcon icon={faShoppingCart} />
    
    return (
        <div className="product">
            <div>
            <img src={img} alt="" />
            </div>
        <div className="product-gap">
            <h4 className="product-name">{name} </h4>
            <p><small>by: {seller}</small></p>
            <p>Price: {price}</p>
            <p><small>only {stock} left in stock - order soon</small></p>
            <Rating 
             initialRating={ratings}
             emptySymbol="fa-regular fa-star icon-color"
             fullSymbol="fa-solid fa-star icon-color"
             readonly></Rating>
            <br />
            <button onClick={ () => props.handelAddToCart(props.product)}
            className="btn-regular">{cartIcon}add to cart</button>
        </div>
        </div>
    );
};

export default Product;