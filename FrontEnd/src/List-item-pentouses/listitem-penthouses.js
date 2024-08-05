import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Addpenthouse.css'; // Import the CSS file

const AddItemPage = () => {
  const [productName, setProductName] = useState('');
  const [productImages, setProductImages] = useState([]);
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [quantity, setQuantity] = useState('');

  // Penthouse filters
  const [bhk, setBhk] = useState('');
  const [coveredAreaMin, setCoveredAreaMin] = useState('');
  const [coveredAreaMax, setCoveredAreaMax] = useState('');
  const [furnishing, setFurnishing] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [facing, setFacing] = useState('');
  const [location, setLocation] = useState('');
  const [features, setFeatures] = useState({
    gym: false,
    kidsPlayArea: false,
    reservedParking: false,
    swimmingPool: false,
    clubHouse: false,
    park: false,
    balcony: false,
    jacuzzi: false,
    roofTerrace: false,
    tennisCourt: false,
    spa: false,
    powerBackup: false,
    cctv: false,
    security: false,
    visitorsParking: false,
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
    <div className="add-itemx-container">
      <h1>Add New Penthouse</h1>
      <form className="add-itemx-form">
        <label>
          Product Name:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </label>
        <div className="image-uploadx-row">
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

        <div className='ppqx'>
          <div className='inputx-group'>
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
          <div className='inputx-group'>
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

        <div className="formx-row">
          <label>
            BHK:
            <select value={bhk} onChange={(e) => setBhk(e.target.value)}>
              <option value="">Select BHK</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="5+">5+</option>
            </select>
          </label>

          <label>
            Covered Area (Sqft):
            <div className="rangex-inputs">
              <input
                type="number"
                value={coveredAreaMin}
                onChange={(e) => setCoveredAreaMin(e.target.value)}
                min="0"
                required
              />
              
            </div>
          </label>

          <label>
            Furnishing:
            <select
              value={furnishing}
              onChange={(e) => setFurnishing(e.target.value)}
            >
              <option value="">Select Furnishing</option>
              <option value="semi-furnished">Semi-furnished</option>
              <option value="unfurnished">Unfurnished</option>
              <option value="furnished">Furnished</option>
            </select>
          </label>
        </div>

        <div className="formx-row">
          <label>
            Bathrooms:
            <select value={bathrooms} onChange={(e) => setBathrooms(e.target.value)}>
              <option value="">Select Bathrooms</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="5+">5+</option>
            </select>
          </label>

          <label>
            Facing:
            <select value={facing} onChange={(e) => setFacing(e.target.value)}>
              <option value="">Select Facing</option>
              <option value="East">East</option>
              <option value="North">North</option>
              <option value="North-East">North-East</option>
              <option value="North-West">North-West</option>
              <option value="South">South</option>
              <option value="South-East">South-East</option>
              <option value="South-West">South-West</option>
              <option value="West">West</option>
            </select>
          </label>
        </div>

        <label>
          Location:
          <select value={location} onChange={(e) => setLocation(e.target.value)}>
            <option value="">Select Location</option>
            <option value="Vinewood">Vinewood</option>
            <option value="South Los Santos">South Los Santos</option>
            <option value="West Vinewood">West Vinewood</option>
            <option value="Paleto Bay">Paleto Bay</option>
            <option value="Blaine County">Blaine County</option>
            <option value="Mission Row">Mission Row</option>
            <option value="Rockford Hills">Rockford Hills</option>
            <option value="Del Perro">Del Perro</option>
            <option value="Sandy Shores">Sandy Shores</option>
            <option value="Los Santos International Airport (LSIA)">Los Santos International Airport (LSIA)</option>
            <option value="Chumash">Chumash</option>
            <option value="Davis">Davis</option>
            <option value="East Vinewood">East Vinewood</option>
            <option value="Grapeseed">Grapeseed</option>
          </select>
        </label>

        <fieldset>
          <legend>Features:</legend>
          <div className="featurex-grid">
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
