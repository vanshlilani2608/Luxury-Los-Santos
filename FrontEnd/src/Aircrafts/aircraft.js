import React, { useState } from 'react';
import './aircraft.css';
import { FaSearch } from 'react-icons/fa';


const aircraftData = [
  { id: 1, name: "Gulfstream G650", imgSrc: "/images/aircraft1.jpg", type: "Heavy Jet", features: ["Bedroom", "Conference Room"], passengerCapacity: 20, price: 65000000 },
  { id: 2, name: "Bombardier Learjet 75", imgSrc: "/images/aircraft2.jpg", type: "Light Jet", features: ["Bathrooms", "Workout Area"], passengerCapacity: 8, price: 16000000 },
  { id: 3, name: "Cessna Citation XLS+", imgSrc: "/images/aircraft3.jpg", type: "Midsize Jet", features: ["Gourmet Kitchen", "Wine Cellar"], passengerCapacity: 12, price: 12000000 },
  { id: 4, name: "Dassault Falcon 7X", imgSrc: "/images/aircraft4.jpg", type: "Large Cabin", features: ["Lavish Decor", "Panoramic Windows"], passengerCapacity: 18, price: 54000000 },
  { id: 5, name: "Piper Aerostar 600", imgSrc: "/images/aircraft5.jpg", type: "Piston Twin", features: ["Satellite TV", "Reclining Seats"], passengerCapacity: 10, price: 4000000 },
  { id: 6, name: "Boeing Business Jet (BBJ)", imgSrc: "/images/aircraft6.jpg", type: "Super Heavy Jet", features: ["Wine Cellar", "Soundproof Cabins"], passengerCapacity: 25, price: 85000000 },
  { id: 7, name: "Beechcraft King Air 350i", imgSrc: "/images/aircraft7.jpg", type: "Turbo Prop", features: ["Workout Area", "Gourmet Kitchen"], passengerCapacity: 15, price: 7000000 },
  { id: 8, name: "AgustaWestland AW139", imgSrc: "/images/aircraft8.jpg", type: "Helicopter", features: ["Satellite TV"], passengerCapacity: 6, price: 11000000 },
  { id: 9, name: "Embraer Phenom 100", imgSrc: "/images/aircraft9.jpg", type: "Super Light Jet", features: ["Bathrooms", "Reclining Seats"], passengerCapacity: 8, price: 3500000 },
  { id: 10, name: "Cirrus SR22", imgSrc: "/images/aircraft10.jpg", type: "Piston Single", features: ["Panoramic Windows", "Soundproof Cabins"], passengerCapacity: 4, price: 700000 },
  { id: 11, name: "Hawker 800XP", imgSrc: "/images/aircraft11.jpg", type: "Heavy Jet", features: ["Conference Room", "Wine Cellar"], passengerCapacity: 22, price: 4000000 },
  { id: 12, name: "Cessna Citation M2", imgSrc: "/images/aircraft12.jpg", type: "Light Jet", features: ["Reclining Seats", "Gourmet Kitchen"], passengerCapacity: 7, price: 5600000 },
  { id: 13, name: "Learjet 75 Liberty", imgSrc: "/images/aircraft13.jpg", type: "Midsize Jet", features: ["Lavish Decor", "Satellite TV"], passengerCapacity: 14, price: 9000000 },
  { id: 14, name: "Gulfstream G550", imgSrc: "/images/aircraft14.jpg", type: "Large Cabin", features: ["Panoramic Windows", "Bathrooms"], passengerCapacity: 20, price: 60000000 },
  { id: 15, name: "Piper Navajo Chieftain", imgSrc: "/images/aircraft15.jpg", type: "Piston Twin", features: ["Soundproof Cabins", "Workout Area"], passengerCapacity: 12, price: 700000 },
  { id: 16, name: "Bombardier Global 6000", imgSrc: "/images/aircraft16.jpg", type: "Super Heavy Jet", features: ["Wine Cellar", "Reclining Seats"], passengerCapacity: 30, price: 65000000 },
  { id: 17, name: "Pilatus PC-12", imgSrc: "/images/aircraft17.jpg", type: "Turbo Prop", features: ["Gourmet Kitchen", "Satellite TV"], passengerCapacity: 18, price: 4500000 },
  { id: 18, name: "Eurocopter EC135", imgSrc: "/images/aircraft18.jpg", type: "Helicopter", features: ["Panoramic Windows"], passengerCapacity: 8, price: 3500000 },
  { id: 19, name: "HondaJet Elite", imgSrc: "/images/aircraft19.jpg", type: "Super Light Jet", features: ["Bathrooms", "Lavish Decor"], passengerCapacity: 9, price: 5500000 },
  { id: 20, name: "Mooney M20V Acclaim", imgSrc: "/images/aircraft20.jpg", type: "Piston Single", features: ["Reclining Seats", "Satellite TV"], passengerCapacity: 5, price: 500000 },
  // Add more aircraft data as needed
];


