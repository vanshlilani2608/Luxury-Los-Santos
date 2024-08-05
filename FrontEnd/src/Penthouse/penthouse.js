import React, { useState, useEffect } from 'react';
import './penthouse.css';
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import { Link } from 'react-router-dom';


// Updated penthouseData
const penthouseData = [
  // { id: 1, name: "Penthouse 1", imgSrc: "image1.jpg", location: "Vinewood", price: 1000000, facing: "North", amenities: ["Gymnasium", "Swimming Pool"], bhk: "3 BHK", furnishing: "Furnished", area: 2000, bathrooms: "2", date: "2024-07-20", rating: 4.5 },
  // { id: 2, name: "Penthouse 2", imgSrc: "image2.jpg", location: "South Los Santos", price: 2000000, facing: "South", amenities: ["Kids Play Area", "Club House"], bhk: "4 BHK", furnishing: "Semi-furnished", area: 2500, bathrooms: "3", date: "2024-07-18", rating: 4.0 },
  // { id: 3, name: "Penthouse 3", imgSrc: "image3.jpg", location: "West Vinewood", price: 3000000, facing: "West", amenities: ["Jacuzzi", "Roof Terrace"], bhk: "5 BHK", furnishing: "Unfurnished", area: 3000, bathrooms: "4", date: "2024-07-25", rating: 4.7 },
  // { id: 4, name: "Penthouse 4", imgSrc: "image4.jpg", location: "Paleto Bay", price: 4000000, facing: "North - East", amenities: ["Tennis Court", "Spa"], bhk: "4 BHK", furnishing: "Furnished", area: 2800, bathrooms: "3", date: "2024-07-15", rating: 4.2 },
  // { id: 5, name: "Penthouse 5", imgSrc: "image5.jpg", location: "Blaine County", price: 5000000, facing: "East", amenities: ["Power Backup", "CCTV cameras"], bhk: "5 BHK", furnishing: "Semi-furnished", area: 3500, bathrooms: "5", date: "2024-07-10", rating: 4.8 },
  // { id: 6, name: "Penthouse 6", imgSrc: "image6.jpg", location: "Mission Row", price: 6000000, facing: "North - West", amenities: ["24 x 7 Security Personnel", "Visitor’s Parking"], bhk: "3 BHK", furnishing: "Furnished", area: 2200, bathrooms: "2", date: "2024-07-22", rating: 4.6 },
  // { id: 7, name: "Penthouse 7", imgSrc: "image7.jpg", location: "Rockford Hills", price: 7000000, facing: "South - East", amenities: ["Park / Garden", "Balcony"], bhk: "4 BHK", furnishing: "Unfurnished", area: 2900, bathrooms: "3", date: "2024-07-17", rating: 4.3 },
  // { id: 8, name: "Penthouse 8", imgSrc: "image8.jpg", location: "Del Perro", price: 8000000, facing: "South - West", amenities: ["Gymnasium", "Kids Play Area"], bhk: "5 BHK", furnishing: "Furnished", area: 3200, bathrooms: "4", date: "2024-07-28", rating: 4.9 },
  // { id: 9, name: "Penthouse 9", imgSrc: "image9.jpg", location: "Los Santos", price: 1500000, facing: "North", amenities: ["Reserved Parking", "Spa"], bhk: "2 BHK", furnishing: "Furnished", area: 1800, bathrooms: "2", date: "2024-07-12", rating: 4.1 },
  // { id: 10, name: "Penthouse 10", imgSrc: "image10.jpg", location: "Vinewood Hills", price: 2500000, facing: "South - West", amenities: ["Jacuzzi", "Club House"], bhk: "3 BHK", furnishing: "Semi-furnished", area: 2100, bathrooms: "2", date: "2024-07-21", rating: 4.4 },
  // { id: 11, name: "Penthouse 11", imgSrc: "image11.jpg", location: "Downtown", price: 3500000, facing: "East", amenities: ["Roof Terrace", "Power Backup"], bhk: "4 BHK", furnishing: "Furnished", area: 2700, bathrooms: "3", date: "2024-07-05", rating: 4.5 },
  // { id: 12, name: "Penthouse 12", imgSrc: "image12.jpg", location: "South Los Santos", price: 4500000, facing: "North - East", amenities: ["CCTV cameras", "24 x 7 Security Personnel"], bhk: "5 BHK", furnishing: "Unfurnished", area: 3400, bathrooms: "4", date: "2024-07-23", rating: 4.7 },
];

