import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import supplychain from './logos/supplychain.png';

import Button from '@material-ui/core/Button';

// CUSTOM COMPONENTS
import LoginForm from '../LoginForm/LoginForm';

function LandingPage() {
  const history = useHistory();

  const registration = (event) => {
    history.push('/registration');
  };

  return (
    <div className="container">
      <div className="grid">
        <div className="grid-col grid-col_8">
          <h1 align="center">Welcome to the Seed to Feed Tracker</h1>
          <img className="landing-page" src={supplychain} alt="Seed to Feed Logo" />
          <p>
            Seed to Feed was created to help increase profitability for farmers
            and feed producers, as well as the partners in-between. This project
            will benefit the entire supply chain, all the way back to your local
            farmer. Our mission is to promote industry education, explore
            existing supply chain challenges, and highlight technology and
            industry partners working on solutions.
          </p>
        </div>
        <div className="grid-col grid-col_4">
          <LoginForm />
          <center>
            <br />
            <Button
              size="small"
              className="btn btn_sizeSm"
              onClick={registration}
            >
              New Member ? <br />Register Here
            </Button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
