import React from 'react';

import './MoreInfo.scss';
import DetailSection from '../DetailSection/DetailSection';
import CustomLink from '../CustomLink/CustomLink';
import svgIcons from '../../utilities/svgIcons';

export default function MoreInfo ({ launch, updateActiveLaunch, toggleDisplay }) {

    function handleDetailsClick () {
        updateActiveLaunch(null);
    }

    function handleToggleDisplay () {
        toggleDisplay();
    }

    function blockPropagation (e) {
        e.stopPropagation();
    }

    const payloads = launch.rocket.second_stage.payloads;

    return (
        <div className="launch-more-details" onClick={blockPropagation}>
            <DetailSection width={100}>
                <p><strong>Payload</strong></p>
                {
                    payloads.map((payload, index) => {
                        return (
                            <fieldset className="payload-data">
                                <legend className="payload-index">{index + 1} of {payloads.length}</legend>
                                <p><strong>ID</strong>: {payload.payload_id}</p>
                                <p><strong>Type</strong>: {payload.payload_type}</p>
                                <p><strong>Customer</strong>: {payload.customers[0]}</p>
                            </fieldset>
                        )
                    })
                }
            </DetailSection>
            <CustomLink icon={svgIcons.rocket} text="Mission Patch" link={launch.links.mission_patch} />
            <CustomLink icon={svgIcons.wiki} text="Wikipedia" link={launch.links.wikipedia} />
            <CustomLink icon={svgIcons.movie} text="Launch Video" link={launch.links.video_link} />
            
            <div className="button-display">
                <button id="back-button" className="btn-set" onClick={handleToggleDisplay}>Back</button>
                <button id="close-display" className="btn-set" onClick={handleDetailsClick}>Close</button>
            </div>
        </div>
    )
}