// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'; 
import Header from './header/header';
import Footer from './footer/footer';
import Profile from './profile/Profile';
import Carts from './Carts/carts';
import Home from './Home/home';
import Penthouse from './Penthouse/penthouse';
import Automobiles from './Automobiles/automobiles';
import Aircraft from './Aircrafts/aircraft';
import Yacht from './Yacht/yacht';
import ListYacht from './List-item-yacht/listitem-yacht';
import ListPenthouse from './List-item-pentouses/listitem-penthouses';
import ListAircraft from './List-item-aircrafts/listitem-aircrafts';
import ListAutomobiles from './List-item-automobiles/listitem-automobiles';
import { Auth } from './Login/Auth'; 

const App = () => {
  const location = useLocation();
  const showHeaderFooter = !(location.pathname === '/auth');

  return (
    <div>
      {showHeaderFooter && <Header />}
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/carts" element={<Carts />} />
        <Route path="/penthouse" element={<Penthouse />} />
        <Route path="/automobiles" element={<Automobiles />} />
        <Route path="/aircraft" element={<Aircraft />} />
        <Route path="/yacht" element={<Yacht />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
        <Route path="/listyacht" element={<ListYacht />} />
        <Route path="/listpenthouse" element={<ListPenthouse />} />
        <Route path="/listautomobiles" element={<ListAutomobiles />} />
        <Route path="/listaircrafts" element={<ListAircraft />} />
        <Route path="/detail/yacht/:yachtId/"  />
        <Route path="/detail/penthouse/:penthouseId/"  />
      </Routes>
      {showHeaderFooter && <Footer />}
    </div>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
