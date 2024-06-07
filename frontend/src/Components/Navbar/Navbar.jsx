import React, { useState } from "react";
import './Navbar.css'
import logo from '../Assets/logo-text.png'
import cart_icon from '../Assets/cart_icon.png'
import search_icon from '../Assets/search_icon.png'
import people_icon from '../Assets/people_icon.png'
import { Link } from "react-router-dom";

const Navbar = () => {

    const [menu, setMenu] = useState("shop");
    return (
        <div className="navbar">
            <div className="nav-logo">
                <Link to='/'><img src={logo} alt="logo" /></Link>
            </div>
            <ul className="nav-menu">
                <li onClick={() => { setMenu("shop") }}><Link style={{ textDecoration: 'none', color: 'black' }} to='/'>Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("home") }}><Link style={{ textDecoration: 'none', color: 'black' }} to='/home'>Home</Link>{menu === "home" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("office") }}><Link style={{ textDecoration: 'none', color: 'black' }} to='/office'>Office</Link>{menu === "office" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("kitchen") }}><Link style={{ textDecoration: 'none', color: 'black' }} to='/kitchen'>Kitchen</Link>{menu === "kitchen" ? <hr /> : <></>}</li>
            </ul>
            <div className="nav-search-login-cart">
                <div className="nav-search">
                    <input type="text" placeholder="Cari..." />
                    <Link to=''><img src={search_icon} alt="search" id="search_icon" /></Link>
                </div>
                <Link to='/login'><img src={people_icon} alt="login" id="login-icon" /></Link>
                <Link to='/cart'><img src={cart_icon} alt="cart" id="cart-icon" /></Link>
            </div>
        </div>
    )
}

export default Navbar
