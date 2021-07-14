import React from 'react';
import '../App/App.css'

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className='container'>
      <div>
        <h3 align="center">About</h3>
        <p className="about-page">
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
    </div>
  );
}

export default AboutPage;
