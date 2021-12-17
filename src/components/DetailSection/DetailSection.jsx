import React from 'react';

import './DetailSection.scss';

export default function DetailSection ({ width, bold, centered, children }) {
    return (
        <div 
            className="detailsection-container"
            style={{ 
                "width": `${width}%`,
                "fontWeight": bold ? 700 : 400,
                "textAlign": centered ? "center" : "left"
            }}
        >
            { children }
        </div>
    )
}