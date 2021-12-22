import React, { useRef, useEffect } from 'react';

import './LaunchFrequency.scss';

export default function LaunchFrequency ({ launches }) {

    const svgRef = useRef();

    useEffect(() => {

    })

    return (
        <div id="frequency-container">
            <svg ref={svgRef}></svg>
        </div>
    )
}