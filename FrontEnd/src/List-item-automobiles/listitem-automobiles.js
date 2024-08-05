import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Addautomobile.css'; // Ensure the CSS file follows the style of Addyacht.css

const AddAutomobilePage = () => {
  const [productName, setProductName] = useState('');
  const [productImages, setProductImages] = useState([]);
  const [productPrice, setProductPrice] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [automobileType, setAutomobileType] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [transmission, setTransmission] = useState('');
  const [seatingCapacity, setSeatingCapacity] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [features, setFeatures] = useState({
    massageSeats: false,
    heatedSeats: false,
    navigationSystem: false,
    blindSpotMonitoring: false,
    bluetooth: false,
    panoramicSunroof: false,
    activeNoiseCancellation: false,
    premiumLeatherUpholstery: false,
    keylessEntryAndStart: false,
    builtInInternetConnectivity: false,
    ambientLighting: false,
    automaticParkingAssistance: false,
    rearSeatEntertainmentSystem: false,
    adaptiveHeadlights: false,
    underSeatStorage: false,
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
  const handlemainImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 1) {
      alert('You can only 1 image.');
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

  const handleAutomobileTypeChange = (e) => {
    const type = e.target.value;
    setAutomobileType(type);

    // Disable fields for Bike
    if (type === 'bike') {
      setBodyType('');
      setTransmission('');
      setSeatingCapacity('');
      setFuelType('');
      setFeatures({
        massageSeats: false,
        heatedSeats: false,
        navigationSystem: false,
        blindSpotMonitoring: false,
        bluetooth: false,
        panoramicSunroof: false,
        activeNoiseCancellation: false,
        premiumLeatherUpholstery: false,
        keylessEntryAndStart: false,
        builtInInternetConnectivity: false,
        ambientLighting: false,
        automaticParkingAssistance: false,
        rearSeatEntertainmentSystem: false,
        adaptiveHeadlights: false,
        underSeatStorage: false,
      });
    }
  };

  const renderFuelTypeOptions = () => {
    if (automobileType === 'bike') {
      return (
        <>
          <option value="petrol">Petrol</option>
          <option value="electric">Electric</option>
        </>
      );
    } else {
      return (
        <>
          <option value="diesel">Diesel</option>
          <option value="electric">Electric</option>
          <option value="gas">Gas</option>
          <option value="hybrid">Hybrid</option>
          <option value="natural-gas">Natural Gas</option>
          <option value="hydrogen">Hydrogen</option>
        </>
      );
    }
  };

  return (
    <div className="add-itemp-container">
      <h1>Add New Automobile</h1>
      <form className="add-itemp-form">
        <label>
          Product Name:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </label>

        <div className="image-uploadp-row">
  <label>
    Product Images (Only add 1 Main image in this as this will be displayed everywhere):
    <input
      type="file"
      multiple
      accept="image/*"
      onChange={handlemainImageChange}
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

        <div className="formp-row">
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

        <label>
          Delivery Date:
          <input
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
          />
        </label>

        <label>
          Automobile Type:
          <select
            value={automobileType}
            onChange={handleAutomobileTypeChange}
          >
            <option value="">Select Automobile Type</option>
            <option value="bike">Bike</option>
            <option value="car">Car</option>
          </select>
        </label>

        {automobileType === 'car' && (
          <>
            <div className="formp-row">
              <label>
                Body Type:
                <select
                  value={bodyType}
                  onChange={(e) => setBodyType(e.target.value)}
                >
                  <option value="">Select Body Type</option>
                  <option value="sports">Sports</option>
                  <option value="suv">SUV</option>
                  <option value="sedan">Sedan</option>
                  <option value="hatchback">Hatchback</option>
                  <option value="muv">MUV</option>
                  <option value="compact-sedan">Compact Sedan</option>
                  <option value="compact-suv">Compact SUV</option>
                  <option value="convertible">Convertible</option>
                  <option value="coupe">Coupe</option>
                  <option value="station-wagon">Station Wagon</option>
                  <option value="minivan">Minivan</option>
                  <option value="truck">Truck</option>
                </select>
              </label>

              <label>
                Transmission:
                <select
                  value={transmission}
                  onChange={(e) => setTransmission(e.target.value)}
                >
                  <option value="">Select Transmission</option>
                  <option value="automatic">Automatic</option>
                  <option value="manual">Manual</option>
                </select>
              </label>

              <label>
                Seating Capacity:
                <select
                  value={seatingCapacity}
                  onChange={(e) => setSeatingCapacity(e.target.value)}
                >
                  <option value="">Select Seating Capacity</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </label>
            </div>
          </>
        )}

        <label>
          Fuel Type:
          <select
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
          >
            <option value="">Select Fuel Type</option>
            {renderFuelTypeOptions()}
          </select>
        </label>

        <fieldset>
          <legend>Features:</legend>
          <div className="featurep-grid">
            {Object.keys(features).map((feature) => (
              <label key={feature}>
                <input
                  type="checkbox"
                  checked={features[feature]}
                  onChange={() => handleFeatureChange(feature)}
                  disabled={automobileType === 'bike'}
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

export default AddAutomobilePage;
