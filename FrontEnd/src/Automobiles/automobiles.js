import React, { useState } from 'react';
import './automobiles.css'; // Make sure to update your CSS file
import { FaSearch } from "react-icons/fa";

const automobileData = [
  // **Bikes**
  { id: 1, name: "Yamaha YZF-R1", imgSrc: "/images/bike1.png", type: "Bike", bodyType: "Sport", transmission: "Manual", seatingCapacity: 2, deliveryDate: "2023-08-01", fuelType: "Petrol", features: ["Navigation System", "Bluetooth"], price: 20000 },
  { id: 2, name: "Kawasaki Ninja ZX-10R", imgSrc: "/images/bike2.png", type: "Bike", bodyType: "Sport", transmission: "Manual", seatingCapacity: 2, deliveryDate: "2023-09-15", fuelType: "Petrol", features: ["Bluetooth"], price: 22000 },
  { id: 3, name: "Harley-Davidson Street Glide", imgSrc: "/images/bike3.png", type: "Bike", bodyType: "Cruiser", transmission: "Automatic", seatingCapacity: 2, deliveryDate: "2023-09-01", fuelType: "Petrol", features: ["Navigation System", "Heated Seats"], price: 25000 },
  { id: 4, name: "BMW R1250GS", imgSrc: "/images/bike4.png", type: "Bike", bodyType: "Adventure", transmission: "Automatic", seatingCapacity: 2, deliveryDate: "2023-12-01", fuelType: "Petrol", features: ["Bluetooth"], price: 28000 },
  { id: 5, name: "Ducati Panigale V4", imgSrc: "/images/bike5.png", type: "Bike", bodyType: "Sport", transmission: "Manual", seatingCapacity: 2, deliveryDate: "2024-01-01", fuelType: "Petrol", features: ["Navigation System"], price: 30000 },
  { id: 6, name: "Indian Chief Dark Horse", imgSrc: "/images/bike6.png", type: "Bike", bodyType: "Cruiser", transmission: "Manual", seatingCapacity: 2, deliveryDate: "2023-08-25", fuelType: "Petrol", features: ["Bluetooth"], price: 26000 },
  { id: 7, name: "Honda CBR1000RR-R", imgSrc: "/images/bike7.png", type: "Bike", bodyType: "Sport", transmission: "Manual", seatingCapacity: 2, deliveryDate: "2023-11-01", fuelType: "Petrol", features: ["GPS"], price: 23000 },
  { id: 8, name: "Suzuki Hayabusa", imgSrc: "/images/bike8.png", type: "Bike", bodyType: "Sport", transmission: "Manual", seatingCapacity: 2, deliveryDate: "2023-12-20", fuelType: "Petrol", features: ["Bluetooth"], price: 25000 },
  { id: 9, name: "Triumph Tiger 900", imgSrc: "/images/bike9.png", type: "Bike", bodyType: "Adventure", transmission: "Automatic", seatingCapacity: 2, deliveryDate: "2023-10-15", fuelType: "Petrol", features: ["Navigation System"], price: 27000 },
  { id: 10, name: "KTM 1290 Super Adventure R", imgSrc: "/images/bike10.png", type: "Bike", bodyType: "Adventure", transmission: "Manual", seatingCapacity: 2, deliveryDate: "2023-11-10", fuelType: "Petrol", features: ["Bluetooth"], price: 29000 },

  // **Cars**
  { id: 11, name: "Tesla Model S", imgSrc: "/images/car1.png", type: "Car", bodyType: "Sedan", transmission: "Automatic", seatingCapacity: 5, deliveryDate: "2023-08-01", fuelType: "Electric", features: ["Navigation System", "Bluetooth"], price: 80000 },
  { id: 12, name: "Toyota RAV4", imgSrc: "/images/car2.png", type: "Car", bodyType: "SUV", transmission: "Automatic", seatingCapacity: 5, deliveryDate: "2023-09-01", fuelType: "Hybrid", features: ["Heated Seats", "Navigation System"], price: 35000 },
  { id: 13, name: "Honda Accord", imgSrc: "/images/car3.png", type: "Car", bodyType: "Sedan", transmission: "Automatic", seatingCapacity: 5, deliveryDate: "2023-09-15", fuelType: "Gas", features: ["Massage Seats", "Navigation System"], price: 27000 },
  { id: 14, name: "Ford Mustang", imgSrc: "/images/car4.png", type: "Car", bodyType: "Coupe", transmission: "Manual", seatingCapacity: 4, deliveryDate: "2023-10-01", fuelType: "Gas", features: ["Panoramic Sunroof", "Bluetooth"], price: 35000 },
  { id: 15, name: "Chevrolet Tahoe", imgSrc: "/images/car5.png", type: "Car", bodyType: "SUV", transmission: "Automatic", seatingCapacity: 7, deliveryDate: "2023-10-15", fuelType: "Diesel", features: ["Rear-Seat Entertainment System", "Automatic Parking Assistance"], price: 55000 },
  { id: 16, name: "Audi Q7", imgSrc: "/images/car6.png", type: "Car", bodyType: "SUV", transmission: "Automatic", seatingCapacity: 7, deliveryDate: "2023-11-01", fuelType: "Diesel", features: ["Massage Seats", "Automatic Parking Assistance"], price: 60000 },
  { id: 17, name: "BMW 3 Series", imgSrc: "/images/car7.png", type: "Car", bodyType: "Sedan", transmission: "Automatic", seatingCapacity: 5, deliveryDate: "2023-11-15", fuelType: "Gas", features: ["Bluetooth", "Premium Leather Upholstery"], price: 42000 },
  { id: 18, name: "Mercedes-Benz E-Class", imgSrc: "/images/car8.png", type: "Car", bodyType: "Sedan", transmission: "Automatic", seatingCapacity: 5, deliveryDate: "2023-12-01", fuelType: "Gas", features: ["Navigation System", "Ambient Lighting"], price: 55000 },
  { id: 19, name: "Porsche 911", imgSrc: "/images/car9.png", type: "Car", bodyType: "Coupe", transmission: "Automatic", seatingCapacity: 4, deliveryDate: "2024-01-01", fuelType: "Gas", features: ["Keyless Entry and Start", "Heated Seats"], price: 90000 },
  { id: 20, name: "Jeep Wrangler", imgSrc: "/images/car10.png", type: "Car", bodyType: "SUV", transmission: "Manual", seatingCapacity: 4, deliveryDate: "2023-08-10", fuelType: "Gas", features: ["Bluetooth", "Navigation System"], price: 35000 },
];

