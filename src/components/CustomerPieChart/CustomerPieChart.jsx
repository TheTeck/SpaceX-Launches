import React, { useRef, useEffect } from 'react';

import './CustomerPieChart.scss';

export default function CustomerPieChart (props) {

    const svgRef = useRef();

    return (
        <svg ref={svgRef}>

        </svg>
    )
}