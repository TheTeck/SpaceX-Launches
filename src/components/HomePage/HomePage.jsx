import React from 'react';

import './HomePage.scss';
import TimeLine from '../TimeLine/TimeLine';

export default function HomePage (props) {
    return (
        <div id="homepage-container">
            <img src={'/rocket.jpg'} alt="SpaceX rocket taking off" />
            <TimeLine />
        </div>
    )
}