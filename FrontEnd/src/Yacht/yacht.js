import React, { useState } from 'react';
import axios from 'axios';
import './yacht.css';
import { FaSearch } from "react-icons/fa";

const yachtData = [
  { id: 1, name: "Sail Yacht 1", imgSrc: "/images/bg.png", type: "Sail", hullMaterial: "Fiberglass", fuelType: "Diesel", length: 30, beam: 6, engines: 1, deliveryDate: "2023-08-01", features: ["Air Conditioning", "Generator"] },
  { id: 2, name: "Power Yacht 1", imgSrc: "poweryacht1.jpg", type: "Power", hullMaterial: "Aluminum", fuelType: "Petrol", length: 50, beam: 8, engines: 2, deliveryDate: "2023-08-15", features: ["Helipad", "Jacuzzi"] },
  { id: 3, name: "Sail Yacht 2", imgSrc: "sailyacht2.jpg", type: "Sail", hullMaterial: "Wood", fuelType: "Electric", length: 40, beam: 7, engines: 1, deliveryDate: "2023-09-01", features: ["Solar Panels", "Water Maker"] },
  { id: 4, name: "Power Yacht 2", imgSrc: "poweryacht2.jpg", type: "Power", hullMaterial: "Steel", fuelType: "Diesel", length: 60, beam: 10, engines: 3, deliveryDate: "2023-10-01", features: ["Pool", "Cinema Room"] },
  { id: 5, name: "Sail Yacht 3", imgSrc: "sailyacht3.jpg", type: "Sail", hullMaterial: "Composite", fuelType: "Petrol", length: 35, beam: 7, engines: 1, deliveryDate: "2023-11-01", features: ["Air Conditioning", "Helipad"] },
  { id: 6, name: "Power Yacht 3", imgSrc: "poweryacht3.jpg", type: "Power", hullMaterial: "Fiberglass", fuelType: "Diesel", length: 45, beam: 9, engines: 2, deliveryDate: "2023-12-01", features: ["Jacuzzi", "Generator"] },
  { id: 7, name: "Sail Yacht 4", imgSrc: "sailyacht4.jpg", type: "Sail", hullMaterial: "PVC", fuelType: "Electric", length: 25, beam: 5, engines: 1, deliveryDate: "2024-01-01", features: ["Solar Panels", "Pool"] },
  { id: 8, name: "Power Yacht 4", imgSrc: "poweryacht4.jpg", type: "Power", hullMaterial: "Composite", fuelType: "Petrol", length: 55, beam: 11, engines: 4, deliveryDate: "2024-02-01", features: ["Cinema Room", "Air Conditioning"] },
  { id: 9, name: "Sail Yacht 5", imgSrc: "sailyacht5.jpg", type: "Sail", hullMaterial: "Wood", fuelType: "Diesel", length: 20, beam: 4, engines: 1, deliveryDate: "2024-03-01", features: ["Water Maker", "Helipad"] },
  { id: 10, name: "Power Yacht 5", imgSrc: "poweryacht5.jpg", type: "Power", hullMaterial: "Fiberglass", fuelType: "Electric", length: 65, beam: 12, engines: 3, deliveryDate: "2024-04-01", features: ["Generator", "Pool"] },
  { id: 11, name: "Sail Yacht 6", imgSrc: "sailyacht6.jpg", type: "Sail", hullMaterial: "Composite", fuelType: "Petrol", length: 40, beam: 8, engines: 1, deliveryDate: "2024-05-01", features: ["Solar Panels", "Cinema Room"] },
  { id: 12, name: "Power Yacht 6", imgSrc: "poweryacht6.jpg", type: "Power", hullMaterial: "Steel", fuelType: "Diesel", length: 50, beam: 10, engines: 2, deliveryDate: "2024-06-01", features: ["Helipad", "Air Conditioning"] },
  { id: 13, name: "Sail Yacht 7", imgSrc: "sailyacht7.jpg", type: "Sail", hullMaterial: "Fiberglass", fuelType: "Electric", length: 30, beam: 6, engines: 1, deliveryDate: "2024-07-01", features: ["Pool", "Water Maker"] },
  { id: 14, name: "Power Yacht 7", imgSrc: "poweryacht7.jpg", type: "Power", hullMaterial: "Aluminum", fuelType: "Petrol", length: 60, beam: 12, engines: 4, deliveryDate: "2024-08-01", features: ["Jacuzzi", "Cinema Room"] },
  { id: 15, name: "Sail Yacht 8", imgSrc: "sailyacht8.jpg", type: "Sail", hullMaterial: "Composite", fuelType: "Diesel", length: 35, beam: 7, engines: 1, deliveryDate: "2024-09-01", features: ["Air Conditioning", "Generator"] },
  { id: 16, name: "Power Yacht 8", imgSrc: "poweryacht8.jpg", type: "Power", hullMaterial: "Steel", fuelType: "Electric", length: 55, beam: 11, engines: 3, deliveryDate: "2024-10-01", features: ["Solar Panels", "Cinema Room"] },
  { id: 17, name: "Sail Yacht 9", imgSrc: "sailyacht9.jpg", type: "Sail", hullMaterial: "Fiberglass", fuelType: "Petrol", length: 25, beam: 5, engines: 1, deliveryDate: "2024-11-01", features: ["Helipad", "Pool"] },
  { id: 18, name: "Power Yacht 9", imgSrc: "poweryacht9.jpg", type: "Power", hullMaterial: "Aluminum", fuelType: "Diesel", length: 65, beam: 12, engines: 4, deliveryDate: "2024-12-01", features: ["Generator", "Air Conditioning"] },
  { id: 19, name: "Sail Yacht 10", imgSrc: "sailyacht10.jpg", type: "Sail", hullMaterial: "Composite", fuelType: "Electric", length: 40, beam: 8, engines: 1, deliveryDate: "2025-01-01", features: ["Water Maker", "Cinema Room"] },
  { id: 20, name: "Power Yacht 10", imgSrc: "poweryacht10.jpg", type: "Power", hullMaterial: "Steel", fuelType: "Petrol", length: 70, beam: 14, engines: 4, deliveryDate: "2025-02-01", features: ["Helipad", "Pool"] },
  { id: 20, name: "Power Yacht 10", imgSrc: "poweryacht10.jpg", type: "Power", hullMaterial: "Steel", fuelType: "Petrol", length: 70, beam: 14, engines: 4, deliveryDate: "2025-02-01", features: ["Helipad", "Pool"] },
];

