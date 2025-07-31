import React from 'react';
import useTimelineLayout from "../../hooks/useTimelineLayout";
import TimelineItem from "../TimelineItem/TimelineItem";
import './Timeline.css';

const Timeline = ({ items }) => {
    const { lanes, startDate, endDate } = useTimelineLayout(items);

    const totalDays = Math.max(
        1,
        (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
    );

    return (
        <div className="timeline-wrapper">
            <div
                className="timeline-container"
                style={{ height: `${lanes.length * 40}px` }}
            >
                {lanes.map((lane, laneIndex) =>
                    lane.map((item) => {
                        const startOffset =
                            (new Date(item.start) - new Date(startDate)) /
                            (1000 * 60 * 60 * 24);
                        const duration =
                            (new Date(item.end) - new Date(item.start)) /
                            (1000 * 60 * 60 * 24) +
                            1;
                        const leftPercent = (startOffset / totalDays) * 100;
                        const widthPercent = (duration / totalDays) * 100;


                        return (
                            <TimelineItem
                                key={item.id}
                                item={item}
                                top={`${laneIndex * 2.5}rem`}
                                left={`${leftPercent}%`}
                                width={`${widthPercent}%`}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Timeline;
