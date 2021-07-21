import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Button, Card } from '@material-ui/core';
import { use } from 'passport';



function Signum(props) {
  const store = useSelector((store) => store);
  const history = useHistory();

  return (
    <>
      <center>
        <Card className="cards card-width">
          <div>
            <h1>Signum Dashboard</h1>
            <iframe
              frameBorder="none"
              width="100%"
              height="500px"
              src="https://grandfarm.signumiot.com/app/dashboard"
            ></iframe>
          </div>
        </Card>
      </center>
      <Button className="submit-buttons" onClick={() => history.goBack()}>
        ⬅ Go Back
      </Button>
    </>
  );
}

export default Signum;
