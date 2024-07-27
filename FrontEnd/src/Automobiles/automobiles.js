import React, { useState } from 'react';
import './automobiles.css';

const automobileData = [
  { id: 1, name: "Car 1", imgSrc: "/images/car1.jpg", type: "Car", bodyType: "SUV", transmission: "Automatic", seatingCapacity: 5, deliveryDate: "2023-08-01", fuelType: "Diesel", features: ["Air Conditioning", "Power Steering"] },
  { id: 2, name: "Bike 1", imgSrc: "/images/bike1.jpg", type: "Bike", fuelType: "Petrol", deliveryDate: "2023-08-15", features: ["ABS", "LED Headlights"] },
  { id: 3, name: "Car 2", imgSrc: "/images/car2.jpg", type: "Car", bodyType: "Sedan", transmission: "Manual", seatingCapacity: 5, deliveryDate: "2023-09-01", fuelType: "Electric", features: ["Sunroof", "Bluetooth"] },
  { id: 4, name: "Bike 2", imgSrc: "/images/bike2.jpg", type: "Bike", fuelType: "Electric", deliveryDate: "2023-10-01", features: ["Fast Charging", "GPS"] },
];

const Automobiles = () => {
  const [automobiles, setAutomobiles] = useState(automobileData);
  const [selectedType, setSelectedType] = useState("");

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    // Implement sorting logic based on checkbox change
  };

  return (
    <div className="automobile-container">
      <aside className="sidebar">
        <div className="filter-section">
          <h3>Automobile Type</h3>
          <div>
            <input 
              type="checkbox" 
              id="bike" 
              name="bike" 
              value="Bike"
              onChange={handleTypeChange} 
            />
            <label htmlFor="bike">Bike</label>
          </div>
          <div>
            <input 
              type="checkbox" 
              id="car" 
              name="car" 
              value="Car" 
              onChange={handleTypeChange} 
            />
            <label htmlFor="car">Car</label>
          </div>
        </div>

        <div className={`filter-section ${selectedType === "Bike" ? "disabled" : ""}`}>
          <h3>Body Type</h3>
          <div><input type="checkbox" id="sports" name="sports" onChange={handleCheckboxChange} /><label htmlFor="sports">Sports</label></div>
          <div><input type="checkbox" id="suv" name="suv" onChange={handleCheckboxChange} /><label htmlFor="suv">SUV</label></div>
          <div><input type="checkbox" id="sedan" name="sedan" onChange={handleCheckboxChange} /><label htmlFor="sedan">Sedan</label></div>
          <div><input type="checkbox" id="hatchback" name="hatchback" onChange={handleCheckboxChange} /><label htmlFor="hatchback">Hatchback</label></div>
          <div><input type="checkbox" id="muv" name="muv" onChange={handleCheckboxChange} /><label htmlFor="muv">MUV</label></div>
          <div><input type="checkbox" id="compactsedan" name="compactsedan" onChange={handleCheckboxChange} /><label htmlFor="compactsedan">Compact Sedan</label></div>
          <div><input type="checkbox" id="compactsuv" name="compactsuv" onChange={handleCheckboxChange} /><label htmlFor="compactsuv">Compact SUV</label></div>
          <div><input type="checkbox" id="convertible" name="convertible" onChange={handleCheckboxChange} /><label htmlFor="convertible">Convertible</label></div>
          <div><input type="checkbox" id="coupe" name="coupe" onChange={handleCheckboxChange} /><label htmlFor="coupe">Coupe</label></div>
          <div><input type="checkbox" id="stationwagon" name="stationwagon" onChange={handleCheckboxChange} /><label htmlFor="stationwagon">Station Wagon</label></div>
          <div><input type="checkbox" id="minivan" name="minivan" onChange={handleCheckboxChange} /><label htmlFor="minivan">Minivan</label></div>
          <div><input type="checkbox" id="truck" name="truck" onChange={handleCheckboxChange} /><label htmlFor="truck">Truck</label></div>
        </div>

        <div className={`filter-section ${selectedType === "Bike" ? "disabled" : ""}`}>
          <h3>Transmission</h3>
          <div><input type="checkbox" id="automatic" name="automatic" onChange={handleCheckboxChange} /><label htmlFor="automatic">Automatic</label></div>
          <div><input type="checkbox" id="manual" name="manual" onChange={handleCheckboxChange} /><label htmlFor="manual">Manual</label></div>
        </div>

        <div className={`filter-section ${selectedType === "Bike" ? "disabled" : ""}`}>
          <h3>Seating Capacity</h3>
          <div><input type="checkbox" id="5" name="5" onChange={handleCheckboxChange} /><label htmlFor="5">5</label></div>
          <div><input type="checkbox" id="6" name="6" onChange={handleCheckboxChange} /><label htmlFor="6">6</label></div>
          <div><input type="checkbox" id="7" name="7" onChange={handleCheckboxChange} /><label htmlFor="7">7</label></div>
          <div><input type="checkbox" id="8" name="8" onChange={handleCheckboxChange} /><label htmlFor="8">8</label></div>
        </div>

        <div className="filter-section">
          <h3>Delivery Date</h3>
          <label>Latest By:</label><input type="date" onChange={handleCheckboxChange} />
        </div>

        <div className="filter-section">
          <h3>Fuel Type</h3>
          <div><input type="checkbox" id="diesel" name="diesel" onChange={handleCheckboxChange} disabled={selectedType === "Bike"} /><label htmlFor="diesel">Diesel</label></div>
          <div><input type="checkbox" id="electric" name="electric" onChange={handleCheckboxChange} /><label htmlFor="electric">Electric</label></div>
          <div><input type="checkbox" id="gas" name="gas" onChange={handleCheckboxChange} disabled={selectedType === "Bike"} /><label htmlFor="gas">Gas</label></div>
          <div><input type="checkbox" id="hybrid" name="hybrid" onChange={handleCheckboxChange} disabled={selectedType === "Bike"} /><label htmlFor="hybrid">Hybrid</label></div>
          <div><input type="checkbox" id="naturalgas" name="naturalgas" onChange={handleCheckboxChange} disabled={selectedType === "Bike"} /><label htmlFor="naturalgas">Natural Gas</label></div>
          <div><input type="checkbox" id="hydrogen" name="hydrogen" onChange={handleCheckboxChange} disabled={selectedType === "Bike"} /><label htmlFor="hydrogen">Hydrogen</label></div>
        </div>
      </aside>
      <main className="main-content">
        <div className="automobile-grid">
          {automobiles.map(auto => (
            <div key={auto.id} className="automobile-card">
              <img src={auto.imgSrc} alt={auto.name} />
              <h4>{auto.name}</h4>
              <p>Type: {auto.type}</p>
              <p>{auto.bodyType && `Body Type: ${auto.bodyType}`}</p>
              <p>{auto.transmission && `Transmission: ${auto.transmission}`}</p>
              <p>{auto.seatingCapacity && `Seating Capacity: ${auto.seatingCapacity}`}</p>
              <p>Fuel Type: {auto.fuelType}</p>
              <p>Delivery Date: {auto.deliveryDate}</p>
              <ul>
                {auto.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Automobiles;
