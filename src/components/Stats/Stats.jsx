import React, { useState } from 'react';

import './Stats.scss';
import CustomerPieChart from '../CustomerPieChart/CustomerPieChart';

export default function Stats ({ launchs }) {

    const allCustomers = launchs.map(launch => launch.rocket.second_stage.payloads[0].customers[0]);
    const customerCount = {};

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
            <CustomerPieChart customers={customers} />
        </div>
    )
}