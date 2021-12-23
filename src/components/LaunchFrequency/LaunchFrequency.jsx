import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

import './LaunchFrequency.scss';

export default function LaunchFrequency ({ launches }) {

    const svgRef = useRef();
    const width = 600;
    const height = 400;
    const margin = { top: 50, right: 50, bottom: 50, left: 50};

    const years = new Map();

    launches.forEach(launch => {
        const year = launch.launch_year;

        if (years.has(year)) {
            years.set(year, years.get(year) + 1);
        } else {
            years.set(year, 1);
        }
    });

    const data = [];

    for (const [key, value] of years) {
        data.push({ year: +key, count: value })
    }

    const max = data.reduce((acc, year) => {
        return year.count > acc ? year.count : acc;
    }, 0);

    const min = data.reduce((acc, year) => {
        return year.count < acc ? year.count : acc
    }, data[0].count)

    useEffect(() => {
        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .style('background-color', 'yellow')
    
        const xScale = d3.scaleLinear()
            .domain([0, data.length])
            .range([margin.left, width - margin.right])
        
        const yScale = d3.scaleLinear()
            .domain([min - 1, max])
            .range([height - margin.bottom, margin.top])
        
        const xAxis = d3.axisBottom(xScale)
            .ticks(data.length)
            .tickFormat(i => (i+1) % 2 ? +launches[0].launch_year + i : '')

        const yAxis = d3.axisLeft(yScale)
            .ticks(20)
            .tickFormat(d => d)

        svg.append('g')
            .style('font-size', '16px')
            .call(xAxis)
            .attr('transform', `translate(0, ${height - margin.bottom })`)
        
        svg.append('g')
            .call(yAxis)
            .attr('transform', `translate(${margin.left}, 0)`)
    })

    return (
        <div id="frequency-container">
            <svg ref={svgRef}></svg>
        </div>
    )
}