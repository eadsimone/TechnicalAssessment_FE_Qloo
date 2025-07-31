import { useMemo } from 'react';

const DAY_MS = 1000 * 60 * 60 * 24;
const MIN_WIDTH_PERCENT = 6;
const MAX_NAME_LENGTH = 20;

const useTimelineLayout = (items) => {
    return useMemo(() => {
        const sorted = [...items].sort((a, b) => new Date(a.start) - new Date(b.start));

        const allDates = items.flatMap(({ start, end }) => [start, end]);
        const startDate = allDates.reduce((a, b) => (a < b ? a : b));
        const endDate = allDates.reduce((a, b) => (a > b ? a : b));
        const totalDays = (new Date(endDate) - new Date(startDate)) / DAY_MS;

        const lanes = [];

        sorted.forEach((item) => {
            const start = new Date(item.start);
            const end = new Date(item.end);
            const duration = (end - start) / DAY_MS + 1;

            const widthPercent = (duration / totalDays) * 100;
            const isShortAndLongName = widthPercent < MIN_WIDTH_PERCENT && item.name.length > MAX_NAME_LENGTH;

            let placed = false;

            for (let lane of lanes) {
                const conflict = lane.some((existing) => {
                    const existingStart = new Date(existing.start);
                    const existingEnd = new Date(existing.end);
                    return start <= existingEnd && end >= existingStart;
                });

                if (!conflict && !isShortAndLongName) {
                    lane.push(item);
                    placed = true;
                    break;
                }
            }

            if (!placed) {
                lanes.push([item]);
            }
        });

        return { lanes, startDate, endDate };
    }, [items]);
};

export default useTimelineLayout;
