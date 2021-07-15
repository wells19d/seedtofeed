import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import { useSelector, useDispatch } from 'react-redux';
import logo from './Logos/seedtofeed-badge_1-color-Texture (1).png';

// import FarmerNav from '../Nav/FarmerNav';
// import BuyerNav from '../Nav/BuyerNav';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function Nav() {
  const dispatch = useDispatch();
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

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="nav">
      <div className="nav-logo-span">
        <h2 className="title">Tracker</h2>
      <Link to="/home">
        <img className="custom-logo-link-img" src={logo} alt="Seed to Feed Logo" />
        </Link>
      </div>
      <Link className="menuButton" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Menu
      </Link>
      <Menu
        className="menuPopup"
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}><Link to={loginLinkData.path}>{loginLinkData.text}</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link to="/about">About</Link></MenuItem>
        <MenuItem onClick={handleClose}>{user.id && (<Link to='/contract'>Contracts</Link>)}</MenuItem>
        <MenuItem onClick={handleClose}>{user.id && (<Link onClick={() => dispatch({ type: 'LOGOUT' })}>Logout</Link>)}</MenuItem>
        
      </Menu>
    </div>
  );
}

export default Nav;

/*

<div className="nav">
      <Link to="/home">
          <img className="nav nav-logo-span nav-logo" src={logo} alt="Seed to Feed Logo" />
      </Link>
          <Link className="navLink" to={loginLinkData.path}>{loginLinkData.text}</Link>
          <Link className="navLink" to="/about">About</Link>
            
          
              {user.farmer === true && user.id && (<Link to='/contract'>Contracts</Link>)}
              {user.farmer === true && user.id && (<Link to='/fieldDB'>Fields</Link>)}
              {user.farmer === true && user.id && (<Link to='/field'>Transactions</Link>)}
              {user.buyer === true && user.id && (<Link to='/contract'>Contracts</Link>)}
              {user.buyer === true && user.id && (<Link to='/contract_form'>Contract Form</Link>)}
              {user.id && (<Link className="navLink" to="/info">Info Page</Link>)}
              {user.id && (<LogOutButton className="navLink" />)}
    </div >






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
        <div>
          {user.farmer === true && user.id && (
            <Link className="navLink" to='/contract'>Contracts</Link>

          )}
          {/* {user.farmer === true && user.id && (
            <Link className="navLink" to='/contract_form'>CONTRACT FORM</Link>
          )}
          {user.farmer === true && user.id && (
            <Link className="navLink" to='/fieldDB'>Fields</Link>

          )}
          {user.farmer === true && user.id && (
            <Link className="navLink" to='/field'>TRANSACTIONS</Link>
          )}
         {user.buyer === true && user.id && (
            <Link className="navLink" to='/contract'>Contracts</Link>
          )}

          {/* {user.buyer === true && user.id && (
            <Link className="navLink" to='/contract_form'>Contract Form</Link>
          )}
        </div>

      </div>
    </div >

*/