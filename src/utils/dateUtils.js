export const DAY_MS = 1000 * 60 * 60 * 24;

export const getTotalDays = (start, end) =>
    Math.max(1, (new Date(end) - new Date(start)) / DAY_MS);

export const sortByStartDate = (items) =>
    [...items].sort((a, b) => new Date(a.start) - new Date(b.start));

export const formatDate = (date) =>
    new Date(date).toISOString().split('T')[0];
