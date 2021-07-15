import React from 'react';
import { useSelector } from 'react-redux';

import BuyerViewFields from '../ViewFields/BuyerViewFields';
import ViewFields from '../ViewFields/ViewFields';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <center>
      <div className="container">
        <h1>Field List</h1>
        <h3 className="welcome-message">Welcome, {user.first_name}!</h3>
        <br />
        <br />

        <h4 className="page-title">This is a list of all of your current fields.  Please click field to see more details or add new field to enter a new field.</h4>

        {user.farmer && <ViewFields userID={user.id} />}
        {user.buyer && <BuyerViewFields userID={user.id} />}
        {/* <ViewFields userID={user.id}/> */}
      </div>
    </center>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
