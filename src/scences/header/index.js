import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../components/firebase-config'; // Import your Firebase config
import { collection, onSnapshot } from 'firebase/firestore';
import logo from '../../components/img/img.png';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';



const Header = () => {
  const [visible, setVisible] = useState(true);
  const [cartCount, setCartCount] = useState(0); // State to store the cart count
  let lastScrollY = window.pageYOffset;

  useEffect(() => {
    // Fetch the cart data and calculate the total count
    const unsubscribe = onSnapshot(collection(db, 'panier'), (snapshot) => {
      const totalCount = snapshot.docs.length; // Assuming each document represents one item in the cart
      setCartCount(totalCount);
    });

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      const header = document.getElementById('main-header');
      if (header) {
        if (currentScrollY < lastScrollY || currentScrollY === 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe(); // Unsubscribe from the Firestore listener when the component unmounts
    };
  }, []);

  return (
    <header id="main-header" className={`transparent-header ${visible ? '' : 'hidden'}`}>
      <div className="header-container">
        <img src={logo} alt="You & Me Skin Care Logo" className="logo" />
        <nav>
        <ul className="nav-menu">
  <li><Link to="/">ACCUEIL</Link></li>
  <li><Link to="/about">À PROPOS</Link></li>
  <li><Link to="/shop">BOUTIQUE</Link></li>
  <li><Link to="/contact">CONTACTEZ-NOUS</Link></li>
  <li>
    <Link to="/cart">
      <FontAwesomeIcon icon={faShoppingCart} />
      {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
    </Link>
  </li>
  <li>
    <Link to="/login">
      <FontAwesomeIcon icon={faUser} />
    </Link>
  </li>
</ul>

        </nav>
      </div>
    </header>
  );
};

export default Header;
