import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Nav.css';
import { useSelector, useDispatch } from 'react-redux';
import logo from './Logos/seedtofeed-badge_1-color-Texture (1).png';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function Nav() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.user);

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

  function logOutFunction() {
    dispatch({ type: 'LOGOUT' });

    history.push('/home');
  }

  return (
    <div className="nav">
      <div className="nav-logo-span">
        <h3 className="title">TRACKER</h3>
        <Link to="/home">
          <img
            className="custom-logo-link-img"
            src={logo}
            alt="Seed to Feed Logo"
          />
        </Link>
      </div>
      <Link
        className="menuButton"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
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
        <MenuItem onClick={handleClose}>
          <Link to={loginLinkData.path}>{loginLinkData.text}</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/about">About</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {user.id && <Link to="/contract">Contracts</Link>}
        </MenuItem>
        <MenuItem onClick={handleClick}>
          <a href="http://www.seedtofeed.info/" target="_blank">
            Info Page
          </a>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/signum">Signum</Link>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          {user.id && <Link onClick={() => logOutFunction()}>Logout</Link>}
        </MenuItem>
      </Menu>
    </div>
  );
}

export default Nav;
