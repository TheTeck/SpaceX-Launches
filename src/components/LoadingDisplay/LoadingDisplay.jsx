import React from 'react';

import './LoadingDisplay.scss';

export default function LoadingDisplay (props) {
    return (
        <div id="loadingdisplay-container">
            <div className='cog'>
                <div className='tooth'></div>
            </div>
            <p>Loading Data...</p>
        </div>
    )
}