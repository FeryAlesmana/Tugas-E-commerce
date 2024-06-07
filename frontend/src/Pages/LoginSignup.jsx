import React from 'react';
import './CSS/LoginSignup.css';

const Loginsignup = () => {
  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>Sign Up</h1>
        <div className='loginsignup-fields'>
          <input type='text' placeholder='Your Name' />
          <input type='email' placeholder='Email Address' />
          <input type='password' placeholder='Password' />
        </div>
        <button>Continue</button>
        <p className='loginsignup-login'>Already have an account? <span>Login Here</span></p>
        <div className='loginsignup-agree'>
          <input type='checkbox' id='terms' />
          <label htmlFor='terms'>By Continue, I agree to the terms of use & privacy.</label>
        </div>
      </div>
    </div>
  );
};

export default Loginsignup;
