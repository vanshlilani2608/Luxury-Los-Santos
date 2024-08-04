
import React, { useState } from 'react';
import './profile.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: '*********',
    phone: '+1 234 567 890',
    address: '123 Main St, Anytown, USA',
    age: 30,
    gender: 'Male',
    profileCreationDate: '2023-01-01',
    bankBalance: '$10000.00',
    orders: [
      { id: 1, product: 'Product 1', date: '2024-01-01', status: 'Delivered', imageUrl: 'https://via.placeholder.com/50' },
      { id: 2, product: 'Product 2', date: '2024-02-15', status: 'Shipped', imageUrl: 'https://via.placeholder.com/50' },
      { id: 3, product: 'Product 3', date: '2024-03-20', status: 'Processing', imageUrl: 'https://via.placeholder.com/50' },
    ],
    sales: [
      { id: 1, product: 'Product A', date: '2024-04-01', price: '$200.00', category: 'Electronics', status: 'Sold', dateSold: '2024-05-01', buyerName: 'Jane Smith', itemsSold: '3/3', imageUrl: 'https://via.placeholder.com/50' },
      { id: 2, product: 'Product B', date: '2024-05-15', price: '$150.00', category: 'Books', status: 'In-Stock', itemsSold: '0/5', imageUrl: 'https://via.placeholder.com/50' },
    ],
    imageUrl: 'https://via.placeholder.com/150',
  });

  const [showInfo, setShowInfo] = useState({
    personalInfo: false,
    bankInfo: false,
    orderHistory: false,
    sales: false,
  });

  const [showPopup, setShowPopup] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const [bankAction, setBankAction] = useState(null);
  const [amount, setAmount] = useState('');
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const navigate = useNavigate();


  const handlePersonalInfoClick = () => {
    setShowInfo({ personalInfo: !showInfo.personalInfo, bankInfo: false, orderHistory: false, sales: false });
  };

  const handleBankInfoClick = () => {
    setShowInfo({ personalInfo: false, bankInfo: !showInfo.bankInfo, orderHistory: false, sales: false });
  };

  const handleOrderHistoryClick = () => {
    setShowInfo({ personalInfo: false, bankInfo: false, orderHistory: !showInfo.orderHistory, sales: false });
  };

  const handleSalesClick = () => {
    setShowInfo({ personalInfo: false, bankInfo: false, orderHistory: false, sales: !showInfo.sales });
  };

  const handleRateClick = (product) => {
    setCurrentProduct(product);
    setShowPopup(true);
  };

  const handleCancelOrderClick = (orderId) => {
    console.log(`Cancel order button clicked for order id: ${orderId}`);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setCurrentProduct(null);
    setComment('');
    setRating(0);
    setBankAction(null);
    setAmount('');
  };

  const handleSubmitRating = () => {
    console.log(`Rated ${currentProduct.product} with ${rating} stars and comment: ${comment}`);
    handleClosePopup();
  };

  const handleRemoveItemClick = (itemId) => {
    console.log(`Remove item button clicked for item id: ${itemId}`);
  };

  const handleWithdrawClick = () => {
    setBankAction('withdraw');
    setShowPopup(true);
  };

  const handleAddClick = () => {
    setBankAction('add');
    setShowPopup(true);
  };

  const handleBankAction = () => {
    const currentBalance = parseFloat(user.bankBalance.replace(/[$,]/g, ''));
    const amountValue = parseFloat(amount);

    if (isNaN(amountValue) || amountValue <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    if (bankAction === 'withdraw' && amountValue > currentBalance) {
      alert('Insufficient balance. Please enter an amount less than or equal to your current balance.');
      return;
    }

    let newBalance;
    if (bankAction === 'withdraw') {
      newBalance = currentBalance - amountValue;
    } else if (bankAction === 'add') {
      newBalance = currentBalance + amountValue;
    }

    setUser({ ...user, bankBalance: `$${newBalance.toFixed(2)}` });
    handleClosePopup();
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleSaveProfileClick = () => {
    setUser({ ...editedUser });
    setIsEditing(false);
  };

  const handleCancelEditClick = () => {
    setEditedUser({ ...user });
    setIsEditing(false);
  };

  const handleProfileImageClick = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    };
    fileInput.click();
  };
  const handleListItemClick = () => {
    setShowCategoryPopup(true);
  };
  
  const handleCategorySelect = (category) => {
    setShowCategoryPopup(false);
    navigate(`/${category}`);
  };
  

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image" onClick={handleProfileImageClick}>
          <img src={user.imageUrl} alt="User" />
        </div>
        <div className="profile-info">
          <h1>{user.firstName} {user.lastName}</h1>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
        </div>
      </div>

      <div className="profile-details">
        <div className="info-button-container">
          <button className="info-button" onClick={handlePersonalInfoClick}>
            Personal Information
          </button>
          <button className="info-button" onClick={handleBankInfoClick}>
            Bank Information
          </button>
          <button className="info-button" onClick={handleOrderHistoryClick}>
            Order History
          </button>
          <button className="info-button" onClick={handleSalesClick}>
            Sales Information
          </button>
        </div>
        {showInfo.personalInfo && (
          <div className="extended-profile">
            <h2>Personal Information</h2>
            {isEditing ? (
              <>
                <input 
                  type="text" 
                  value={editedUser.firstName} 
                  onChange={(e) => setEditedUser({ ...editedUser, firstName: e.target.value })} 
                />
                <input 
                  type="text" 
                  value={editedUser.lastName} 
                  onChange={(e) => setEditedUser({ ...editedUser, lastName: e.target.value })} 
                />
                <input 
                  type="email" 
                  value={editedUser.email} 
                  onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })} 
                />
                <input 
                  type="text" 
                  value={editedUser.phone} 
                  onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })} 
                />
                <input 
                  type="number" 
                  value={editedUser.age} 
                  onChange={(e) => setEditedUser({ ...editedUser, age: parseInt(e.target.value) })} 
                />
                <select 
                  value={editedUser.gender} 
                  onChange={(e) => setEditedUser({ ...editedUser, gender: e.target.value })}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <input 
                  type="text" 
                  value={editedUser.address} 
                  onChange={(e) => setEditedUser({ ...editedUser, address: e.target.value })} 
                />
                <button className="save-profile-button" onClick={handleSaveProfileClick}>
                  Save Profile
                </button>
                <button className="cancel-edit-button" onClick={handleCancelEditClick}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <p><strong>First Name:</strong> {user.firstName}</p>
                <p><strong>Last Name:</strong> {user.lastName}</p>
                <p><strong>Password:</strong> {user.password}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Address:</strong> {user.address}</p>
                <p><strong>Age:</strong> {user.age}</p>
                <p><strong>Gender:</strong> {user.gender}</p>
                <p><strong>Profile Creation Date:</strong> {user.profileCreationDate}</p>
                <button className="edit-profile-button" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
              </>
            )}
          </div>
        )}
        {showInfo.bankInfo && (
          <div className="bank-information">
            <h2>Bank Information</h2>
            <p><strong>Bank Balance:</strong> {user.bankBalance}</p>
            <button className="withdraw-button" onClick={handleWithdrawClick}>
              Withdraw Money
            </button>
            <button className="add-button" onClick={handleAddClick}>
              Add Money
            </button>
          </div>
        )}
        {showInfo.orderHistory && (
          <div className="order-history">
            <h2>Order History</h2>
            {user.orders.length > 0 ? (
              <ul className="order-list">
                {user.orders.map((order) => (
                  <li key={order.id}>
                    <img src={order.imageUrl} alt={order.product} />
                    <div className="order-details">
                      <p><strong>Product:</strong> {order.product}</p>
                      <p><strong>Date:</strong> {order.date}</p>
                      <p><strong>Status:</strong> {order.status}</p>
                    </div>
                    <div className="order-actions">
                      <button className="cancel-order-button" onClick={() => handleCancelOrderClick(order.id)}>
                        Cancel Order
                      </button>
                      <button className="rate-product-button" onClick={() => handleRateClick(order)}>
                        Rate Product
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No orders found.</p>
            )}
          </div>
        )}
  {showInfo.sales && (
    <div className="sales-information">
      {user.sales.length > 0 ? (
        <ul className="sales-list">
          {user.sales.map((sale) => (
            <li key={sale.id} className="sales-item">
              <img src={sale.imageUrl} alt={sale.product} className="item-image" />
              <div className="info-container">
                <div className="status">{sale.status}</div>
                <div className="sale-details">
                  <p><strong>Product:</strong> {sale.product}</p>
                  <p><strong>Price:</strong> {sale.price}</p>
                  <p><strong>Category:</strong> {sale.category}</p>
                  <p><strong>Date Listed:</strong> {sale.date}</p>
                  {sale.status === 'Sold' && (
                    <>
                      <p><strong>Date Sold:</strong> {sale.dateSold}</p>
                      <p><strong>Buyer Name:</strong> {sale.buyerName}</p>
                      <p><strong>Items Sold:</strong> {sale.itemsSold}</p>
                    </>
                  )}
                </div>
                <div className="sale-actions">
                  <button className="remove-item-button" onClick={() => handleRemoveItemClick(sale.id)}>
                    Remove Item
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No sales found.</p>
      )}
      <button className="list-item-button" onClick={handleListItemClick}>List Item</button>
    </div>
  )}
  

      </div>
      {showCategoryPopup && (
      <div className="list-item-popup">
        <h2>Select a Category</h2>
        <p>Choose the category where you want to list your item:</p>
        <button className="confirm-button" onClick={() => handleCategorySelect('listyacht')}>Yacht</button>
        <button className="confirm-button" onClick={() => handleCategorySelect('listautomobiles')}>Automobiles</button>
        <button className="confirm-button" onClick={() => handleCategorySelect('listaircrafts')}>Aircraft</button>
        <button className="confirm-button" onClick={() => handleCategorySelect('listpenthouse')}>Penthouse</button>
        <button className="cancel-button" onClick={() => setShowCategoryPopup(false)}>Cancel</button>
      </div>
    )}


      {showPopup && (
        <div className="popup-overlay">
          <div className="popups">
            {bankAction === 'withdraw' || bankAction === 'add' ? (
              <>
                <h2>{bankAction === 'withdraw' ? 'Withdraw Money' : 'Add Money'}</h2>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <button className="confirm-button" onClick={handleBankAction}>
                  {bankAction === 'withdraw' ? 'Withdraw' : 'Add'}
                </button>
                <button className="cancel-button" onClick={handleClosePopup}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h2>Rate {currentProduct.product}</h2>
                <p>Please provide your rating:</p>
                <div className="rating-input">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={rating >= star ? 'star filled' : 'star'}
                      onClick={() => setRating(star)}
                    >
                      &#9733;
                    </span>
                  ))}
                </div>
                {/* <textarea
                  placeholder="Leave a comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                /> */}
                <button className="submit-button" onClick={handleSubmitRating}>
                  Submit Rating
                </button>
                <button className="cancel-button" onClick={handleClosePopup}>
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;


// 1  —--------  List Item (all categories) - 3 hrs, Product Detail - 4hrs
// 2  —--------  Product Info, Sales Info (In profile page finalize), Cart Page - Boilerplate Code
// 3  —--------  Cart Page - 5 hr,  Order Confirmation Page - 3 hrs
// 4  —--------  Integration Vansh - 5 hr
// 5  —--------  Integration Vansh - 5 hr
// 6  —--------  Finalize files, and make edit, Documentation (Comments), Deployment -  6hrs  


