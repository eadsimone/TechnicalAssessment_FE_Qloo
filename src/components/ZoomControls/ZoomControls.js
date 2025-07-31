import React from 'react';
import './ZoomControls.css';

const ZoomControls = ({ zoomLevel, onZoomIn, onZoomOut }) => {
    return (
        <div className="zoom-controls">
            <button className="zoom-button" onClick={onZoomIn}>Zoom In +</button>
            <button className="zoom-button" onClick={onZoomOut}>Zoom Out -</button>
            <span>Zoom: {Math.round(zoomLevel * 100)}%</span>
        </div>
    );
};

export default ZoomControls;
