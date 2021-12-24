import React from 'react';

import './LegendEntry.scss';

export default function LegendEntry ({ color, title }) {
    return (
        <div className="legend-entry-container">
            <div
                className="legend-colorbox"
                style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: color
                }}
            >
            </div>
            <div>{title}</div>
        </div>
    )
}