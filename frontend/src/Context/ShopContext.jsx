import React, {createContext, useEffect, useState} from 'react'

export const ShopContext = createContext(null)


const getDefaultCart = ()=>{
    let cart = {};
    for (let index = 0; index <300+1; index++){
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {    
    
    const [all_product, setAll_product] = useState ([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll ke atas
      }, []);
    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
        .then((response)=>{
            if (!response.ok) {
            throw new Error('Failed to fetch all products');
          }
          return response.json();
        })
        .then(data => {
            
          if (!Array.isArray(data)) {
            throw new Error('Invalid data format: expected an array');
          }
          setAll_product(data);
        })
        .catch(error => {
          console.error('Error fetching all products:', error);})
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart', {
                method: 'POST',
                headers:{
                    Accept: 'application/form-data',
                    'auth-token' : `${localStorage.getItem('auth-token')}`,
                    'Content-Type' : 'application/json',
                },
                body: "" ,
            }).then((response)=>response.json())
            .then((data)=>setCartItems(data))
        }
    },[])

    const addToCart = (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers:{
                    Accept: 'application/form-data',
                    'auth-token' : `${localStorage.getItem('auth-token')}`,
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({'itemId':itemId}),
            }).then((response)=>response.json()).then((data)=>console.log(data))
        }
    }
    const removeFromCart = (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers:{
                    Accept: 'application/form-data',
                    'auth-token' : `${localStorage.getItem('auth-token')}`,
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({'itemId':itemId}),
            }).then((response)=>response.json()).then((data)=>console.log(data))
        }
    }
    const getTotalCartAmount = ()=>{
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = all_product.find((product)=>product.id === Number(item))
                if (itemInfo) {     
                    totalAmount += itemInfo.price * cartItems[item];
                } else {
                    console.error(`Item with id ${item} not found in all_product`);
                }
            }
        }
        return totalAmount;
    }
    const clearCart = ()=>{
        if(localStorage.getItem('auth-token')){
            try {
                fetch("http://localhost:4000/clearcart", {
                    method:'POST',
                    headers:{
                        Accept: 'application/form-data',
                        'auth-token' : `${localStorage.getItem('auth-token')}`,
                        'Content-Type' : 'application/json',
                    },
                    body:""
                }).then((response)=>response.json()).then((data)=>console.log(data))
            } catch (err) {
                console.log(err.message);
            }

        }
    }
    const contextValue = {getTotalCartAmount, all_product, cartItems, addToCart, clearCart, removeFromCart};
    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;