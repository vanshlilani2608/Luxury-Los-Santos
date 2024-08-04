import React from 'react';
import './penthouse.css';

const Penthouse = () => {
  const penthouses = [
    { id: 1, name: "Penthouse 1", imgSrc: "image1.jpg", location: "Vinewood", price: "$1,000,000" },
    { id: 2, name: "Penthouse 2", imgSrc: "image2.jpg", location: "South Los Santos", price: "$2,000,000" },
    { id: 3, name: "Penthouse 3", imgSrc: "image3.jpg", location: "West Vinewood", price: "$3,000,000" },
    { id: 4, name: "Penthouse 4", imgSrc: "image4.jpg", location: "Paleto Bay", price: "$4,000,000" },
    { id: 5, name: "Penthouse 5", imgSrc: "image5.jpg", location: "Blaine County", price: "$5,000,000" },
    { id: 6, name: "Penthouse 6", imgSrc: "image6.jpg", location: "Mission Row", price: "$6,000,000" },
    { id: 7, name: "Penthouse 7", imgSrc: "image7.jpg", location: "Rockford Hills", price: "$7,000,000" },
    { id: 8, name: "Penthouse 8", imgSrc: "image8.jpg", location: "Del Perro", price: "$8,000,000" },
  ];

  return (
    <div className="penthouse-container">
      <aside className="sidebar">
        <div className="filter-section">
          <h3>BHK</h3>
          <div><input type="checkbox" id="1bhk" name="1bhk" /><label htmlFor="1bhk">1 BHK</label></div>
          <div><input type="checkbox" id="2bhk" name="2bhk" /><label htmlFor="2bhk">2 BHK</label></div>
          <div><input type="checkbox" id="3bhk" name="3bhk" /><label htmlFor="3bhk">3 BHK</label></div>
          <div><input type="checkbox" id="4bhk" name="4bhk" /><label htmlFor="4bhk">4 BHK</label></div>
          <div><input type="checkbox" id="5bhk" name="5bhk" /><label htmlFor="5bhk">5 BHK</label></div>
          <div><input type="checkbox" id="5plusbhk" name="5plusbhk" /><label htmlFor="5plusbhk">5+ BHK</label></div>
        </div>
        <div className="filter-section">
          <h3>Covered Area (Sqft)</h3>
          <label>Min:</label><input type="number" min="0" />
          <label>Max:</label><input type="number" min="0" />
        </div>
        <div className="filter-section">
          <h3>Furnishing</h3>
          <div><input type="checkbox" id="semi-furnished" name="semi-furnished" /><label htmlFor="semi-furnished">Semi-furnished</label></div>
          <div><input type="checkbox" id="unfurnished" name="unfurnished" /><label htmlFor="unfurnished">Unfurnished</label></div>
          <div><input type="checkbox" id="furnished" name="furnished" /><label htmlFor="furnished">Furnished</label></div>
        </div>
        <div className="filter-section">
          <h3>Bathrooms</h3>
          <div><input type="checkbox" id="1bath" name="1bath" /><label htmlFor="1bath">1</label></div>
          <div><input type="checkbox" id="2bath" name="2bath" /><label htmlFor="2bath">2</label></div>
          <div><input type="checkbox" id="3bath" name="3bath" /><label htmlFor="3bath">3</label></div>
          <div><input type="checkbox" id="4bath" name="4bath" /><label htmlFor="4bath">4</label></div>
          <div><input type="checkbox" id="5bath" name="5bath" /><label htmlFor="5bath">5</label></div>
          <div><input type="checkbox" id="5plusbath" name="5plusbath" /><label htmlFor="5plusbath">5</label></div>
        </div>
        <div className="filter-section">
          <h3>Facing</h3>
          <div><input type="checkbox" id="east" name="east" /><label htmlFor="east">East</label></div>
          <div><input type="checkbox" id="north" name="north" /><label htmlFor="north">North</label></div>
          <div><input type="checkbox" id="northeast" name="northeast" /><label htmlFor="northeast">North - East</label></div>
          <div><input type="checkbox" id="northwest" name="northwest" /><label htmlFor="northwest">North - West</label></div>
          <div><input type="checkbox" id="south" name="south" /><label htmlFor="south">South</label></div>
          <div><input type="checkbox" id="southeast" name="southeast" /><label htmlFor="southeast">South - East</label></div>
          <div><input type="checkbox" id="southwest" name="southwest" /><label htmlFor="southwest">South -West</label></div>
          <div><input type="checkbox" id="west" name="west" /><label htmlFor="west">West</label></div>
        </div>
        <div className="filter-section">
          <h3>Location</h3>
          <div><input type="checkbox" id="vinewood" name="vinewood" /><label htmlFor="vinewood">Vinewood</label></div>
          <div><input type="checkbox" id="southlosantos" name="southlosantos" /><label htmlFor="southlosantos">South Los Santos</label></div>
          <div><input type="checkbox" id="westvinewood" name="westvinewood" /><label htmlFor="westvinewood">West Vinewood</label></div>
          <div><input type="checkbox" id="paletobay" name="paletobay" /><label htmlFor="paletobay">Paleto Bay</label></div>
          <div><input type="checkbox" id="blainecounty" name="blainecounty" /><label htmlFor="blainecounty">Blaine County</label></div>
          <div><input type="checkbox" id="missionrow" name="missionrow" /><label htmlFor="missionrow">Mission Row</label></div>
          <div><input type="checkbox" id="rockfordhills" name="rockfordhills" /><label htmlFor="rockfordhills">Rockford Hills</label></div>
          <div><input type="checkbox" id="delperro" name="delperro" /><label htmlFor="delperro">Del Perro</label></div>
          <div><input type="checkbox" id="sandyshores" name="sandyshores" /><label htmlFor="sandyshores">Sandy Shores</label></div>
          <div><input type="checkbox" id="lsia" name="lsia" /><label htmlFor="lsia">Los Santos International Airport (LSIA)</label></div>
          <div><input type="checkbox" id="chumash" name="chumash" /><label htmlFor="chumash">Chumash</label></div>
          <div><input type="checkbox" id="davis" name="davis" /><label htmlFor="davis">Davis</label></div>
          <div><input type="checkbox" id="eastvinewood" name="eastvinewood" /><label htmlFor="eastvinewood">East Vinewood</label></div>
          <div><input type="checkbox" id="grapeseed" name="grapeseed" /><label htmlFor="grapeseed">Grapeseed</label></div>
        </div>
        <div className="filter-section">
          <h3>Amenities</h3>
          <div><input type="checkbox" id="gymnasium" name="gymnasium" /><label htmlFor="gymnasium">Gymnasium</label></div>
          <div><input type="checkbox" id="kidsplayarea" name="kidsplayarea" /><label htmlFor="kidsplayarea">Kids Play Area</label></div>
          <div><input type="checkbox" id="reservedparking" name="reservedparking" /><label htmlFor="reservedparking">Reserved Parking</label></div>
          <div><input type="checkbox" id="swimmingpool" name="swimmingpool" /><label htmlFor="swimmingpool">Swimming Pool</label></div>
          <div><input type="checkbox" id="clubhouse" name="clubhouse" /><label htmlFor="clubhouse">Club House</label></div>
          <div><input type="checkbox" id="parkgarden" name="parkgarden" /><label htmlFor="parkgarden">Park / Garden</label></div>
          <div><input type="checkbox" id="balcony" name="balcony" /><label htmlFor="balcony">Balcony</label></div>
          <div><input type="checkbox" id="jacuzzi" name="jacuzzi" /><label htmlFor="jacuzzi">Jacuzzi</label></div>
          <div><input type="checkbox" id="roofterrace" name="roofterrace" /><label htmlFor="roofterrace">Roof Terrace</label></div>
          <div><input type="checkbox" id="tenniscourt" name="tenniscourt" /><label htmlFor="tenniscourt">Tennis Court</label></div>
          <div><input type="checkbox" id="spa" name="spa" /><label htmlFor="spa">Spa</label></div>
          <div><input type="checkbox" id="powerbackup" name="powerbackup" /><label htmlFor="powerbackup">Power Backup</label></div>
          <div><input type="checkbox" id="cctvcameras" name="cctvcameras" /><label htmlFor="cctvcameras">CCTV cameras</label></div>
          <div><input type="checkbox" id="security" name="security" /><label htmlFor="security">24 x 7 Security Personnel</label></div>
          <div><input type="checkbox" id="visitorsparking" name="visitorsparking" /><label htmlFor="visitorsparking">Visitor’s Parking</label></div>
        </div>
      </aside>
      <main className="main-content">
        <div className="penthouse-grid">
          {penthouses.map(penthouse => (
            <div key={penthouse.id} className="penthouse-card">
              <img src={penthouse.imgSrc} alt={penthouse.name} />
              <h4>{penthouse.name}</h4>
              <p>{penthouse.location}</p>
              <p>{penthouse.price}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Penthouse;
