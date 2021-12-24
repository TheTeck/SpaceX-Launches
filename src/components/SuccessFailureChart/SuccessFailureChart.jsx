import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import './SuccessFailureChart.scss';

export default function SuccessFailureChart ({ launches }) {

    const svgRef = useRef();
    const width = 600;
    const height = 400;
    const margin = { top: 50, right: 50, bottom: 50, left: 50};

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

    console.log(years)

    const data = [];

    // Turn the nested object into an array of objects
    Object.keys(years).forEach(key => {
        data.push(years[key]);
    })

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

    })

    return (
        <div id="successfailure-container">
            <div id="successfailure-title">Successes and Failures Each Year</div>
            <div id="successfailure-wrapper">
                <svg ref={svgRef}></svg>
            </div>
        </div>
    )
}