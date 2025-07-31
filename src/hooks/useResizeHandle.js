import { useEffect } from 'react';

const useResizeHandle = ({ resizing, item, startDate, totalDays, updateItem, setResizing, containerRef }) => {
    useEffect(() => {
        const el = containerRef.current;
        if (!resizing || !el) return;

        const handleMouseMove = (e) => {
            const rect = el.parentNode.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const percent = offsetX / rect.width;
            const daysOffset = Math.round(percent * totalDays);
            const newDate = new Date(startDate);
            newDate.setDate(newDate.getDate() + daysOffset);
            const newDateStr = newDate.toISOString().split('T')[0];

            if (resizing === 'left' && new Date(newDateStr) <= new Date(item.end)) {
                updateItem({ ...item, start: newDateStr });
            }
            if (resizing === 'right' && new Date(newDateStr) >= new Date(item.start)) {
                updateItem({ ...item, end: newDateStr });
            }
        };

        const handleMouseUp = () => {
            setResizing(null);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [resizing, item, startDate, totalDays, updateItem, setResizing, containerRef]);
};

export default useResizeHandle;
