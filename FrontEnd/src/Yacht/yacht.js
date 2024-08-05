import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import './yacht.css';
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
const yachtData = [];

const Yachts = () => {
  const [yachts, setYachts] = useState(yachtData);
  const [filters, setFilters] = useState({
    type: null,
    hullMaterial: null,
    fuelType: null,
    length: { min: null, max: null },
    beam: { min: null, max: null },
    engines: null,
    deliveryDate: null,
    features: [],
    name: null,
    priceRange: { min: null, max: null },
    description: '',
    sort: null,
  });

  const [featureOptions, setFeatureOptions] = useState([]);

  const handleRadioChange = (filterType) => (event) => {
    const { value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value
    }));
  };

  const handleRangeChange = (filterType, name) => (event) => {
    const { value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: {
        ...prevFilters[filterType],
        [name]: value ? parseFloat(value) : null
      }
    }));
  };

  const handleInputChange = (filterType) => (event) => {
    const { value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value
    }));
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setFilters(prevFilters => {
      const features = checked
        ? [...prevFilters.features, value]
        : prevFilters.features.filter(feature => feature !== value);
      return { ...prevFilters, features };
    });
  };

  const applyFilters = async () => {
    const filterData = {
      yacht_type: filters.type,
      hull_material: filters.hullMaterial,
      fuel_type: filters.fuelType,
      length: filters.length,
      beam: filters.beam,
      number_of_engines: filters.engines,
      delivery_date: filters.deliveryDate,
      features: filters.features,
      search: filters.name,
      price: filters.priceRange,
      sort: filters.sort,
    };

    console.log('Filter data to be sent:', filterData);

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/products/yachts/`, filterData);
      setYachts(response.data.objects); // Assuming the backend returns the filtered yacht data
    } catch (error) {
      console.error('Error applying filters:', error);
      // Handle the error appropriately
    }
  };

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/products/yachts/');
        setFeatureOptions(response.data.features); // Assuming response has a "features" array
        setYachts(response.data.objects)
      } catch (error) {
        console.error('Error fetching features:', error);
      }
    };

    fetchFeatures();
  }, []);
  

  return (
    <div className="yacht-container">
      <div className="search-sort-container">
        <div className="search-input-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name..."
            onChange={handleInputChange('name')}
            className="search-input"
          />
        </div>
        <select onChange={handleInputChange('sort')}>
          <option value="none">Sort By</option>
          <option value="priceHighToLow">Price High to Low</option>
          <option value="priceLowToHigh">Price Low to High</option>
          <option value="whatsNew">What's New</option>
          <option value="customerRating">Customer Rating</option>
        </select>
        <button onClick={applyFilters}>Apply Filters</button>
      </div>

      <div className="main-content">
        <aside className="sidebar">
          <div className="filter-section">
            <h3>Yacht Type</h3>
            <div><input type="radio" name="type" value="Sail" onChange={handleRadioChange('type')} /><label>Sail</label></div>
            <div><input type="radio" name="type" value="Power" onChange={handleRadioChange('type')} /><label>Power</label></div>
          </div>

          <div className="filter-section">
            <h3>Hull Material</h3>
            {['Aluminum', 'Composite', 'Fiberglass', 'PVC', 'Steel', 'Wood'].map(material => (
              <div key={material}><input type="radio" name="hullMaterial" value={material} onChange={handleRadioChange('hullMaterial')} /><label>{material}</label></div>
            ))}
          </div>

          <div className="filter-section">
            <h3>Fuel Type</h3>
            {['Diesel', 'Electric', 'Petrol'].map(fuel => (
              <div key={fuel}><input type="radio" name="fuelType" value={fuel} onChange={handleRadioChange('fuelType')} /><label>{fuel}</label></div>
            ))}
          </div>

          <div className="filter-section">
            <h3>Length (in m)</h3>
            <label>Min:</label><input type="number" min="0" onChange={handleRangeChange('length', 'min')} />
            <label>Max:</label><input type="number" min="0" onChange={handleRangeChange('length', 'max')} />
          </div>

          <div className="filter-section">
            <h3>Beam (in m)</h3>
            <label>Min:</label><input type="number" min="0" onChange={handleRangeChange('beam', 'min')} />
            <label>Max:</label><input type="number" min="0" onChange={handleRangeChange('beam', 'max')} />
          </div>

          <div className="filter-section">
            <h3>Number Of Engines</h3>
            {['1', '2', '3', '4',  '4+'].map(engine => (
              <div key={engine}><input type="radio" name="engines" value={engine} onChange={handleRadioChange('engines')} /><label>{engine}</label></div>
            ))}
          </div>

          <div className="filter-section">
            <h3>Delivery Date</h3>
            <label>Latest By:</label><input type="date" onChange={handleInputChange('deliveryDate')} />
          </div>

          <div className="filter-section">
            <h3>Features</h3>
            {featureOptions.map(feature => (
              <div key={feature.id}><input type="checkbox" value={feature.id} onChange={handleCheckboxChange} /><label>{feature.name}</label></div>
            ))}
          </div>

          <div className="filter-section">
            <h3>Price Range</h3>
            <label>Min:</label><input type="number" min="0" onChange={handleRangeChange('priceRange', 'min')} />
            <label>Max:</label><input type="number" min="0" onChange={handleRangeChange('priceRange', 'max')} />
          </div>
        </aside>
        <main className="yacht-listing">
          <div className="yacht-grid">
            {yachts.map(yacht => (
              <div key={yacht.id} className="yacht-card">
                <Link to={`/detail/yacht/${yacht.id}`}>
              <img src={yacht.main_image} alt={yacht.title} />
                </Link>
                <h2>{yacht.title}</h2>
                <p>Price: ${yacht.price}</p>
                <div className="button-container">
                  <button className="btns-cart">Add to Cart</button>
                  <button className="btns-buy">Buy Now</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Yachts;