const Penthouses = () => {
  const [penthouses, setPenthouses] = useState(penthouseData);
  const [filters, setFilters] = useState({
    bhk: null,
    area: { min: null, max: null },
    furnishing: null,
    bathrooms: null,
    name: null,
    priceRange: { min: null, max: null },
    sort: null,
    facing: null,
    amenities: [],
    location:null
  });
  
  const [featureOptions, setFeatureOptions] = useState([]);
  

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/products/penthouses/');
        setFeatureOptions(response.data.features); // Assuming response has a "features" array
        console.log(response.data)
        setPenthouses(response.data.objects)
      } catch (error) {
        console.error('Error fetching features:', error);
      }
    };

    fetchFeatures();
  }, []);

  const handleRadioChange = (filterType) => (event) => {
    const { value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType] === value ? null : value
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

  const handleAmenityChange = (event) => {
    const { value } = event.target;
    setFilters(prevFilters => {
      const newAmenities = prevFilters.amenities.includes(value)
        ? prevFilters.amenities.filter(amenity => amenity !== value)
        : [...prevFilters.amenities, value];
      return { ...prevFilters, amenities: newAmenities };
    });
  };

  const applyFilters = async() => {
    const filterData = {
      bhk: filters.bhk,
      covered_area: filters.covered_area,
      furnishing: filters.furnishing,
      bathrooms: filters.bathrooms,
      search: filters.name,
      price: filters.priceRange,
      sort: filters.sort,
      facing: filters.facing,
      features: filters.amenities,
      location:filters.location,
    };

    console.log("These are filter data   ", filterData,)
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/products/penthouses/`, filterData);
      console.log(response.data)
      setPenthouses(response.data.objects); // Assuming the backend returns the filtered yacht data
    } catch (error) {
      console.error('Error applying filters:', error);
      // Handle the error appropriately
    }
  };

  return (
    <div className="penthouse-container">
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
        <aside className="sidebarz">
          <div className="filter-section">
            <h3>BHK</h3>
            {['1', '2', '3', '4', '5+'].map(bhk => (
              <div key={bhk}>
                <input id={bhk} type="radio" name="bhk" value={bhk} onChange={handleRadioChange('bhk')} />
                <label htmlFor={bhk}>{bhk}</label>
              </div>
            ))}
          </div>

          <div className="filter-section">
            <h3>Covered Area (Sqft)</h3>
            <label>Min:</label><input type="number" min="0" onChange={handleRangeChange('area', 'min')} />
            <label>Max:</label><input type="number" min="0" onChange={handleRangeChange('area', 'max')} />
          </div>

          <div className="filter-section">
            <h3>Furnishing</h3>
            {['Semi-furnished', 'Unfurnished', 'Furnished'].map(furnishing => (
              <div key={furnishing}>
                <input id={furnishing} type="radio" name="furnishing" value={furnishing} onChange={handleRadioChange('furnishing')} />
                <label htmlFor={furnishing}>{furnishing}</label>
              </div>
            ))}
          </div>
          
          <div className="filter-section">
            <h3>Location</h3>
            {['Vinewood',
              'South Los Santos',
              'West Vinewood',
              'Paleto Bay',
              'Blaine County',
              'Mission Row',
              'Rockford Hills',
              'Del Perro',
              'Sandy Shores',
              'Los Santos International Airport (LSIA)',
              'Chumash',
              'Davis',
              'East Vinewood',
              'Grapeseed',
              'Other'].map(location => (
              <div key={location}>
                <input id={location} type="radio" name="location" value={location} checked={filters.location === location} onChange={handleRadioChange('location')} />
                <label htmlFor={location}>{location}</label>
              </div>
            ))}
          </div>

          <div className="filter-section">
            <h3>Bathrooms</h3>
            {['1', '2', '3', '4', '5', '5+'].map(bath => (
              <div key={bath}>
                <input id={bath} type="radio" name="bathrooms" value={bath} onChange={handleRadioChange('bathrooms')} />
                <label htmlFor={bath}>{bath}</label>
              </div>
            ))}
          </div>

          <div className="filter-section">
            <h3>Price Range</h3>
            <label>Min:</label><input type="number" min="0" onChange={handleRangeChange('priceRange', 'min')} />
            <label>Max:</label><input type="number" min="0" onChange={handleRangeChange('priceRange', 'max')} />
          </div>

          <div className="filter-section">
            <h3>Facing</h3>
            {['East', 'North', 'North - East', 'North - West', 'South', 'South - East', 'South - West', 'West'].map(facing => (
              <div key={facing}>
                <input id={facing} type="radio" name="facing" value={facing} onChange={handleRadioChange('facing')} />
                <label htmlFor={facing}>{facing}</label>
              </div>
            ))}
          </div>

          <div className="filter-section">
            <h3>Amenities</h3>
            {featureOptions.map(feature => (
              <div key={feature.id}>
                <input
                  id={feature.name}
                  type="checkbox"
                  value={feature.id}
                  onChange={handleAmenityChange}
                />
                <label htmlFor={feature.name}>{feature.name}</label>
              </div>
            ))}
          </div>
        </aside>

        <main className="penthouse-listing">
          <div className="penthouse-grid">
            {penthouses.map(penthouse => (
              <div key={penthouse.id} className="penthouse-card">
                <Link to={`/detail/penthouse/${penthouse.id}`}>
                <img src={penthouse.main_image} alt={penthouse.title} />
                </Link>
                <h2>{penthouse.title}</h2>
                <p>Location: {penthouse.location}</p>
                <p>Price: ${penthouse.price}</p>
                <div className="button-container">
                  <button className="btn-cart">Add to Cart</button>
                  <button className="btn-buy">Buy Now</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Penthouses;
