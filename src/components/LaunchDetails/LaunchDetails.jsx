import React, { useState } from 'react';

import './LaunchDetails.scss';
import DetailsMain from '../DetailsMain/DetailsMain';

export default function LaunchDetails ({ launch, updateActiveLaunch }) {

    const [isOnMain, setIsOnMain] = useState(true);

    function toggleDisplay () {
        setIsOnMain(prev => !prev);
    }

    return (
        <>
            {
                isOnMain ? <DetailsMain 
                                launch={launch} 
                                updateActiveLaunch={updateActiveLaunch} 
                                toggleDisplay={toggleDisplay} 
                            />
                : <></>
            }
        </>
    )
}