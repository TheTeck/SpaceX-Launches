import React, { useState } from 'react';

import './LaunchDetails.scss';
import DetailsMain from '../DetailsMain/DetailsMain';
import MoreInfo from '../MoreInfo/MoreInfo';

export default function LaunchDetails ({ launch, updateActiveLaunch }) {

    const [isOnMain, setIsOnMain] = useState(true);
    const [prevLaunch, setPrevLaunch] = useState(null);

    // Switch between main info page and extra info page
    function toggleDisplay () {
        setIsOnMain(prev => !prev);
    }

    // Make sure the main display is shown when a new launch is slected
    if (launch.flight_number !== prevLaunch) {
        setIsOnMain(true);
        setPrevLaunch(launch.flight_number);
    }

    function modalClick () {
        updateActiveLaunch(null);
    }

    return (
        <div className='modal-container' onClick={modalClick}>
            {
                isOnMain ? <DetailsMain 
                                launch={launch} 
                                updateActiveLaunch={updateActiveLaunch} 
                                toggleDisplay={toggleDisplay} 
                            />
                : <MoreInfo
                    launch={launch} 
                    updateActiveLaunch={updateActiveLaunch} 
                    toggleDisplay={toggleDisplay} 
                />
            }
        </div>
    )
}