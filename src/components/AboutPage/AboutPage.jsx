import React from 'react';
import '../App/App.css';
import photo from './aboutpage.jpg';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  // for GO BACK button
  const history = useHistory();

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
  const classes = useStyles();


  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs>
            <Paper className={classes.paper}><p>
              The Seed to Feed Tracker is an app and dashboard that will show the
              process of seed to feed while including information about quality of
              the commodity. This will be done by allowing producers to enter
              information about the planting and growing process up until elevator
              delivery. After the grain is delivered we will be aggregating
              information from already existing players (Grand Farm, Bushel,
              AgriDigital, Geora) and displaying that information as a way to
              further market grain by showing the added value received from
              purchasing Seed to Feed product.</p>
              <img src={photo} alt="soybean field" className="about-image" width="500"></img>
            </Paper>
          </Grid>
        </Grid>
      </div >
      <div>
        <Button onClick={() => history.goBack()}>⬅ Go Back</Button>
      </div>
    </>
  );

}
export default AboutPage;

