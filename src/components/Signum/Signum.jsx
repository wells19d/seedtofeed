import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Button, Card } from '@material-ui/core';
import { use } from 'passport';

const cards = {
  border: 'solid black 2px',
  fontFamily: 'Montserrat',
  overflow: 'auto',
  fontSize: '14px',
  boxShadow: '3px 3px 4px 1px grey',
  width: '1000px',
  height: '500px'
  // padding: '20px'
};

const standardButtons = {
  border: 'solid black 0px',
  boxShadow: '2px 2px 3px 0px grey',
  minWidth: '1px'
};

function Signum(props) {
  const store = useSelector((store) => store);
  const history = useHistory();

  return (
    <>
      <center>
        <Card style={cards}>
          <div>
            <h1>Signum Dashboard</h1>
            <iframe
              frameBorder='none'
              width='100%'
              height='500px'
              src='https://grandfarm.signumiot.com/app/dashboard'
            ></iframe>
          </div>
        </Card>
      </center>
      <Button style={standardButtons} onClick={() => history.goBack()}>
        ⬅ Go Back
      </Button>
    </>
  );
}

export default Signum;
