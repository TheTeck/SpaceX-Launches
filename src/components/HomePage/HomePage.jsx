import React, { useState } from 'react';

import './HomePage.scss';
import TimeLine from '../TimeLine/TimeLine';
import Stats from '../Stats/Stats';
import LaunchDetails from '../LaunchDetails/LaunchDetails';
import Logo from '../Logo/Logo';
import Nav from '../Nav/Nav';

export default function HomePage (props) {

    const [activeLaunch, setActiveLaunch] = useState(null);
    const [currentNav, setCurrentNav] = useState('timeline');

    function updateActiveLaunch (launch) {
        setActiveLaunch(launch);
    }

    function handleNavigationClick (page) {
        setCurrentNav(page);
    }

    return (
        <div id="homepage-container">
            <img src={'/rocket.jpg'} alt="SpaceX rocket taking off" />
            {
                currentNav === 'timeline' ? 
                    <TimeLine activeLaunch={activeLaunch} updateActiveLaunch={updateActiveLaunch} />
                : <Stats />
            }
            <Logo />
            <Nav current={currentNav} handleNavigationClick={handleNavigationClick} />
            {
                currentNav === 'timeline' && activeLaunch ? 
                    <LaunchDetails launch={activeLaunch} updateActiveLaunch={updateActiveLaunch} />
                : ''
            }
            
        </div>
    )
}