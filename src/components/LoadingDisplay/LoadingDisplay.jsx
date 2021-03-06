import React from 'react';

import './LoadingDisplay.scss';

export default function LoadingDisplay (props) {
    return (
        <div id="loadingdisplay-container">
            <div className='spinner'>
                <div className='spinner'>
                    <div className='spinner'>
                        <div className='spinner'>
                            <div className='spinner'></div>
                        </div>
                    </div>
                </div>
            </div>
            <p>Loading Data...</p>
        </div>
    )
}