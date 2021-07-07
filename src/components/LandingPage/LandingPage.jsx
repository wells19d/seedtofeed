import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import logo2 from './logos/logo2.png';


// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Seed to Feed Grain Tracker');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <img className="landing-page" src={logo2} alt="Seed to Feed Logo" />
          <p>
            Seed to Feed was created to help increase profitability for farmers and feed
            producers, as well as the partners in-between. This project will benefit the
            entire supply chain, all the way back to your local farmer. Our mission is to
            promote industry education, explore existing supply chain challenges, and
            highlight technology and industry partners working on solutions.
          </p>
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />
          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
