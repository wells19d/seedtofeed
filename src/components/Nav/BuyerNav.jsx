import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function BuyerNav() {
    const user = useSelector((store) => store.user);

    let loginLinkData = {
        path: '/login',
        text: 'Login / Register',
    };

    if (user.id != null && user.buyer === true) {
        loginLinkData.path = '/buyer';
        loginLinkData.text = 'Home';
    }

    return (
        <div className="nav">
            <Link to="/home">
                <h2 className="nav-title">SEED TO FEED</h2>
            </Link>
            <div>
                <Link className="navLink" to={loginLinkData.path}>
                    {loginLinkData.text}
                </Link>

                {user.id && (
                    <>
                        {/* link to view buyer contracts */}
                        <Link className="navLink" to="/">
                            View Contracts
                        </Link>

                        {/* link to contract form */}
                        <Link className="navLink" to="/">
                            Contract Form
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

export default BuyerNav;