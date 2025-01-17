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

import {
  Button,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@material-ui/core/';

function AboutPage() {
  const history = useHistory();

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      textAlign: 'center',
      margin: theme.spacing(10),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    imageList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',

      color: theme.palette.text.secondary,
      padding: theme.spacing(2),
    },
    title: {
      color: 'black',
      padding: theme.spacing(0),
      textAlign: 'left',
      alignContent: 'bottom',
      height: 20,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0) 100%)',
      color: theme.palette.text.default,
      padding: theme.spacing(0),
      position: 'top',
    },
  }));
  const classes = useStyles();

  return (
    <center>
      <Grid direction="flex" container spacing={1}>
        <br />
        <Grid item xs={12} />
        <br />
        <Grid item xs={2} />
        <Grid item xs={8}>
          <p>
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
          <br />
        </Grid>
        <Grid item xs={2} />

        <Grid item xs={1} />
        <Grid item xs={10}>
          <ImageList className={classes.imageList} cols={4}>
            <ImageListItem>
              <img
                src={photo1}
                alt="Planting"
                className="about-image"
                width="500"
              />
              <ImageListItemBar
                position="bottom"
                title="Seed"
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
              />
            </ImageListItem>

            <ImageListItem>
              <img
                src={photo2}
                alt="Soybean lifecycle"
                className="about-image"
                width="500"
              />
              <ImageListItemBar
                position="bottom"
                title="Lifecycle"
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
              />
            </ImageListItem>

            <ImageListItem>
              <img
                src={photo3}
                alt="Harvest"
                className="about-image"
                width="500"
              />
              <ImageListItemBar
                position="bottom"
                title="Harvest"
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
              />
            </ImageListItem>

            <ImageListItem>
              <img
                src={photo4}
                alt="Transit to elevator"
                className="about-image"
                width="500"
              />
              <ImageListItemBar
                position="bottom"
                title="Elevator"
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
              />
            </ImageListItem>
          </ImageList>
        </Grid>
        <Grid item xs={1} />

        <Grid item xs={1} />
        <Grid item xs={10}>
          <ImageList className={classes.imageList} cols={4}>
            <ImageListItem>
              <img
                src={photo5}
                alt="Train to storage"
                className="about-image"
                width="500"
              />
              <ImageListItemBar
                position="bottom"
                title="Storage"
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
              />
            </ImageListItem>

            <ImageListItem>
              <img
                src={photo6}
                alt="Shipped around world"
                className="about-image"
                width="500"
              />
              <ImageListItemBar
                position="bottom"
                title="Shipped Worldwide"
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
              />
            </ImageListItem>

            <ImageListItem>
              <img
                src={photo7}
                alt="Mills receive soybeans"
                className="about-image"
                width="500"
              />
              <ImageListItemBar
                position="bottom"
                title="Milling"
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
              />
            </ImageListItem>

            <ImageListItem>
              <img
                src={photo8}
                alt="Mill to farm"
                className="about-image"
                width="500"
              />
              <ImageListItemBar
                position="bottom"
                title="Feed"
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
              />
            </ImageListItem>
          </ImageList>
        </Grid>
        <Grid item xs={1} />
      </Grid>
      <br />
      <br />
      <div>
        <Button className="submit-buttons" onClick={() => history.goBack()}>
          ⬅ Go Back
        </Button>
      </div>
    </center>
  );
}
export default AboutPage;
