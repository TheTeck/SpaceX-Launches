import React from 'react';

import './MoreInfo.scss';

export default function MoreInfo ({ launch, updateActiveLaunch, toggleDisplay }) {

    function handleDetailsClick () {
        updateActiveLaunch(null);
    }

    function handleToggleDisplay () {
        toggleDisplay();
    }
    
    return (
        <div className="launch-details">
            <div className="button-display">
                <button id="more-button" className="btn-set" onClick={handleToggleDisplay}>Back</button>
                <button id="close-display" className="btn-set" onClick={handleDetailsClick}>Close</button>
            </div>
        </div>
    )
}