const Yachts = () => {
  const [yachts, setYachts] = useState(yachtData);
  const [filters, setFilters] = useState({
    type: '',
    hullMaterial: '',
    fuelType: '',
    length: { min: null, max: null },
    beam: { min: null, max: null },
    engines: '',
    deliveryDate: null,
    features: [],
    name: '',
    priceRange: { min: null, max: null },
    description: '',
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

  const applyFilters = async () => {
    const filterData = {
      type: filters.type,
      hullMaterial: filters.hullMaterial,
      fuelType: filters.fuelType,
      length: filters.length,
      beam: filters.beam,
      engines: filters.engines,
      deliveryDate: filters.deliveryDate,
      features: filters.features,
      name: filters.name,
      priceRange: filters.priceRange,
      description: filters.description,
      sort: filters.sort,
    };

    try {
      const response = await axios.post('https://your-backend-endpoint.com/api/filter-yachts', filterData);
      setYachts(response.data); // Assuming the backend returns the filtered yacht data
    } catch (error) {
      console.error('Error applying filters:', error);
      // Handle the error appropriately
    }
  };

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
            {['1', '2', '3', '4 +'].map(engine => (
              <div key={engine}><input type="radio" name="engines" value={engine} onChange={handleRadioChange('engines')} /><label>{engine}</label></div>
            ))}
          </div>

          <div className="filter-section">
            <h3>Delivery Date</h3>
            <label>Latest By:</label><input type="date" onChange={handleInputChange('deliveryDate')} />
          </div>

          <div className="filter-section">
            <h3>Features</h3>
            {['Spa and Wellness Center', 'Swimming Pool', 'Helipad', 'Gymnasium', 'Fishing Equipment', 'Cinema Room', 'Wine Cellar', 'Sun Lounger', 'Cinema Room', 'Water Toys', 'Beach Club', 'Scenic Sundeck', 'Gourmet Kitchen', 'Private Suite', 'Dining Area', 'Office Space', 'BBQ Grill', 'High-Speed Internet'].map(feature => (
              <div key={feature}><input type="checkbox" value={feature} onChange={handleCheckboxChange} /><label>{feature}</label></div>
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
                <img src={yacht.imgSrc} alt={yacht.name} />
                <h2>{yacht.name}</h2>
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
