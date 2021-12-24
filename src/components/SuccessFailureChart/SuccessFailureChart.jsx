import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import './SuccessFailureChart.scss';
import LegendEntry from '../LegendEntry/LegendEntry';

export default function SuccessFailureChart ({ launches }) {

    const svgRef = useRef();
    const width = 600;
    const height = 400;
    const margin = { top: 120, right: 50, bottom: 50, left: 50};
    const successColor = 'purple';
    const failColor = 'orange';

    const years = {};

    // Make the object structure for each year and it's count of
    // successes and failures
    launches.forEach(launch => {
        const year = launch.launch_year;
        const didIt = launch.launch_success;

        if (years.hasOwnProperty(year)) {
            years[year].success += didIt ? 1 : 0;
            years[year].failure += didIt ? 0 : 1;
        } else {
            years[year] = {};
            years[year].success = didIt ? 1 : 0;
            years[year].failure = didIt ? 0 : 1;
        }
    });

    const data = [];

    // Turn the nested object into an array of objects
    Object.keys(years).forEach(key => {
        data.push(years[key]);
    })

    // Pad the data with void year
    data.splice(5, 0, { success: 0, failure: 0 });

    console.log(data)

    // Get the maximum count for any year
    const max = data.reduce((acc, year) => {
        const largest = year.success > year.failure ? year.success : year.failure;
        return largest > acc ? largest : acc;
    }, 0);

    // Get the minimum count for any year
    const min = data.reduce((acc, year) => {
        const smallest = year.success < year.failure ? year.success : year.failure;
        return smallest < acc ? smallest : acc
    }, data[0].success);

    useEffect(() => {
        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .style('background-color', 'white')
    
        const xScale = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([margin.left, width - margin.right])
            .padding(.2)
        
        const yScale = d3.scaleLinear()
            .domain([min, max])
            .range([height - margin.bottom, margin.top])
        
        const xAxis = d3.axisBottom(xScale)
            .ticks(data.length + 2)
            .tickFormat(i => (i+1) % 2 ? +launches[0].launch_year + i : '')

        const yAxis = d3.axisLeft(yScale)
            .ticks(20)
            .tickFormat(d => d % 2 ? d : '')
        
        svg.append('g')
            .style('font-size', '16px')
            .call(xAxis)
            .attr('transform', `translate(0, ${height - margin.bottom })`)
        
        svg.append('g')
            .style('font-size', '16px')
            .call(yAxis)
            .attr('transform', `translate(${margin.left}, 0)`)
        
        svg.append('g')
            .selectAll('rect')
            .data(data)
            .join('rect')
                .attr('x', (d,i) => xScale(i))
                .attr('y', d => yScale(d.success))
                .attr('height', d => yScale(0) - yScale(d.success))
                .attr('width', xScale.bandwidth() / 2)
                .attr('fill', successColor)
        
        svg.append('g')
            .selectAll('rect')
            .data(data)
            .join('rect')
                .attr('x', (d,i) => xScale(i) + xScale.bandwidth() / 2)
                .attr('y', d => yScale(d.failure))
                .attr('height', d => yScale(0) - yScale(d.failure))
                .attr('width', xScale.bandwidth() / 2)
                .attr('fill', failColor)
    })

    return (
        <div id="successfailure-container">
            <div id="successfailure-title">Successful and Failed Launches Per Year</div>
            
            <div id="successfailure-wrapper">
                <div id="bar-legend">
                    <LegendEntry color={successColor} title="Successful Launch" />
                    <LegendEntry color={failColor} title="Failed Launch" />
                </div>
                <svg ref={svgRef}></svg>
            </div>
        </div>
    )
}