const Aircrafts = () => {
  const [aircrafts, setAircrafts] = useState(aircraftData);
  const [filters, setFilters] = useState({
    type: '',
    passengerCapacity: { min: null, max: null },
    features: [],
    name: '',
    priceRange: { min: null, max: null },
    sort: 'none',
  });

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

  const applyFilters = () => {
    let filteredAircrafts = aircraftData;

    if (filters.type) {
      filteredAircrafts = filteredAircrafts.filter(aircraft => aircraft.type === filters.type);
    }
    if (filters.passengerCapacity.min !== null) {
      filteredAircrafts = filteredAircrafts.filter(aircraft => aircraft.passengerCapacity >= filters.passengerCapacity.min);
    }
    if (filters.passengerCapacity.max !== null) {
      filteredAircrafts = filteredAircrafts.filter(aircraft => aircraft.passengerCapacity <= filters.passengerCapacity.max);
    }
    if (filters.features.length > 0) {
      filteredAircrafts = filteredAircrafts.filter(aircraft => filters.features.every(feature => aircraft.features.includes(feature)));
    }
    if (filters.name) {
      filteredAircrafts = filteredAircrafts.filter(aircraft => aircraft.name.toLowerCase().includes(filters.name.toLowerCase()));
    }
    if (filters.priceRange.min !== null) {
      filteredAircrafts = filteredAircrafts.filter(aircraft => aircraft.price >= filters.priceRange.min);
    }
    if (filters.priceRange.max !== null) {
      filteredAircrafts = filteredAircrafts.filter(aircraft => aircraft.price <= filters.priceRange.max);
    }

    if (filters.sort === 'priceHighToLow') {
      filteredAircrafts.sort((a, b) => b.price - a.price);
    } else if (filters.sort === 'priceLowToHigh') {
      filteredAircrafts.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'whatsNew') {
      filteredAircrafts.sort((a, b) => b.id - a.id);
    } else if (filters.sort === 'customerRating') {
      filteredAircrafts.sort((a, b) => b.customerRating - a.customerRating);
    }

    setAircrafts(filteredAircrafts);
  };

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
            {['Any Type', 'Heavy Jet', 'Light Jet', 'Midsize Jet', 'Large Cabin', 'Piston Single', 'Piston Twin', 'Super Heavy Jet', 'Super Light Jet', 'Super Midsize Jet', 'Turbo Prop', 'Helicopter'].map(type => (
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
            {['Bedroom', 'Conference Room', 'Bathrooms', 'Workout Area', 'Gourmet Kitchen', 'Wine Cellar', 'Lavish Decor', 'Soundproof Cabins', 'Reclining Seats', 'Satellite TV', 'Storage Compartments', 'Panoramic Windows'].map(feature => (
              <div key={feature}><input type="checkbox" value={feature} onChange={handleCheckboxChange} /><label>{feature}</label></div>
            ))}
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
                <img src={aircraft.imgSrc} alt={aircraft.name} />
                <h2>{aircraft.name}</h2>
                <p>Price: ${aircraft.price}</p>
                <p>Passenger Capacity: {aircraft.passengerCapacity}</p>
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
