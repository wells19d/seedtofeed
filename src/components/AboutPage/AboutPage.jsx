import React from 'react';
import '../App/App.css';
import photo from './aboutpage.jpg';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  // for GO BACK button
  const history = useHistory();

  return (
    <>
      <div className='about-container' flex>
        <div className='container-about' flex>
          <h1 align='left'>About</h1>
          <p className='about-page'>
            The Seed to Feed Tracker is an app and dashboard that will show the
            process of seed to feed while including information about quality of
            the commodity. This will be done by allowing producers to enter
            information about the planting and growing process up until elevator
            delivery. After the grain is delivered we will be aggregating
            information from already existing players (Grand Farm, Bushel,
            AgriDigital, Geora) and displaying that information as a way to
            further market grain by showing the added value received from
            purchasing Seed to Feed product.
          </p>
        </div>
        <div className='container-about'>

          <img src={photo} alt="soybean field" className="about-image" width="500"></img>
        </div>
      </div>
      <div className='back-button'>
        <Button onClick={() => history.goBack()}>⬅ Go Back</Button>
      </div>
    </>
  );
}

export default AboutPage;
