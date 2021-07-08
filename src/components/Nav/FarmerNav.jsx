import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function FarmerNav() {
    const user = useSelector((store) => store.user);

    // let loginLinkData = {
    //     path: '/login',
    //     text: 'Login / Register',
    // };

    // if (user.id != null && user.farmer === true) {
    //     loginLinkData.path = '/farmer';
    //     loginLinkData.text = 'Home';
    // }

    //show Farmer navigation when logged in as farmer


    return (
        <div className="nav">
            <Link to="/home">
                <h2 className="nav-title">SEED TO FEED</h2>
            </Link>
            <div>
                {/* <Link className="navLink" to={loginLinkData.path}>
                    {loginLinkData.text}
                </Link> */}

                {user.id && (

                    <>
                        {/* link to view contracts */}
                        <Link className="navLink" to="/contract">
                            View Contracts (need component)
                        </Link>

                        {/* link to add a field */}
                        <Link className="navLink" to="/">
                            Add a New Field (need component)
                        </Link>

                        {/* link to edit field information */}
                        <Link className="navLink" to="/">
                            Edit Field Information
                        </Link>

                        {/* link to view field transactions */}
                        <Link className="navLink" to="/">
                            View Field Transactions
                        </Link>

                        {/* link to edit field transaction */}
                        <Link className="navLink" to="/">
                            Edit Transaction
                        </Link>

                        {/* link to add field transaction */}
                        <Link className="navLink" to="/">
                            Add New Transaction
                        </Link>

                        {/* link to NIR Analysis */}
                        <Link className="navLink" to="/">
                            NIR Analysis
                        </Link>

                        {/* link to add NIR  */}
                        <Link className="navLink" to="/">
                            Add NIR Analysis
                        </Link>

                        <Link className="navLink" to="/info">
                            Info Page
                        </Link>

                        <LogOutButton className="navLink" />
                    </>
                )}

                <Link className="navLink" to="/about">
                    About
                </Link>

                <a href="http://www.seedtofeed.info/" target="_blank"
                >
                    Seed to Feed
                </a>
            </div>
        </div >
    );
}

export default FarmerNav;