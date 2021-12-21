import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3'

import './CustomerPieChart.scss';

export default function CustomerPieChart ({ customers }) {

    const [selectedCustomer, setSelectedCustomer] = useState({ customer: '', payloads: '' });
    const svgRef = useRef();
    const displayRef = useRef();

    useEffect(() => {
        // Get positions for each data object
        const pieData = d3.pie().value(d => d.count)(customers);

        // Define arcs for graphing and labling
        const arc = d3.arc().innerRadius(120).outerRadius(200)

        const svg = d3.select(svgRef.current)
            .attr('width', 400)
            .attr('height', 400)
            .append('g')
                .attr('transform', 'translate(200, 200)')

        const displayDiv = d3.select(displayRef.current)
        
        svg.append('g')
            .selectAll('path')
            .data(pieData)
            .join('path')
                .attr('d', arc)
                .attr('stroke', 'black')
                .attr('fill', d => d3.interpolateInferno(d.endAngle / (2* Math.PI)))
                .on('mouseover', (e,d) => {
                    displayDiv
                        .append('g')
                            .append('p')
                                .text(d.data.customer)
                            .append('p')
                                .text(d.data.count + (d.data.count === 1 ? ' Payload' : ' Payloads'))                                
                })
                .on('mouseout', () => {
                    displayDiv.select('g').remove();
                })
                
    })

    console.log(customers)
    return (
        <div id="piechart-area">
            <svg ref={svgRef}></svg>
            <div ref={displayRef} id="customer-display"></div>
        </div>
    )
}