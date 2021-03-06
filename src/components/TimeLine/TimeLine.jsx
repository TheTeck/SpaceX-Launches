import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

import './TimeLine.scss';
//import apiService from '../../utilities/apiService';

const rocketColors = {
    'Falcon 1': '#d86628',
    'Falcon 9': '#4b78bd',
    'Falcon Heavy': '#6baa47'
}

export default function TimeLine ({ launchData, activeLaunch, updateActiveLaunch }) {

    const [data] = useState(launchData);

    const svgRef = useRef();

    // async function fetchData () {
    //     try {
    //         const apiData = await apiService.getData();
    //         setData(apiData);
    //     } catch (error) {
    //         console.log('Unable to retreive data');
    //     }
    // }

    // useEffect(() => {
    //     fetchData();
    // }, [])

    useEffect(() => {
        const svg = d3.select(svgRef.current);

        const circleRadius = 10;
        const lineLength = 200 - circleRadius;
        const minYear = d3.min(data, d => d3.timeParse('%Y')(d.launch_year))
        const maxYear = new Date('2022-01-02');

        const y = d3.scaleTime()
            .domain([minYear, maxYear])
            .range([0, 4000])
        
        // Make circle larger and show text when hovered over
        function handleMouseOver () {
            this.parentNode.appendChild(this);

            d3.select(this)
                .select('circle')
                .transition()
                    .duration(250)
                    .attr('r', circleRadius * 4)
                    .attr('stroke-width', 3)
            
            d3.select(this)
                .select('text')
                    .transition()
                        .duration(250)
                        .style('visibility', 'visible')
                        .style('font-size', '36px')
        }

        // Make circle small and text hidden when mouse stops hovering
        function handleMouseOut () {
            this.parentNode.appendChild(this);

            d3.select(this)
                .select('circle')
                .transition()
                    .duration(250)
                    .attr('r', circleRadius)
                    .attr('stroke-width', 0)
            
            d3.select(this)
                .select('text')
                    .transition()
                        .duration(250)
                        .style('font-size', '0px')
        }

        // Show launch details
        function handleShowDetails (e, d) {
            updateLines(lines);
            updateCircles(circles);
            updateTexts(texts);

            const longer = lineLength + circleRadius * 6;

            d3.select(this)
                .select('line')
                    .attr('x2', longer)
                    .style('stroke-width', 3)
            
            d3.select(this)
                .select('circle')
                    .attr('cx', longer)
                    .style('stroke-width', 3)
            
            d3.select(this)
                .select('text')
                    .attr('x', longer)
            
            updateActiveLaunch(d);
        }

        

        // Draw the vertical axis
        svg.append('g')
            .call(d3.axisLeft(y))
            .attr('transform', 'translate(100, 100)')
            .attr('class', 'timeline-axis')
        
        const nodes = svg.selectAll('.node')
            .data(data, d => d.flight_number)
            .enter()
            .append('g')
                .attr('class', 'node')
                .attr('transform', 'translate(0, 100)')
                .on('mouseover', handleMouseOver)
                .on('mouseout', handleMouseOut)
                .on('click', handleShowDetails)

        // Draw the line from the axis to the circle
        const lines = nodes
            .append('line')

        updateLines(lines);

        // Draw the circles for each launch entry
        const circles = nodes
            .append('circle')
        
        updateCircles(circles);                
                
        // Draw numbers in the circles
        const texts = nodes
            .append('text')
        
        updateTexts(texts);

        function updateCircles (c) {
            c
                //.attr('id', (d, i) => 'circle-' + i)
                .attr('class', 'node-circle')
                .attr('cx', (d, i) => lineLength + circleRadius + (i % 2 ? circleRadius * 2 : 0))
                .attr('cy', d => y(new Date(d.launch_date_utc)))
                .attr('r', circleRadius)
                .style('fill', d => rocketColors[d.rocket.rocket_name])
                .style('visibility', 'visible')
                .attr('stroke', 'white')
                .style('stroke-width', 0)
        }

        function updateLines (l) {
            l
                .attr('id', (d, i) => 'extension-' + i)
                .attr('class', 'line-extension')
                .attr('x1', 100)
                .attr('y1', d=> y(new Date(d.launch_date_utc)))
                .attr('x2', (d, i) => lineLength + (i % 2 ? circleRadius * 2 : 0))
                .attr('y2', d=> y(new Date(d.launch_date_utc)))
                .style('stroke-width', 1)
        }

        function updateTexts (t) {
            t
                .attr('class', 'launch-number')
                .attr('x', (d, i) => lineLength + circleRadius + (i % 2 ? circleRadius * 2 : 0))
                .attr('y', d => y(new Date(d.launch_date_utc)))
                .style('font-size', '0px')
                .attr('text-anchor', 'middle')
                .attr('alignment-baseline', 'central')
                .style('visibility', 'hidden')
                .text(d => d.flight_number)
        }
    }, [data, updateActiveLaunch])

    return (
        <div id="timeline-offset-wrapper">
            <div id="timeline-container">
                <svg ref={svgRef}></svg>
            </div>
        </div>
    )
}