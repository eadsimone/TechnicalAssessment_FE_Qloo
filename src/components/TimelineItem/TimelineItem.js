import React, { useState } from 'react';
import './TimelineItem.css';

const TimelineItem = ({ item, top, left, width }) => {
    const [name, setName] = useState(item.name);

    return (
        <div
            className="timeline-item"
            style={{ top, left, width }}
            title={name}
        >
            <div
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => setName(e.target.innerText)}
                className="timeline-item-name"
            >
                {name}
            </div>
        </div>
    );
};

export default TimelineItem;
