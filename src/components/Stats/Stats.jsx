import React from 'react';

import './Stats.scss';
import CustomerPieChart from '../CustomerPieChart/CustomerPieChart';
import LaunchFrequency from '../LaunchFrequency/LaunchFrequency';
import SuccessFailureChart from '../SuccessFailureChart/SuccessFailureChart';

export default function Stats ({ launchs }) {
    const allCustomers = [];
    const customerCount = {};

    // Add each rocket's possibly multiple payloads' customers to an array
    launchs.forEach(launch => {
        let launchPayloads = launch.rocket.second_stage.payloads;
        allCustomers.push(...launchPayloads.map(payload => {
            return payload.customers;
        }))
    });

    // Get the count for each of the different customers
    // as an object
    allCustomers.forEach(customer => {
        if (customerCount.hasOwnProperty(customer)) {
            customerCount[customer] += 1;
        } else {
            customerCount[customer] = 1;
        }
    })

    // Convert the customer count object to an array of objects
    const customers = Object.keys(customerCount).map(key => {
        return { customer: key, count: customerCount[key] };
    });

    return (
        <div id="stats-container">
            <div id="stats-wrapper">
                <CustomerPieChart customers={customers} />
                <LaunchFrequency launches={launchs} />
                <SuccessFailureChart launches={launchs} />
            </div>
        </div>
    )
}