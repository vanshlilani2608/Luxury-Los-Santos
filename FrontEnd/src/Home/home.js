import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const categories = [
  { id: 1, name: 'Yachts', hoverImage:  "/images/yash.jpg", image: "/images/luxury-yacht-3430348.jpg", link: "/yacht" },
  { id: 2, name: 'Automobiles',hoverImage:   "/images/Car.jpg", image: "/images/188a60398199c036706ffc302c01fb5b.jpg", link: "/automobiles" },
  { id: 3, name: 'Penthouses',hoverImage:   "/images/house.jpg", image: "/images/ghar.jpg", link: "/penthouse" },
  { id: 4, name: 'Aircrafts', hoverImage:  "/images/airh.webp", image: "/images/3331-cargo-plane.webp", link: "/aircraft" },
];

const CategoryCard = ({ category }) => {
  return (
    <div 
      className="category-card" 
      style={{ '--image': `url(${category.image})`, '--hover-image': `url(${category.hoverImage})` }}
    >
      <div className="overlay">
        <div className="heading-container">
          <h2>{category.name}</h2>
        </div>
        <Link to={category.link} className='category-link'>
          <button>Buy Now</button>
        </Link>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="home">
      <main>
        <div className="categories">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
