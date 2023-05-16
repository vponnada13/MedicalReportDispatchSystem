import React, { useState, useEffect } from 'react';
import './navbar.css';

export const NavBar = () => {

    return (
        <>
            <div className="navbar">
                <div className="navLeft">
                    <h4 className="navTitle">HealthCare</h4>
                </div>
                <div className="navMiddle">

                </div>
                <div className="navRight">
                <ul className="navRightItems">
                    <li>Sign In</li>
                    <li>Log out</li>
                </ul>
                </div>
            </div>
        </>
    )
}