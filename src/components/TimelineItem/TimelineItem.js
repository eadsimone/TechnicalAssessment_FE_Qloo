import React, { useRef, useState } from 'react';
import useResizeHandle from '../../hooks/useResizeHandle';
import './TimelineItem.css';

const TimelineItem = ({ item, top, left, width, startDate, totalDays, updateItem }) => {
    const [name, setName] = useState(item.name);
    const [resizing, setResizing] = useState(null);
    const containerRef = useRef(null);

    useResizeHandle({
        resizing,
        item,
        startDate,
        totalDays,
        updateItem,
        setResizing,
        containerRef
    });

    return (
        <div
            ref={containerRef}
            className="timeline-item"
            style={{ top, left, width }}
            title={name}
        >
            <div className="resize-handle left" onMouseDown={() => setResizing('left')} />
            <div
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => {
                    const newName = e.target.innerText;
                    setName(newName);
                    updateItem({ ...item, name: newName });
                }}
                className="timeline-item-name"
            >
                {name}
            </div>
            <div className="resize-handle right" onMouseDown={() => setResizing('right')} />
        </div>
    );
};

export default TimelineItem;
