import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Addyacht.css'; // Import the CSS file

const AddItemPage = () => {
  const [productName, setProductName] = useState('');
  const [productImages, setProductImages] = useState([]);
  const [productPrice, setProductPrice] = useState('');
  const [maxDaysToDeliver, setMaxDaysToDeliver] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [quantity, setQuantity] = useState('');

  // Yacht filters
  const [yachtType, setYachtType] = useState('');
  const [hullMaterial, setHullMaterial] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [lengthMin, setLengthMin] = useState('');
  const [lengthMax, setLengthMax] = useState('');
  const [beamMin, setBeamMin] = useState('');
  const [beamMax, setBeamMax] = useState('');
  const [numberOfEngines, setNumberOfEngines] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [features, setFeatures] = useState({
    spa: false,
    pool: false,
    helipad: false,
    gym: false,
    fishing: false,
    cinema: false,
    wineCellar: false,
    sunLounger: false,
    waterToys: false,
    beachClub: false,
    sundeck: false,
    gourmetKitchen: false,
    privateSuite: false,
    diningArea: false,
    officeSpace: false,
    bbqGrill: false,
    highSpeedInternet: false,
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

  return (
    <div className="add-items-container">
      <h1>Add New Yacht</h1>
      <form className="add-items-form">
        <label>
          Product Name:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </label>
        {/* <label>
          Product Images(Only add Main image in this as this will be displayed everywhere):
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handlemainImageChange}
            required
          />
        </label>

        <label>
          Product Images(Only add 7 Images in this box):
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </label> */}
        <div className="image-upload-row">
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

        <div className='ppq'>
  <div className='input-group'>
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
  <div className='input-group'>
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

        <div className="form-row">
  <label>
    Yacht Type:
    <select value={yachtType} onChange={(e) => setYachtType(e.target.value)}>
      <option value="">Select Yacht Type</option>
      <option value="sail">Sail</option>
      <option value="power">Power</option>
    </select>
  </label>

  <label>
    Hull Material:
    <select value={hullMaterial} onChange={(e) => setHullMaterial(e.target.value)}>
      <option value="">Select Hull Material</option>
      <option value="aluminum">Aluminum</option>
      <option value="composite">Composite</option>
      <option value="ferro-cement">Ferro-Cement</option>
      <option value="fiberglass">Fiberglass</option>
      <option value="other">Other</option>
      <option value="pvc">PVC</option>
      <option value="steel">Steel</option>
      <option value="wood">Wood</option>
    </select>
  </label>
  

  <label>
    Fuel Type:
    <select value={fuelType} onChange={(e) => setFuelType(e.target.value)}>
      <option value="">Select Fuel Type</option>
      <option value="diesel">Diesel</option>
      <option value="electric">Electric</option>
      <option value="petrol">Petrol</option>
    </select>
  </label>
  </div>

        
        
        <div className="form-row">
  <label>
    Beam (in m):
    <input
      type="number"
      placeholder="Beam"
      value={beamMin}
      onChange={(e) => setBeamMin(e.target.value)}
      min="0"
      required
    />
  </label>

  <label>
    Number Of Engines:
    <select
      value={numberOfEngines}
      onChange={(e) => setNumberOfEngines(e.target.value)}
    >
      <option value="">Select Number of Engines</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4+">4+</option>
    </select>
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

        <fieldset>
  <legend>Features:</legend>
  <div className="features-grid">
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

export default AddItemPage;
