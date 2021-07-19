import React from 'react';
import '../App/App.css';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import photo1 from './images/1.png';
import photo2 from './images/2.png';
import photo3 from './images/3.png';
import photo4 from './images/4.png';
import photo5 from './images/5.png';
import photo6 from './images/6.png';
import photo7 from './images/7.png';
import photo8 from './images/8.png';


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
      padding: theme.spacing(1), //grid padding
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
  const classes = useStyles();


  return (
    <React.Fragment>
      <center>
        <Grid direction='flex' container spacing={1} >
          <Grid item xs>
            <Paper className={classes.paper}>
              The Seed to Feed Tracker is an app and dashboard that will show the
              process of seed to feed while including information about quality of
              the commodity. This will be done by allowing producers to enter
              information about the planting and growing process up until elevator
              delivery. After the grain is delivered we will be aggregating
              information from already existing players (Grand Farm, Bushel,
              AgriDigital, Geora) and displaying that information as a way to
              further market grain by showing the added value received from
              purchasing Seed to Feed product.
            </Paper>
          </Grid>

          <Grid container spacing={0}>
            <Grid item xs>
              <Paper className={classes.paper}>
                <img src={photo1} alt="Planting" className="about-image" width="500"></img>
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>
                <img src={photo2} alt="Soybean lifecycle" className="about-image" width="500"></img>
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>
                <img src={photo3} alt="Harvest" className="about-image" width="500"></img>
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>
                <img src={photo4} alt="Transit to elevator" className="about-image" width="500"></img>
              </Paper>
            </Grid>
            <Grid container spacing={0}>

              <Grid item xs>
                <Paper className={classes.paper}>
                  <img src={photo5} alt="Train to storage" className="about-image" width="500"></img>
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper className={classes.paper}>
                  <img src={photo6} alt="Shipped around world" className="about-image" width="500"></img>
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper className={classes.paper}>
                  <img src={photo7} alt="Mills receive soybeans" className="about-image" width="500"></img>
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper className={classes.paper}>
                  <img src={photo8} alt="Mill to farm" className="about-image" width="500"></img>
                </Paper>
              </Grid>
            </Grid >
          </Grid >
        </Grid>
        <br />
        <br />
        <div>
          <Button onClick={() => history.goBack()}>⬅ Go Back</Button>
        </div>
      </center>
    </React.Fragment >


  );

}
export default AboutPage;

