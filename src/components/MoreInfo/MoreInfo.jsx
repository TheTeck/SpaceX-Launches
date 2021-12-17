import React from 'react';

import './MoreInfo.scss';
import DetailSection from '../DetailSection/DetailSection';

export default function MoreInfo ({ launch, updateActiveLaunch, toggleDisplay }) {

    function handleDetailsClick () {
        updateActiveLaunch(null);
    }

    function handleToggleDisplay () {
        toggleDisplay();
    }

    const payloads = launch.rocket.second_stage.payloads;

    return (
        <div className="launch-details">
            <DetailSection width={100}>
                <p><strong>Payload</strong></p>
                {
                    payloads.map((payload, index) => {
                        return (
                            <div className="payload-data">
                                <p className="payload-index">{index + 1} of {payloads.length}</p>
                                <p><strong>ID</strong>: {payload.payload_id}</p>
                                <p><strong>Type</strong>: {payload.payload_type}</p>
                                <p><strong>Customer</strong>: {payload.customers[0]}</p>
                            </div>
                        )
                    })
                }
            </DetailSection>
            <div className="button-display">
                <button id="more-button" className="btn-set" onClick={handleToggleDisplay}>Back</button>
                <button id="close-display" className="btn-set" onClick={handleDetailsClick}>Close</button>
            </div>
        </div>
    )
}