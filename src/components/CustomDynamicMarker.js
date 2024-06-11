import React, { useState } from 'react';
import { Popup, Marker } from 'react-leaflet';
import L from 'leaflet';
import { AQIColor } from './helperfunction';

const CustomDynamicMarker = ({ position, index, properties, handleClick, setToggleDisplayData, selectedProperties }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const markerColor = AQIColor(properties.air_quality_index);

    const CustomMarkerIcon = L.divIcon({
        className: 'custom-marker-icon',
        html: `<div class="w-8 h-8 hover:opacity-45 rounded-full flex items-center justify-center text-white font-bold" 
            style="background-color: ${markerColor};">
            ${properties.air_quality_index}
            </div>`,
    });

    const handleMarkerClick = () => {
        handleClick(index);
        setToggleDisplayData(true);
        setIsPopupOpen(true);
    };

    const handlePopupClose = () => {
        setToggleDisplayData(false);
        setIsPopupOpen(false);
    };

    const renderPopupContent = () => {
        return (
            <div>
                {Object.keys(selectedProperties).map(property => {
                    if (selectedProperties[property]) {
                        return (
                            <div key={property}>
                                <strong>{property}: </strong>
                                {properties[property]}
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        );
    };

    return (
        <Marker 
            position={position} 
            icon={CustomMarkerIcon}
            eventHandlers={{
                click: handleMarkerClick,
                popupclose: handlePopupClose
            }}
        >
            {isPopupOpen && (
                <Popup onClose={handlePopupClose}>
                    {renderPopupContent()}
                </Popup>
            )}
        </Marker>
    );
}

export default CustomDynamicMarker;
