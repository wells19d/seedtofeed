import React from 'react';
import { useSelector } from 'react-redux';

import BuyerViewFields from '../ViewFields/BuyerViewFields';
import ViewFields from '../ViewFields/ViewFields';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Card,
} from '@material-ui/core';

import '../../index.css';

function UserPage() {
  const user = useSelector((store) => store.user);
  return (
    <div>
      <Card className="welcome-message ">
        <h2>Welcome, {user.first_name}!</h2>
      </Card>
      <center>
        <Card className="cards fieldlist-card">
          <h1>Field List</h1>
          <br />
          {user.farmer && <ViewFields userID={user.id} />}
          {user.buyer && <BuyerViewFields userID={user.id} />}
        </Card>
      </center>
    </div>
  );
}

export default UserPage;
