import React, { useState } from 'react';
import './carts.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    // Example items
    { id: 1, name: 'Product 1', price: 10, category: 'Category1', deliveryDate: '2 days', image: 'image1.jpg' },
    { id: 2, name: 'Product 2', price: 20, category: 'Category2', deliveryDate: '3 days', image: 'image2.jpg' },
  ]);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showBalancePopup, setShowBalancePopup] = useState(false);

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const emptyCart = () => {
    setCartItems([]);
  };

  const confirmBuy = () => {
    // Check balance logic here
    const hasSufficientBalance = true; // Placeholder
    if (hasSufficientBalance) {
      setShowConfirmPopup(true);
    } else {
      setShowBalancePopup(true);
    }
  };

  const handleConfirmYes = () => {
    // Redirect to Order Confirmation Page
  };

  const handleAddMoney = () => {
    // Redirect to Profile Page
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} className="product-image" />
              <div className="product-details">
                <h2>{item.name}</h2>
                <p>Price: ${item.price}</p>
                <p>Category: {item.category}</p>
                {item.category !== 'PentHouses' && <p>Delivery: {item.deliveryDate}</p>}
              </div>
              <button className="remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          ))
        ) : (
          <p>Your cart is empty. <a href="/shop">Shop more</a></p>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="cart-summary">
          <h2>Amount to be Paid: ${totalAmount}</h2>
          <button className="confirm-btn" onClick={confirmBuy}>Confirm Buy</button>
          <button className="empty-btn" onClick={emptyCart}>Empty Cart</button>
        </div>
      )}
      {showConfirmPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Are you sure to buy all items in the cart?</p>
            <button onClick={handleConfirmYes}>Yes</button>
            <button onClick={() => setShowConfirmPopup(false)}>No</button>
          </div>
        </div>
      )}
      {showBalancePopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Insufficient Balance</p>
            <button onClick={handleAddMoney}>Add Money</button>
            <button onClick={() => setShowBalancePopup(false)}>Cancel</button>
          </div>
        </div>
      )}
      <a className="shop-btn" href="/shop">Shop</a>
    </div>
  );
};

export default CartPage;
