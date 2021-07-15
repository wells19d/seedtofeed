import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cloudinary from './CloudinaryUploadForm';
import UploadList from '../UploadList';

class Upload extends Component {

   componentDidMount = () => {
      // Refresh the list of uploads when this component shows up
      this.props.dispatch({ type: 'FETCH_UPLOADS' });
   }

   componentWillUnmount = () => {
      // Clear any upload alerts when this component goes away :)
      this.props.dispatch({ type: 'CLEAR_ALERT' });
   }

   render = () => {
      return (
         <>
            <h1>Cloudinary Upload Demo</h1>
            <Cloudinary />
            {/* <UploadList /> */}
         </>
      )
   }
}

export default connect()(Upload)