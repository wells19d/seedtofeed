import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function FarmerNav() {
    const user = useSelector((store) => store.user);

    let loginLinkData = {
        path: '/login',
        text: 'Login / Register',
    };

    if (user.id != null) {
        loginLinkData.path = '/user';
        loginLinkData.text = 'Home';
    }

    return (
        <div className="nav">
            <Link to="/home">
                <h2 className="nav-title">Seed to Feed Grain Tracker</h2>
            </Link>
            <div>
                <Link className="navLink" to={loginLinkData.path}>
                    {loginLinkData.text}
                </Link>

                {user.id && (

                    <>
                        <Link className="navLink" to="/contract">
                            View Contracts (need component)
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