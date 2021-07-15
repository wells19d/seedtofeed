import React from 'react';
import { useSelector } from 'react-redux';

import BuyerViewFields from '../ViewFields/BuyerViewFields';
import ViewFields from '../ViewFields/ViewFields';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <center>
      <div className='container'>
        <h3 className='welcome-message'>Welcome, {user.first_name}!</h3>

        <h1>Field List</h1>
        <br />
        <br />


        {user.farmer && <ViewFields userID={user.id} />}
        {user.buyer && <BuyerViewFields userID={user.id} />}
        {/* <ViewFields userID={user.id}/> */}
      </div>
    </center>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
