import React, { useState } from 'react';

import './HomePage.scss';
import TimeLine from '../TimeLine/TimeLine';
import LaunchDetails from '../LaunchDetails/LaunchDetails';
import Logo from '../Logo/Logo';

export default function HomePage (props) {

    const [activeLaunch, setActiveLaunch] = useState(null);

    function updateActiveLaunch (launch) {
        setActiveLaunch(launch);
    }

    return (
        <div id="homepage-container">
            <img src={'/rocket.jpg'} alt="SpaceX rocket taking off" />
            <TimeLine activeLaunch={activeLaunch} updateActiveLaunch={updateActiveLaunch} />
            <Logo />
            {
                activeLaunch ? 
                    <LaunchDetails launch={activeLaunch} updateActiveLaunch={updateActiveLaunch} />
                : ''
            }
            
        </div>
    )
}