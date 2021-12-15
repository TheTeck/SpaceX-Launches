import React from 'react';

import './LaunchDetails.scss';

export default function LaunchDetails ({ launch, updateActiveLaunch }) {

    function handleDetailsClick () {
        updateActiveLaunch(null);
    }

    return (
        <div className="launch-details" onClick={handleDetailsClick}>
            {launch.flight_number} - {launch.mission_name}
        </div>
    )
}