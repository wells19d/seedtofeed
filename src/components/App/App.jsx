import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import { useDispatch } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

import FieldDB from '../DashBoards/FieldDB';
import ViewContractList from '../ViewContract/ViewContractList';
import ViewContract from '../ViewContract/ViewContract';
import AddContract from '../ContractForm/AddContract';
import EditContract from '../ContractForm/EditContract';

import ViewFields from '../ViewFields/ViewFields';
import ViewFieldDetails from '../ViewFieldDetails/ViewFieldDetails';

import AddNIR from '../NIR/AddNIR';
import FieldNIR from '../NIR/FieldNIR';
import EditNIR from '../NIR/EditNIR';

import EditFieldForm from '../FieldForm/EditFieldForm';
import AddFieldForm from '../FieldForm/AddFieldForm';

import AddTransaction from '../AddTransaction/AddTransaction';
import EditTransaction from '../AddTransaction/EditTransaction';

import CloudinaryUpload from '../Upload/Cloudinary/Container';

import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <br />
        <br />
        <br />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from='/' to='/home' />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path='/about'
          >
            <AboutPage />
          </Route>
          <Route exact path='/fieldDB'>
            <FieldDB />
          </Route>

          <Route exact path='/viewfields/:userID'>
            <ViewFields />
          </Route>

          <Route exact path='/field_details/:fieldID'>
            <ViewFieldDetails />
          </Route>

          <Route exact path='/contract'>
            <ViewContractList />
          </Route>

          <Route exact path='/contract_details/:contractID'>
            <ViewContract />
          </Route>

          <Route exact path='/edit_NIR/:fieldID/:NIRID'>
            <EditNIR />
          </Route>

          <Route exact path='/edit_transaction/:fieldID/:transactionID'>
            <EditTransaction />
          </Route>

          <Route exact path='/contract_form'>
            <AddContract />
          </Route>

          <Route exact path='/NIR_form/:fieldID'>
            <AddNIR />
          </Route>

          <Route exact path='/edit_contract/:contractID'>
            <EditContract />
          </Route>

          <Route exact path='/edit_field/:fieldID'>
            {/* <Route exact path="/edit_field/:fieldID"> */}
            <EditFieldForm />
          </Route>

          <Route exact path='/add_field/'>
            <AddFieldForm />
          </Route>

          <Route exact path='/add_transaction/:fieldID'>
            <AddTransaction />
          </Route>

          <Route exact path="/cloudinaryupload" component={CloudinaryUpload} />

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path='/user'
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path='/info'
          >
            <InfoPage />
          </ProtectedRoute>

          {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LoginPage at /login
            exact
            path='/login'
            authRedirect='/user'
          >
            <LoginPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows RegisterPage at "/registration"
            exact
            path='/registration'
            authRedirect='/user'
          >
            <RegisterPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LandingPage at "/home"
            exact
            path='/home'
            authRedirect='/user'
          >
            <LandingPage />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
