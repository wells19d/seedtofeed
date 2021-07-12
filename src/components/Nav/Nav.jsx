import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
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
        <h2 className="nav-title">SEED TO FEED</h2>
      </Link>
      <div>
        <Link className="navLink" to={loginLinkData.path}>
          {loginLinkData.text}
        </Link>

        {user.id && (
          <>
            <Link className="navLink" to="/info">
              Info Page
            </Link>
            <LogOutButton className="navLink" />
          </>
        )}

        {user.farmer === true && user.id && (
          <Link to='/contract'>View Contracts</Link>

        )}
        {user.farmer === true && user.id && (
          <Link to='/contract_form'>Contract Form</Link>

        )}
        {user.farmer === true && user.id && (
          <Link to='/fieldDB'>View Fields</Link>

        )}
        {user.farmer === true && user.id && (
          <Link to='/field'>View Transactions</Link>
        )}

        {user.buyer === true && user.id && (
          <Link to='/contract'>View Contracts</Link>
        )}

        {user.buyer === true && user.id && (
          <Link to='/contract_form'>Contract Form</Link>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>

        <a href="http://www.seedtofeed.info/" target="_blank"
        >
          SEED TO FEED        </a>
      </div>
    </div >
  );
}

export default Nav;
