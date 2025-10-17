import { React, useRef, useEffect } from 'react';
import { AdyenCheckout, Dropin, Card, Klarna, PayPal, GooglePay, ApplePay, Ach, Fastlane } from '@adyen/adyen-web';

const apiUrl = 'http://localhost:3001'

function Checkout({ cartItems, onBack }) {

  //general setup
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const adyenTotal = total*100
  //used in get session request and then to create the drop in. 
  const dropinRef = useRef(null)

  //adyen things start here

     
  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cartItems.map((item) => (
          <li key={item.id} style={{ marginBottom: '1rem' }}>
            <strong>{item.name}</strong> x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <strong>Total: ${total.toFixed(2)}</strong>
      </div>
      <div style={{ margin: '2rem 0' }}>
        <div ref={dropinRef} id={'dropin-container'}></div>
      </div>
      <button onClick={onBack}>Back to Shop</button>
    </div>
  );
}

export default Checkout; 