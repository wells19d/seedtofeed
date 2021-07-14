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
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
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
          About
        </Link>

        {user.id && (
          <>
            <Link className="navLink" to="/info">
              Info Page
            </Link>
            <LogOutButton className="navLink" />
          </>
        )}
        <div className="nav-logo-link">
          <a href="http://www.seedtofeed.info/" target="_blank">
            <img src={logo} className="nav-logo" alt="Seed to Feed Logo" />

          </a>
        </div>
        <div>
          {user.farmer === true && user.id && (
            <Link className="navLink" to='/contract'>Contracts</Link>

          )}
          {user.farmer === true && user.id && (
            <Link className="navLink" to='/contract_form'>Contract Form</Link>
          )}
          {user.farmer === true && user.id && (
            <Link className="navLink" to='/fieldDB'>Fields</Link>

          )}
          {user.farmer === true && user.id && (
            <Link className="navLink" to='/field'>Transactions</Link>
          )}
        </div>
        <div>
          {user.buyer === true && user.id && (
            <Link className="navLink" to='/contract'>Contracts</Link>
          )}

          {/* {user.buyer === true && user.id && (
            <Link className="navLink" to='/contract_form'>Contract Form</Link>
          )} */}
        </div>

      </div>
    </div >
  );
}

export default Nav;
