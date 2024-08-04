import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Addaircraft.css'; // Import the CSS file

const AddAircraftPage = () => {
  const [aircraftName, setAircraftName] = useState('');
  const [aircraftImages, setAircraftImages] = useState([]);
  const [aircraftPrice, setAircraftPrice] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [quantity, setQuantity] = useState('');
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
    setAircraftImages(files);
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
    <div className="add-item-container">
      <h1>Add New Aircraft</h1>
      <form className="add-item-form">
        <label>
          Aircraft Name:
          <input
            type="text"
            value={aircraftName}
            onChange={(e) => setAircraftName(e.target.value)}
            required
          />
        </label>

        <label>
          Aircraft Images:
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </label>

        <label>
          Aircraft Price:
          <input
            type="number"
            value={aircraftPrice}
            onChange={(e) => setAircraftPrice(e.target.value)}
            min="0"
            required
          />
        </label>

        <label>
          Delivery Date:
          <input
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
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

        <label>
          Plane Type:
          <select
            value={planeType}
            onChange={(e) => setPlaneType(e.target.value)}
          >
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

        <fieldset>
          <legend>Features:</legend>
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
        </fieldset>

        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddAircraftPage;
