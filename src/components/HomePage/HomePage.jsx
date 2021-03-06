import React, { useState, useEffect } from 'react';

import './HomePage.scss';
import TimeLine from '../TimeLine/TimeLine';
import Stats from '../Stats/Stats';
import LaunchDetails from '../LaunchDetails/LaunchDetails';
import Logo from '../Logo/Logo';
import Nav from '../Nav/Nav';
import LoadingDisplay from '../LoadingDisplay/LoadingDisplay';
import apiService from '../../utilities/apiService';

export default function HomePage (props) {

    const [activeLaunch, setActiveLaunch] = useState(null);
    const [currentNav, setCurrentNav] = useState('timeline');
    const [launchData, setLaunchData] = useState([]);
    const [showLoading, setShowLoading] = useState(true);

    function updateActiveLaunch (launch) {
        setActiveLaunch(launch);
    }

    function handleNavigationClick (page) {
        setCurrentNav(page);
    }

    async function fetchData () {
        try {
            const apiData = await apiService.getData();
            setLaunchData(apiData);
            setShowLoading(false);
        } catch (error) {
            console.log('Unable to retreive data');
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div id="homepage-container">
            <img src={process.env.PUBLIC_URL + '/rocket.jpg'} alt="SpaceX rocket taking off" />
            {
                currentNav === 'timeline' ?
                    launchData.length ? <TimeLine launchData={launchData} activeLaunch={activeLaunch} updateActiveLaunch={updateActiveLaunch} />
                    : ''
                : launchData.length ? <Stats launchs={launchData} />
                    : ''
            }
            <Logo />
            <Nav current={currentNav} handleNavigationClick={handleNavigationClick} />
            {
                currentNav === 'timeline' && activeLaunch ? 
                    <LaunchDetails launch={activeLaunch} updateActiveLaunch={updateActiveLaunch} />
                : ''
            }
            {
                showLoading ? <LoadingDisplay /> : ''
            }
        </div>
    )
}