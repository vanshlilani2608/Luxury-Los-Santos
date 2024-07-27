import React, { useState } from 'react';
import './yacht.css';

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
];

const Yachts = () => {
  const [yachts, setYachts] = useState(yachtData);
  const [filters, setFilters] = useState({
    type: [],
    hullMaterial: [],
    fuelType: [],
    length: { min: null, max: null },
    beam: { min: null, max: null },
    engines: [],
    deliveryDate: null,
    features: []
  });

  const handleFilterChange = (filterType, value) => (event) => {
    const { id, checked } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: checked
        ? [...prevFilters[filterType], value || id]
        : prevFilters[filterType].filter(item => item !== (value || id))
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

  const applyFilters = () => {
    let filteredYachts = yachtData;

    if (filters.type.length > 0) {
      filteredYachts = filteredYachts.filter(yacht => filters.type.includes(yacht.type));
    }
    if (filters.hullMaterial.length > 0) {
      filteredYachts = filteredYachts.filter(yacht => filters.hullMaterial.includes(yacht.hullMaterial));
    }
    if (filters.fuelType.length > 0) {
      filteredYachts = filteredYachts.filter(yacht => filters.fuelType.includes(yacht.fuelType));
    }
    if (filters.length.min !== null) {
      filteredYachts = filteredYachts.filter(yacht => yacht.length >= filters.length.min);
    }
    if (filters.length.max !== null) {
      filteredYachts = filteredYachts.filter(yacht => yacht.length <= filters.length.max);
    }
    if (filters.beam.min !== null) {
      filteredYachts = filteredYachts.filter(yacht => yacht.beam >= filters.beam.min);
    }
    if (filters.beam.max !== null) {
      filteredYachts = filteredYachts.filter(yacht => yacht.beam <= filters.beam.max);
    }
    if (filters.engines.length > 0) {
      filteredYachts = filteredYachts.filter(yacht => filters.engines.includes(yacht.engines));
    }
    if (filters.deliveryDate) {
      filteredYachts = filteredYachts.filter(yacht => new Date(yacht.deliveryDate) <= new Date(filters.deliveryDate));
    }
    if (filters.features.length > 0) {
      filteredYachts = filteredYachts.filter(yacht => filters.features.every(feature => yacht.features.includes(feature)));
    }

    setYachts(filteredYachts);
  };

  return (
    <div className="yacht-container">
      <aside className="sidebar">
        <div className="filter-section">
          <h3>Yacht Type</h3>
          <div><input type="checkbox" id="sail" onChange={handleFilterChange('type', 'Sail')} /><label htmlFor="sail">Sail</label></div>
          <div><input type="checkbox" id="power" onChange={handleFilterChange('type', 'Power')} /><label htmlFor="power">Power</label></div>
        </div>

        <div className="filter-section">
          <h3>Hull Material</h3>
          {['aluminum', 'composite', 'fiberglass', 'pvc', 'steel', 'wood'].map(material => (
            <div key={material}><input type="checkbox" id={material} onChange={handleFilterChange('hullMaterial')} /><label htmlFor={material}>{material.charAt(0).toUpperCase() + material.slice(1)}</label></div>
          ))}
        </div>

        <div className="filter-section">
          <h3>Fuel Type</h3>
          {['diesel', 'electric', 'petrol'].map(fuel => (
            <div key={fuel}><input type="checkbox" id={fuel} onChange={handleFilterChange('fuelType')} /><label htmlFor={fuel}>{fuel.charAt(0).toUpperCase() + fuel.slice(1)}</label></div>
          ))}
        </div>

        <div className="filter-section">
          <h3>Length (in m)</h3>
          <label>Minimum:</label><input type="number" min="0" onChange={handleRangeChange('length', 'min')} />
          <label>Maximum:</label><input type="number" min="0" onChange={handleRangeChange('length', 'max')} />
        </div>

        <div className="filter-section">
          <h3>Beam (in m)</h3>
          <label>Minimum:</label><input type="number" min="0" onChange={handleRangeChange('beam', 'min')} />
          <label>Maximum:</label><input type="number" min="0" onChange={handleRangeChange('beam', 'max')} />
        </div>

        <div className="filter-section">
          <h3>Number Of Engines</h3>
          {['1', '2', '3', '4plus'].map(engine => (
            <div key={engine}><input type="checkbox" id={engine} onChange={handleFilterChange('engines', engine)} /><label htmlFor={engine}>{engine}</label></div>
          ))}
        </div>

        <div className="filter-section">
          <h3>Delivery Date</h3>
          <label>Latest By:</label><input type="date" onChange={handleFilterChange('deliveryDate')} />
        </div>

        <div className="filter-section">
          <h3>Features</h3>
          {['airconditioning', 'generator', 'helipad', 'jacuzzi', 'solar', 'watermaker', 'pool', 'cinema'].map(feature => (
            <div key={feature}><input type="checkbox" id={feature} onChange={handleFilterChange('features', feature)} /><label htmlFor={feature}>{feature.charAt(0).toUpperCase() + feature.slice(1).replace(/([A-Z])/g, ' $1')}</label></div>
          ))}
        </div>
        
        <button onClick={applyFilters}>Apply Filters</button>
      </aside>

      <main className="main-content">
        <div className="yacht-grid">
          {yachts.map(yacht => (
            <div key={yacht.id} className="yacht-card">
              <div className='product-image'>
              <img src={yacht.imgSrc} alt={yacht.name} />
              </div>
              <h4>{yacht.name}</h4>
              <p>Type: {yacht.type}</p>
              <p>Length: {yacht.length} m</p>
              <p>Beam: {yacht.beam} m</p>
              <p>Engines: {yacht.engines}</p>
              <p>Delivery Date: {yacht.deliveryDate}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Yachts;
