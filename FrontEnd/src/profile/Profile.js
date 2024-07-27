import React, { useState } from 'react';
import './profile.css';
import { Link } from 'react-router-dom';

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
    bankBalance: '$10000.00',  // Ensure this is a string
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
  };

  const handleSubmitRating = () => {
    console.log(`Rated ${currentProduct.product} with comment: ${comment}`);
    handleClosePopup();
  };

  const handleRemoveItemClick = (itemId) => {
    console.log(`Remove item button clicked for item id: ${itemId}`);
  };

  const handleWithdrawMoney = () => {
    setUser(prevUser => ({
      ...prevUser,
      bankBalance: prevUser.bankBalance > 0 ? prevUser.bankBalance - 100 : 0
    }));
  };

  const handleAddMoney = () => {
    setUser(prevUser => ({
      ...prevUser,
      bankBalance: prevUser.bankBalance + 100
    }));
  };
  const handleWithdrawClick = () => {
    const currentBalance = parseFloat(user.bankBalance.replace(/[$,]/g, ''));
    const newBalance = currentBalance - 100 < 0 ? 0 : currentBalance - 100;
    setUser({ ...user, bankBalance: `$${newBalance.toFixed(2)}` });
  };
  
  const handleAddClick = () => {
    const currentBalance = parseFloat(user.bankBalance.replace(/[$,]/g, ''));
    const newBalance = currentBalance + 100;
    setUser({ ...user, bankBalance: `$${newBalance.toFixed(2)}` });
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });
  const handleEditProfileClick = () => {
    console.log('Edit Profile button clicked');
    setIsEditing(true);
  };
  
  const handleSaveProfileClick = () => {
    setUser({ ...editedUser });
    setIsEditing(false);
  };
  
  const handleCancelEditClick = () => {
    setEditedUser({ ...user });
    setIsEditing(false);
  };
  

  


  

  return (
    <div className="profile-container">
      <div className="profile-header">
  <div className="profile-image">
    <img src={user.imageUrl} alt="User" />
  </div>
  <div className="profile-info">
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
        <button className="save-profile-button" onClick={handleSaveProfileClick}>
          Save Profile
        </button>
        <button className="cancel-edit-button" onClick={handleCancelEditClick}>
          Cancel
        </button>
      </>
    ) : (
      <>
        <h1>{user.firstName} {user.lastName}</h1>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <button className="edit-profile-button" onClick={handleEditProfileClick}>
          Edit Profile
        </button>
      </>
    )}
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
            <p><strong>First Name:</strong> {user.firstName}</p>
            <p><strong>Last Name:</strong> {user.lastName}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Age:</strong> {user.age}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>Profile Created On:</strong> {user.profileCreationDate}</p>
          </div>
        )}
        {showInfo.bankInfo && (
  <div className="extended-profile">
    <h2>Bank Information</h2>
    <p><strong>Bank Balance:</strong> {user.bankBalance}</p>
    <p><strong>Account Number:</strong> 1234567890</p>
    <p><strong>Routing Number:</strong> 123456789</p>
    <div className="bank-button-container">
      <button className="bank-button withdraw-button" onClick={handleWithdrawClick}>Withdraw Money</button>
      <button className="bank-button add-button" onClick={handleAddClick}>Add Money</button>
    </div>
  </div>
)}

        {showInfo.orderHistory && (
          <div className="extended-profile order-history">
            <h2>Order History</h2>
            <ul>
              {user.orders.map(order => (
                <li key={order.id}>
                  <img src={order.imageUrl} alt={order.product} />
                  <p><strong>Product:</strong> {order.product}</p>
                  <p><strong>Date:</strong> {order.date}</p>
                  <p><strong>Status:</strong> {order.status}</p>
                  {order.status === 'Delivered' && (
                    <button className="rate-button" onClick={() => handleRateClick(order)}>
                      Rate Product
                    </button>
                  )}
                  {order.status === 'Processing' && (
                    <button className="cancel-button" onClick={() => handleCancelOrderClick(order.id)}>
                      Cancel Order
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        {showInfo.sales && (
          <div className="extended-profile">
            <h2>Sales</h2>
            {user.sales.length > 0 ? (
              <ul className="sales-list">
                {user.sales.map(sale => (
                  <li key={sale.id} className="sales-item">
                    <img src={sale.imageUrl} alt={sale.product} />
                    <div className="sales-item-details">
                      <Link to={`/item/${sale.id}`} className="sales-item-name">{sale.product}</Link>
                      <p><strong>Category:</strong> {sale.category}</p>
                      <p><strong>Date Listed:</strong> {sale.date}</p>
                      <p><strong>Price:</strong> {sale.price}</p>
                      <p><strong>Status:</strong> {sale.status} {sale.itemsSold}</p>
                      {sale.status === 'Sold' && sale.itemsSold.split('/')[0] === sale.itemsSold.split('/')[1] && (
                        <p className="sold-mark">SOLD</p>
                      )}
                      {sale.status === 'Sold' && (
                        <>
                          <p><strong>Date Sold:</strong> {sale.dateSold}</p>
                          <p><strong>Buyer:</strong> {sale.buyerName}</p>
                        </>
                      )}
                      {sale.status === 'In-Stock' && sale.itemsSold === '0/5' && (
                        <button className="remove-item-button" onClick={() => handleRemoveItemClick(sale.id)}>Remove Item</button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No sales records available.</p>
            )}
          </div>
        )}
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Rate {currentProduct.product}</h2>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment here..."
            />
            <button className="submit-rating-button" onClick={handleSubmitRating}>Submit Rating</button>
            <button className="close-popup-button" onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
