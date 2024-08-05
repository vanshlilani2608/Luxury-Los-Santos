import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Addaircraft.css'; // Import the CSS file

const AddAircraftPage = () => {
  const [productName, setProductName] = useState('');
  const [productImages, setProductImages] = useState([]);
  const [productPrice, setProductPrice] = useState('');
  const [maxDaysToDeliver, setMaxDaysToDeliver] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(''); 
  // Aircraft filters
  const [planeType, setPlaneType] = useState('');
  const [passengerMin, setPassengerMin] = useState('');
  const [passengerMax, setPassengerMax] = useState('');
  const [features, setFeatures] = useState({
    bedroom: false,
    conferenceRoom: false,
    bathrooms: false,
    workoutArea: false,
    gourmetKitchen: false,
    wineCellar: false,
    lavishDecor: false,
    soundproofCabins: false,
    recliningSeats: false,
    satelliteTV: false,
    storageCompartments: false,
    panoramicWindows: false,
  });

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 8) {
      alert('You can only select up to 8 images.');
      return;
    }
    setProductImages(files);
  };

  const handleMainImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 1) {
      alert('You can only select 1 main image.');
      return;
    }
    setProductImages(files);
  };

  const handleSubmit = () => {
    // Handle form submission logic
    navigate('/sales'); // Redirect to sales page
  };

  const handleFeatureChange = (feature) => {
    setFeatures((prevFeatures) => ({
      ...prevFeatures,
      [feature]: !prevFeatures[feature],
    }));
  };

  return (
    <div className="add-itemh-container">
      <h1>Add New Aircraft</h1>
      <form className="add-itemh-form">
        <label>
          Product Name:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </label>
        <div className="image-uploadh-row">
          <label>
            Product Images (Only add 1 Main image in this as this will be displayed everywhere):
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleMainImageChange}
              required
            />
          </label>
          <label>
            Product Images (Only add 7 Images in this as they are the different views of the product):
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </label>
        </div>
        <div className='ppqh'>
          <div className='inputh-group'>
            <label>
              Product Price:
              <input
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                min="0"
                required
              />
            </label>
          </div>
          <div className='inputh-group'>
            <label>
              Quantity to be Sold:
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
                required
              />
            </label>
          </div>
        </div>
        <div className="formh-row">
          <label>
            Plane Type:
            <select value={planeType} onChange={(e) => setPlaneType(e.target.value)}>
              <option value="">Select Plane Type</option>
              <option value="heavyJet">Heavy Jet</option>
              <option value="lightJet">Light Jet</option>
              <option value="midsizeJet">Midsize Jet</option>
              <option value="largeCabin">Large Cabin</option>
              <option value="pistonSingle">Piston Single</option>
              <option value="pistonTwin">Piston Twin</option>
              <option value="superHeavyJet">Super Heavy Jet</option>
              <option value="superLightJet">Super Light Jet</option>
              <option value="superMidsizeJet">Super Midsize Jet</option>
              <option value="turboProp">Turbo Prop</option>
              <option value="helicopter">Helicopter</option>
              <option value="passenger">Passenger (2 - 150)</option>
            </select>
          </label>
          {planeType === 'passenger' && (
            <>
              <label>
                Passenger Minimum:
                <input
                  type="number"
                  value={passengerMin}
                  onChange={(e) => setPassengerMin(e.target.value)}
                  min="2"
                  required
                />
              </label>
              <label>
                Passenger Maximum:
                <input
                  type="number"
                  value={passengerMax}
                  onChange={(e) => setPassengerMax(e.target.value)}
                  min="2"
                  max="150"
                  required
                />
              </label>
            </>
          )}
        </div>
        <label>
        Delivery Date:
        <input
          type="date"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
        />
      </label>
        <fieldset>
          <legend>Features:</legend>
          <div className="featureh-grid">
            {Object.keys(features).map((feature) => (
              <label key={feature}>
                <input
                  type="checkbox"
                  checked={features[feature]}
                  onChange={() => handleFeatureChange(feature)}
                />
                {feature.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </label>
            ))}
          </div>
        </fieldset>
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddAircraftPage;
