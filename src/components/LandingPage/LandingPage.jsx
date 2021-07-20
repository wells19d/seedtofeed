import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import supplychain from './logos/supplychain.png';

import { Button, Grid } from '@material-ui/core';

// CUSTOM COMPONENTS
import LoginForm from '../LoginForm/LoginForm';

import '../../index.css';

function LandingPage() {
  const history = useHistory();

  const registration = (event) => {
    history.push('/registration');
  };

  return (
    <Grid container={1}>
      <Grid item xs={1} />
      <Grid itme xs={6}>
        <center>
          <h1>Welcome to the Seed to Feed Tracker</h1>
          <img src={supplychain} />
          Seed to Feed was created to help increase profitability for farmers
          and feed producers, as well as the partners in-between. This project
          will benefit the entire supply chain, all the way back to your local
          farmer. Our mission is to promote industry education, explore existing
          supply chain challenges, and highlight technology and industry
          partners working on solutions.
        </center>
      </Grid>
      <Grid item xs={1} />
      <Grid itme xs={3}>
        <center>
          <p>
            <br />
            <br />
            <LoginForm />
          </p>
          <Button
            className="submit-buttons"
            size="small"
            onClick={registration}
          >
            Register User
          </Button>
        </center>
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
}

export default LandingPage;
