import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';

const Shop = () => {
    const [products,setProducts] = useState([]);
    const [cart,setCart] = useState([]);
    //products to be rendered on the UI
    const [displayProducts, setDisplayProducts] = useState([]) 
    useEffect( () => {
        //console.log('product Api  called')
        fetch('./products.json')
        .then(res=>res.json())
        .then(data=>{
            setProducts(data);
            setDisplayProducts(data);
            //console.log('product receive')
        })

    }, []);
   //sideEffect
    useEffect(() =>{
        //console.log('local Storage called')
    
         if(products.length){
            const saveCart = getShoppingCart();
             const stroedCart = [];
            for(const key in saveCart){
                //console.log(key, saveCart[key])
                //key from product find out
                const addedProduct = products.find(product => product.id===key);
                //console.log(key, addedProduct);
                if(addedProduct){
                    const quantity = saveCart[key];
                    addedProduct.quantity = quantity;
                    //console.log(addedProduct)
                    stroedCart.push(addedProduct);
                }
             }
             setCart(stroedCart);
         }
    } ,[products])

    const handelAddToCart = (product) =>{
        const newCarat = [...cart, product];
        setCart(newCarat);
        //save to local storage (for now)
        console.log(product)
        addToDb(product.id);
    }
    //search input
    const handelSearch = event =>{

        const searchText = event.target.value;
        
        const matchedProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));
        
       setDisplayProducts(matchedProducts)
        console.log(matchedProducts.length)
    }
    return (
    <>
    <div className="search-container">
            <input type="text" 
            onChange={handelSearch}
            placeholder='Search Product'/>
        </div>
        <div className="shop-container">
           <div className="product-container">
            {/* <h2>Products: {products.length}</h2> */}
            
            {
                displayProducts.map(product => <Product
                    key={product.id}
                    product={product}
                    handelAddToCart={handelAddToCart}
                    ></Product>)
            }
           </div>
           <div className="cart-container">
            <Cart cart={cart}></Cart>
           </div>
        </div>
        </>
    );
};

export default Shop;