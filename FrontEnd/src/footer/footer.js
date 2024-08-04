import React from 'react';
import './footer.css';
import Logo from '../Assests/images/footermam.png';
import insta from '../Assests/images/instagram.png'; 
import linkedin from '../Assests/images/linkedin - Copy.png';
import phone from '../Assests/images/github.png'; 
import mail from '../Assests/images/gmail.png'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="feedback-section">
        <h4 className="tagline">Ready to roll? Dive into our collections and bring a piece of Los Santos home today!</h4>
        <div className="feedback-content">
          <h6>Feedback</h6>
          <form>
            <textarea placeholder="Your feedback..." rows="2" cols="50"></textarea>
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

      <div className="logo-section">
        <img src={Logo} alt="Company Logo" className="company-logo" />
        <p className="thank-you">Thank You for visiting the website!</p>
      </div>

      <div className="quick-links-contact-section">
        <div className="quick-links-section">
          <h3>Quick Links</h3>
          <ul>
            <nav className="navig">
              <li><a href="/yacht">Yacht</a></li>
              <li><a href="/penthouse">Penthouse</a></li>
              <li><a href="/aircraft">Aircraft</a></li>
              <li><a href="/automobile">Automobile</a></li>
            </nav>
          </ul>
        </div>

        <div className="contact-details-section">
          <h3>Contact Details</h3>
          <p className="contact-name">Jain Nirjara Rocky:</p>
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
              <img src={linkedin} alt="LinkedIn Logo" className="social-logo" />
            </a>
          </div>
          <p className="contact-name">Vansh Lilani:</p>
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
              <img src={linkedin} alt="LinkedIn Logo" className="social-logo" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
