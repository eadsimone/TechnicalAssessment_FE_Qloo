import { useMemo } from 'react';
import {sortByStartDate} from "../utils/dateUtils";

const DAY_MS = 1000 * 60 * 60 * 24;
const MIN_WIDTH_PERCENT = 6;
const MAX_NAME_LENGTH = 20;

const useTimelineLayout = (items) => {
    return useMemo(() => {
        const sortedItems = sortByStartDate(items);
        const allDates = items.flatMap(({ start, end }) => [
            new Date(start),
            new Date(end),
        ]);

        const startDate = new Date(Math.min(...allDates));
        const endDate = new Date(Math.max(...allDates));
        const totalDays = Math.max(1, (endDate - startDate) / DAY_MS);

        const lanes = [];

        for (const item of sortedItems) {
            const start = new Date(item.start);
            const end = new Date(item.end);
            const duration = (end - start) / DAY_MS + 1;

            const widthPercent = (duration / totalDays) * 100;
            const isShortAndLongName =
                widthPercent < MIN_WIDTH_PERCENT && item.name.length > MAX_NAME_LENGTH;

            let placed = false;

            for (const lane of lanes) {
                const hasConflict = lane.some((existing) => {
                    const existingStart = new Date(existing.start);
                    const existingEnd = new Date(existing.end);
                    return start <= existingEnd && end >= existingStart;
                });

                if (!hasConflict && !isShortAndLongName) {
                    lane.push(item);
                    placed = true;
                    break;
                }
            }

            if (!placed) {
                lanes.push([item]);
            }
        }

        return { lanes, startDate, endDate };
    }, [items]);
};

export default useTimelineLayout;