const Automobiles = () => {
  const [automobiles, setAutomobiles] = useState(automobileData);
  const [filters, setFilters] = useState({
    type: '',
    bodyType: '',
    transmission: '',
    seatingCapacity: '',
    deliveryDate: null,
    fuelType: '',
    features: [],
    priceRange: { min: null, max: null },
  });

  const [isBike, setIsBike] = useState(false);

  const handleRadioChange = (filterType) => (event) => {
    const { value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value
    }));
    if (filterType === 'type') {
      setIsBike(value === 'Bike');
    }
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
    let filteredAutomobiles = automobileData;

    if (filters.type) {
      filteredAutomobiles = filteredAutomobiles.filter(auto => auto.type === filters.type);
    }
    if (filters.bodyType && !isBike) {
      filteredAutomobiles = filteredAutomobiles.filter(auto => auto.bodyType === filters.bodyType);
    }
    if (filters.transmission && !isBike) {
      filteredAutomobiles = filteredAutomobiles.filter(auto => auto.transmission === filters.transmission);
    }
    if (filters.seatingCapacity && !isBike) {
      filteredAutomobiles = filteredAutomobiles.filter(auto => auto.seatingCapacity === parseInt(filters.seatingCapacity, 10));
    }
    if (filters.deliveryDate) {
      filteredAutomobiles = filteredAutomobiles.filter(auto => new Date(auto.deliveryDate) <= new Date(filters.deliveryDate));
    }
    if (filters.fuelType) {
      filteredAutomobiles = filteredAutomobiles.filter(auto => auto.fuelType === filters.fuelType);
    }
    if (filters.features.length > 0) {
      filteredAutomobiles = filteredAutomobiles.filter(auto => filters.features.every(feature => auto.features.includes(feature)));
    }
    if (filters.priceRange.min !== null) {
      filteredAutomobiles = filteredAutomobiles.filter(auto => auto.price >= filters.priceRange.min);
    }
    if (filters.priceRange.max !== null) {
      filteredAutomobiles = filteredAutomobiles.filter(auto => auto.price <= filters.priceRange.max);
    }

    setAutomobiles(filteredAutomobiles);
  };

  return (
    <div className="automobile-container">
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
        </select>
        <button onClick={applyFilters}>Apply Filters</button>
      </div>

      <div className="main-content">
        <aside className="sidebarx">
          <div className="filter-section">
            <h3>Automobile Type</h3>
            <div><input type="radio" name="type" value="Bike" onChange={handleRadioChange('type')} /><label>Bike</label></div>
            <div><input type="radio" name="type" value="Car" onChange={handleRadioChange('type')} /><label>Car</label></div>
          </div>

          {!isBike && (
            <>
              <div className="filter-section">
                <h3>Body Type</h3>
                {['Sports', 'SUV', 'Sedan', 'Hatchback', 'MUV', 'Compact Sedan', 'Compact SUV', 'Convertible', 'Coupe', 'Station Wagon', 'Minivan', 'Truck'].map(bodyType => (
                  <div key={bodyType}><input type="radio" name="bodyType" value={bodyType} onChange={handleRadioChange('bodyType')} /><label>{bodyType}</label></div>
                ))}
              </div>

              <div className="filter-section">
                <h3>Transmission</h3>
                {['Automatic', 'Manual'].map(transmission => (
                  <div key={transmission}><input type="radio" name="transmission" value={transmission} onChange={handleRadioChange('transmission')} /><label>{transmission}</label></div>
                ))}
              </div>

              <div className="filter-section">
                <h3>Seating Capacity</h3>
                {['5', '6', '7', '8'].map(capacity => (
                  <div key={capacity}><input type="radio" name="seatingCapacity" value={capacity} onChange={handleRadioChange('seatingCapacity')} /><label>{capacity}</label></div>
                ))}
              </div>
            </>
          )}

          <div className="filter-section">
            <h3>Delivery Date</h3>
            <label>Latest By:</label><input type="date" onChange={handleInputChange('deliveryDate')} />
          </div>

          <div className="filter-section">
            <h3>Fuel Type</h3>
            {!isBike ? (
              ['Diesel', 'Electric', 'Gas', 'Hybrid', 'Natural Gas', 'Hydrogen'].map(fuel => (
                <div key={fuel}><input type="radio" name="fuelType" value={fuel} onChange={handleRadioChange('fuelType')} /><label>{fuel}</label></div>
              ))
            ) : (
              ['Petrol', 'Electric'].map(fuel => (
                <div key={fuel}><input type="radio" name="fuelType" value={fuel} onChange={handleRadioChange('fuelType')} /><label>{fuel}</label></div>
              ))
            )}
          </div>

          {!isBike && (
            <div className="filter-section">
              <h3>Features</h3>
              {['Massage Seats', 'Heated Seats', 'Navigation System', 'Blind spot monitoring', 'Bluetooth', 'Panoramic Sunroof', 'Active Noise Cancellation', 'Premium Leather Upholstery', 'Keyless Entry and Start', 'Built-In Internet Connectivity', 'Ambient Lighting', 'Automatic Parking Assistance', 'Rear-Seat Entertainment System', 'Adaptive Headlights', 'Under-Seat Storage'].map(feature => (
                <div key={feature}><input type="checkbox" value={feature} onChange={handleCheckboxChange} /><label>{feature}</label></div>
              ))}
            </div>
          )}

          <div className="filter-section">
            <h3>Price Range</h3>
            <label>Min:</label><input type="number" min="0" onChange={handleRangeChange('priceRange', 'min')} />
            <label>Max:</label><input type="number" min="0" onChange={handleRangeChange('priceRange', 'max')} />
          </div>
        </aside>

        <main className="automobile-listing">
          <div className="automobile-grid">
            {automobiles.map(auto => (
              <div key={auto.id} className="automobile-card">
                <img src={auto.imgSrc} alt={auto.name} />
                <h2>{auto.name}</h2>
                <p>Price: ${auto.price}</p>
                <div className="button-container">
                  <button className="btnss-cart">Add to Cart</button>
                  <button className="btnss-buy">Buy Now</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Automobiles;
