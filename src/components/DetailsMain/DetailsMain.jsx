import React from 'react';

import './DetailsMain.scss';
import DetailSection from '../DetailSection/DetailSection';

export default function DetailsMain ({ launch, updateActiveLaunch, toggleDisplay }) {

    function handleDetailsClick () {
        updateActiveLaunch(null);
    }

    function handleToggleDisplay () {
        toggleDisplay();
    }

    function blockPropagation (e) {
        e.stopPropagation();
    }

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                    'August', 'September', 'October', 'November', 'December'];
    const date = new Date(launch.launch_date_local);
    const formattedDate = months[date.getMonth()] + ' ' + date.getDate() + ', '
                            + date.getFullYear();

    return (
        <div className="launch-details" onClick={blockPropagation}>
            <DetailSection width={15} bold={true} centered={true}>
                { launch.flight_number }
            </DetailSection>
            <DetailSection width={65} centered={true}>
                { formattedDate }
            </DetailSection>
            <DetailSection width={100}>
                <p><strong>Mission Name</strong>: { launch.mission_name }</p>
                <p><strong>Rocket Name</strong>: { launch.rocket.rocket_name }</p>
                <p><strong>Launch Site</strong>: { launch.launch_site.site_name_long }</p>
            </DetailSection>
            <DetailSection width={100} centered={true} bold={true}>
                { launch.launch_success ? <p className="success">Launch Successful</p>
                    : <p className="fail">Launch Failed</p> }
            </DetailSection>
            {
                launch.launch_failure_details ? 
                    <DetailSection width={100}>
                        <p><strong>Reason For Failure</strong>: { launch.launch_failure_details.reason }</p>
                    </DetailSection>
                : ''
            }
            {
                launch.details ?
                    <DetailSection width={100}>
                        <p><strong>Details</strong>: { launch.details }</p>
                    </DetailSection>
                : ''
            }
            <div className="button-display">
                <button id="more-button" className="btn-set" onClick={handleToggleDisplay}>More Info</button>
                <button id="close-display" className="btn-set" onClick={handleDetailsClick}>Close</button>
            </div>
            
        </div>
    )
}