import React from 'react';
import './TimelineItem.css';

const TimelineItem = ({ item, top, left, width }) => {
    return (
        <div
            className="timeline-item"
            style={{ top, left, width }}
            title={item.name}
        >
            {item.name}
        </div>
    );
};

export default TimelineItem;
