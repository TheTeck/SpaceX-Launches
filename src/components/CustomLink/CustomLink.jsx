import React from 'react';

import './CustomLink.scss';

export default function CustomLink ({ icon, text, link }) {
    return (
        <a 
            className="link-container" 
            href={link} target="_blank" 
            rel="no referrer noopener"
        >
            <div className="material-icons link-icon">{ icon }</div>
            <div className="link-text">{ text }</div>
        </a>
    )
}