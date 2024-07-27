import React, { useState } from 'react';
import './aircraft.css';

const aircraftData = [
  { id: 1, name: "Heavy Jet 1", imgSrc: "heavyjet1.jpg", type: "Heavy Jet", passengers: 50, deliveryDate: "2023-08-01", features: ["Bedroom", "Conference Room"] },
  { id: 2, name: "Light Jet 1", imgSrc: "lightjet1.jpg", type: "Light Jet", passengers: 10, deliveryDate: "2023-08-15", features: ["Kitchen", "Wine Cellar"] },
  { id: 3, name: "Midsize Jet 1", imgSrc: "midsizejet1.jpg", type: "Midsize Jet", passengers: 25, deliveryDate: "2023-09-01", features: ["Workout Area", "Bathrooms"] },
  { id: 4, name: "Helicopter 1", imgSrc: "helicopter1.jpg", type: "Helicopter", passengers: 6, deliveryDate: "2023-10-01", features: ["Conference Room", "Wine Cellar"] },
];

const Aircrafts = () => {
  const [aircrafts, setAircrafts] = useState(aircraftData);
  const [selectedType, setSelectedType] = useState("");

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    // Implement sorting logic based on checkbox change
  };

  return (
    <div className="aircraft-container">
      <aside className="sidebar">
        <div className="filter-section">
          <h3>Plane Types</h3>
          <div><input type="checkbox" id="any" name="any" value="Any Type" onChange={handleTypeChange} /><label htmlFor="any">Any Type</label></div>
          <div><input type="checkbox" id="heavyjet" name="heavyjet" value="Heavy Jet" onChange={handleTypeChange} /><label htmlFor="heavyjet">Heavy Jet</label></div>
          <div><input type="checkbox" id="lightjet" name="lightjet" value="Light Jet" onChange={handleTypeChange} /><label htmlFor="lightjet">Light Jet</label></div>
          <div><input type="checkbox" id="midsizejet" name="midsizejet" value="Midsize Jet" onChange={handleTypeChange} /><label htmlFor="midsizejet">Midsize Jet</label></div>
          <div><input type="checkbox" id="largecabin" name="largecabin" value="Large Cabin" onChange={handleTypeChange} /><label htmlFor="largecabin">Large Cabin</label></div>
          <div><input type="checkbox" id="pistonsingle" name="pistonsingle" value="Piston Single" onChange={handleTypeChange} /><label htmlFor="pistonsingle">Piston Single</label></div>
          <div><input type="checkbox" id="pistontwin" name="pistontwin" value="Piston Twin" onChange={handleTypeChange} /><label htmlFor="pistontwin">Piston Twin</label></div>
          <div><input type="checkbox" id="superheavyjet" name="superheavyjet" value="Super Heavy Jet" onChange={handleTypeChange} /><label htmlFor="superheavyjet">Super Heavy Jet</label></div>
          <div><input type="checkbox" id="superlightjet" name="superlightjet" value="Super Light Jet" onChange={handleTypeChange} /><label htmlFor="superlightjet">Super Light Jet</label></div>
          <div><input type="checkbox" id="supermidsizejet" name="supermidsizejet" value="Super Midsize Jet" onChange={handleTypeChange} /><label htmlFor="supermidsizejet">Super Midsize Jet</label></div>
          <div><input type="checkbox" id="turboprop" name="turboprop" value="Turbo Prop" onChange={handleTypeChange} /><label htmlFor="turboprop">Turbo Prop</label></div>
          <div><input type="checkbox" id="helicopter" name="helicopter" value="Helicopter" onChange={handleTypeChange} /><label htmlFor="helicopter">Helicopter</label></div>
        </div>

        <div className="filter-section">
          <h3>Passenger (2 - 150)</h3>
          <label>Minimum:</label><input type="number" min="2" max="150" onChange={handleCheckboxChange} />
          <label>Maximum:</label><input type="number" min="2" max="150" onChange={handleCheckboxChange} />
        </div>

        <div className="filter-section">
          <h3>Delivery Date</h3>
          <label>Latest By:</label><input type="date" onChange={handleCheckboxChange} />
        </div>

        <div className="filter-section">
          <h3>Features</h3>
          <div><input type="checkbox" id="bedroom" name="bedroom" onChange={handleCheckboxChange} /><label htmlFor="bedroom">Bedroom</label></div>
          <div><input type="checkbox" id="conference" name="conference" onChange={handleCheckboxChange} /><label htmlFor="conference">Conference Room</label></div>
          <div><input type="checkbox" id="bathrooms" name="bathrooms" onChange={handleCheckboxChange} /><label htmlFor="bathrooms">Bathrooms</label></div>
          <div><input type="checkbox" id="workout" name="workout" onChange={handleCheckboxChange} /><label htmlFor="workout">Workout Area</label></div>
          <div><input type="checkbox" id="kitchen" name="kitchen" onChange={handleCheckboxChange} /><label htmlFor="kitchen">Kitchen</label></div>
          <div><input type="checkbox" id="wine" name="wine" onChange={handleCheckboxChange} /><label htmlFor="wine">Wine Cellar</label></div>
        </div>
      </aside>
      <main className="main-content">
        <div className="aircraft-grid">
          {aircrafts.map(aircraft => (
            <div key={aircraft.id} className="aircraft-card">
              <img src={aircraft.imgSrc} alt={aircraft.name} />
              <h4>{aircraft.name}</h4>
              <p>{aircraft.type}</p>
              <p>Passengers: {aircraft.passengers}</p>
              <p>Delivery Date: {aircraft.deliveryDate}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Aircrafts;
