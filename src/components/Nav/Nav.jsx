import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import logo from './Logos/seedtofeed-badge_1-color-Texture (1).png';
// import FarmerNav from '../Nav/FarmerNav';
// import BuyerNav from '../Nav/BuyerNav';

function Nav() {
  const user = useSelector((store) => store.user);
  console.log('users are', user);

  let loginLinkData = {
    path: '/login',
    text: 'LOGIN / REGISTER',
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'HOME';
  }

  return (
    <div className="nav">
      <Link to="/home">
        <div className="nav-logo-span">
          <img className="nav-logo" src={logo} alt="Seed to Feed Logo" />
        </div>
        <div className="nav-logo-title">
          <h2>TRACKER</h2>
        </div>

      </Link>
      <div>
        <Link className="navLink" to={loginLinkData.path}>
          {loginLinkData.text}
        </Link>
        <Link className="navLink" to="/about">
          ABOUT
        </Link>

        {user.id && (
          <>
            {/* <Link className="navLink" to="/info">
              Info Page
            </Link> */}
          </>
        )}
        {/* <div className="nav-logo-link">
          <a href="http://www.seedtofeed.info/" target="_blank">
            <img src={logo} className="nav-logo" alt="Seed to Feed Logo" />

          </a>
        </div> */}

        {user.farmer === true && user.id && (
          <Link className="navLink" to='/contract'>CONTRACTS</Link>

        )}
        {user.farmer === true && user.id && (
          <Link className="navLink" to='/contract_form'>CONTRACT FORM</Link>
        )}
        {user.farmer === true && user.id && (
          <Link className="navLink" to='/fieldDB'>FIELDS</Link>

        )}
        {user.farmer === true && user.id && (
          <Link className="navLink" to='/field'>TRANSACTIONS</Link>
        )}


        {user.buyer === true && user.id && (
          <Link className="navLink" to='/contract'>CONTRACTS</Link>
        )}
        <LogOutButton className="navLink" />

        {/* {user.buyer === true && user.id && (
            <Link className="navLink" to='/contract_form'>Contract Form</Link>
          )} */}
      </div>

    </div>

  );
}

export default Nav;
