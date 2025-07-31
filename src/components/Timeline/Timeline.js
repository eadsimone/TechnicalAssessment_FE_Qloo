import React, {useEffect, useRef, useState} from 'react';
import useTimelineLayout from '../../hooks/useTimelineLayout';
import TimelineItem from '../TimelineItem/TimelineItem';
import ZoomControls from "../ZoomControls/ZoomControls";
import './Timeline.css';

const Timeline = ({ items }) => {
    const [zoomLevel, setZoomLevel] = useState(1); // 1 = 100%, 2 = zoom in, 0.5 = zoom out
    const [localItems, setLocalItems] = useState(() => {
        const saved = localStorage.getItem('timeline-items');
        return saved ? JSON.parse(saved) : items;
    });

    const { lanes, startDate, endDate } = useTimelineLayout(localItems);

    const totalDays = Math.max(
        1,
        (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
    );

    const scaledDays = totalDays / zoomLevel;

    const wrapperRef = useRef(null);

    const updateItem = (updatedItem) => {
        setLocalItems((prev) => {
            const updated = prev.map((it) =>
                it.id === updatedItem.id ? updatedItem : it
            );
            return updated.sort((a, b) => new Date(a.start) - new Date(b.start));
        });
    };

    useEffect(() => {
        localStorage.setItem('timeline-items', JSON.stringify(localItems));
    }, [localItems]);

    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;

        const handleWheel = (e) => {
            e.preventDefault();

            setZoomLevel((z) => {
                const direction = e.deltaY > 0 ? -1 : 1;
                const factor = direction > 0 ? 2 : 0.5;
                const next = z * factor;
                return Math.min(Math.max(next, 0.25), 4);
            });
        };

        el.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            el.removeEventListener('wheel', handleWheel);
        };
    }, []);

    return (
        <div>
            <ZoomControls
                zoomLevel={zoomLevel}
                onZoomIn={() => setZoomLevel((z) => Math.min(z * 2, 4))}
                onZoomOut={() => setZoomLevel((z) => Math.max(z / 2, 0.25))}
            />

            <div
                className="timeline-wrapper"
                ref={wrapperRef}
            >
                <div
                    className="timeline-container"
                    style={{
                        height: `${lanes.length * 2.5}rem`,
                        minWidth: '100%',
                    }}
                >
                    {lanes.map((lane, laneIndex) =>
                        lane.map((item) => {
                            const startOffset =
                                (new Date(item.start) - new Date(startDate)) / (1000 * 60 * 60 * 24);
                            const duration =
                                (new Date(item.end) - new Date(item.start)) / (1000 * 60 * 60 * 24) + 1;
                            const leftPercent = (startOffset / scaledDays) * 100;
                            const widthPercent = (duration / scaledDays) * 100;

                            return (
                                <TimelineItem
                                    key={item.id}
                                    item={item}
                                    top={`${laneIndex * 2.5}rem`}
                                    left={`${leftPercent}%`}
                                    width={`${widthPercent}%`}
                                    startDate={startDate}
                                    totalDays={scaledDays}
                                    updateItem={updateItem}
                                />
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default Timeline;
