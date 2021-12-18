import React from 'react';

import './Nav.scss';

export default function Nav ({ current, handleNavigationClick }) {

    function handleNavClick (e) {
        handleNavigationClick(e.target.name);
    }

    return (
        <nav>
            <button 
                className={current === 'timeline' ? 'active-nav' : ''}
                name="timeline"
                onClick={handleNavClick}
            >
                Launch Timeline
            </button>
            <button 
                className={current === 'stats' ? 'active-nav' : ''}
                name="stats"
                onClick={handleNavClick}
            >
                Launch Stats
            </button>
        </nav>
    )
}