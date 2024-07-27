import React from 'react';
import './home.css';
const categories = [
  { id: 1, name: 'Yacht', image: 'https://via.placeholder.com/300' },
  { id: 2, name: 'Automobiles', image: 'https://via.placeholder.com/300' },
  { id: 3, name: 'Penthouses', image: 'https://via.placeholder.com/300' },
  { id: 4, name: 'Aircrafts', image: 'https://via.placeholder.com/300' },
];
const CategoryCard = ({ category }) => {
  return (
    <div className="category-card" style={{ backgroundImage: `url(${category.image})` }}>
      <div className="overlay">
        <h2>{category.name}</h2>
        <button>Buy Now</button>
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
