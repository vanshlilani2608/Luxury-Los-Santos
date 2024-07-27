// src/Footer.js
// import React from 'react';
// import '../footer/footer.css';
// import Logo from '../Assests/images/LLS.png'; 
// src/Footer.js
import React from 'react';
import './footer.css';
import Logo from '../Assests/images/LLS.png';// Update with the correct path to your logo

// src/Footer.js
// Update with the correct path to your logo
import insta from '../Assests/images/insta.png'; // Update with the correct path to your Instagram logo
import linkedin from '../Assests/images/linkedin.png';

import phone from '../Assests/images/phone.png'; // Update with the correct path to your phone logo
import mail from '../Assests/images/Mail.png'; // Update with the correct path to your mail logo

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section feedback-section">
        <img src={Logo} alt="Company Logo" className="company-logo" />
        <div className="feedback-content">
          <h4>Ready to roll? Dive into our collections and bring a piece of Los Santos home today!</h4>
          <h6>Feedback</h6>
          <form>
            <textarea placeholder="Your feedback..." rows="2" cols="50"></textarea>
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

      <div className="footer-section">
        <h3>Quick Links</h3>
        <ul>
        <nav className="navig">
          <p><li><a href="/yacht">Yacht</a></li></p>
          <p><li><a href="/penthouse">Penthouse</a></li></p>
          <p><li><a href="/aircraft">Aircraft</a></li></p>
          <p><li><a href="/automobile">Automobile</a></li></p>
        </nav>
        </ul>
      </div>

      <div className="footer-section">
        <h3>Contact Details</h3>
        <p>Jain Nirjara Rocky : </p>
        <div className="social-icons">
          <a href="mailto:nirjarajain456@gmail.com">
            <img src={mail} alt="Mail Logo" className="social-logo" />
          </a>
          <a href="tel:+91 9586417345">
            <img src={phone} alt="Phone Logo" className="social-logo" />
          </a>
          <a href="https://www.instagram.com/nirjararjain625/" target="_blank" rel="noopener noreferrer">
            <img src={insta} alt="Instagram Logo" className="social-logo" />
          </a>
          <a href="https://www.instagram.com/nirjararjain625/" target="_blank" rel="noopener noreferrer">
            <img src={linkedin} alt="Instagram Logo" className="social-logo" />
          </a>
          </div>
          <p>Vansh Lilani : </p>
        <div className="social-icons">
          <a href="mailto:nirjarajain456@gmail.com">
            <img src={mail} alt="Mail Logo" className="social-logo" />
          </a>
          <a href="tel:+91 9586417345">
            <img src={phone} alt="Phone Logo" className="social-logo" />
          </a>
          <a href="https://www.instagram.com/nirjararjain625/" target="_blank" rel="noopener noreferrer">
            <img src={insta} alt="Instagram Logo" className="social-logo" />
          </a>
          <a href="https://www.instagram.com/nirjararjain625/" target="_blank" rel="noopener noreferrer">
            <img src={linkedin} alt="Instagram Logo" className="social-logo" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
