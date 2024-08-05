import React, { useState, useEffect } from 'react';
import './aircraft.css';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';


const aircraftData = [];



const Aircrafts = () => {
  const [aircrafts, setAircrafts] = useState(aircraftData);
  const [filters, setFilters] = useState({
    type: null,
    passengerCapacity: { min: null, max: null },
    features: [],
    name: null,
    priceRange: { min: null, max: null },
    sort: null,
    deliveryDate: null,

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
      plane_type: filters.type,
      passenger_capacity: filters.passengerCapacity,
      delivery_date: filters.deliveryDate,
      features: filters.features,
      search: filters.name,
      price: filters.priceRange,
      sort: filters.sort,
    };

    console.log('Filter data to be sent:', filterData);

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/products/aircrafts/`, filterData);
      console.log(response.data)
      setAircrafts(response.data.objects); // Assuming the backend returns the filtered yacht data
    } catch (error) {
      console.error('Error applying filters:', error);
      // Handle the error appropriately
    }

  };

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/products/aircrafts/');
        console.log(response.data )
        setFeatureOptions(response.data.features); // Assuming response has a "features" array
        setAircrafts(response.data.objects)
      } catch (error) {
        console.error('Error fetching features:', error);
      }
    };

    fetchFeatures();
  }, []);

  return (
    <div className="aircraft-container">
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
        <aside className="sidebara">
          <div className="filter-section">
            <h3>Aircraft Type</h3>
            {['Heavy Jet', 'Light Jet', 'Midsize Jet', 'Large Cabin', 'Piston Single', 'Piston Twin', 'Super Heavy Jet', 'Super Light Jet', 'Super Midsize Jet', 'Turbo Prop', 'Helicopter'].map(type => (
              <div key={type}><input type="radio" name="type" value={type} onChange={handleRadioChange('type')} /><label>{type}</label></div>
            ))}
          </div>

          <div className="filter-section">
            <h3>Passenger Capacity</h3>
            <label>Min:</label><input type="number" min="0" onChange={handleRangeChange('passengerCapacity', 'min')} />
            <label>Max:</label><input type="number" min="0" onChange={handleRangeChange('passengerCapacity', 'max')} />
          </div>

          <div className="filter-section">
            <h3>Features</h3>
            {featureOptions.map(feature => (
              <div key={feature.id}><input type="checkbox" value={feature.id} onChange={handleCheckboxChange} /><label>{feature.name}</label></div>
            ))}
          </div>

          <div className="filter-section">
            <h3>Delivery Date</h3>
            <label>Latest By:</label><input type="date" onChange={handleInputChange('deliveryDate')} />
          </div>

          <div className="filter-section">
            <h3>Price Range</h3>
            <label>Min:</label><input type="number" min="0" onChange={handleRangeChange('priceRange', 'min')} />
            <label>Max:</label><input type="number" min="0" onChange={handleRangeChange('priceRange', 'max')} />
          </div>
        </aside>

        <main className="aircraft-listing">
          <div className="aircraft-grid">
            {aircrafts.map(aircraft => (
              <div key={aircraft.id} className="aircraft-card">
                <img src={aircraft.main_image} alt={aircraft.title} />
                <h2>{aircraft.title}</h2>
                <p>Price: ${aircraft.price}</p>
                {/* <p>Passenger Capacity: {aircraft.}</p> */}
                <div className="button-container">
                  <button className="bttns-cart">Add to Cart</button>
                  <button className="bttns-buy">Buy Now</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Aircrafts;
