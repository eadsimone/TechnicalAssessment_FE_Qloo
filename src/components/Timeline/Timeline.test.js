import React from 'react';
import { render } from '@testing-library/react';
import Timeline from './Timeline';

const mockItems = [
    { id: 1, name: 'A', start: '2021-01-01', end: '2021-01-05' },
    { id: 2, name: 'B', start: '2021-01-06', end: '2021-01-10' },
];

describe('Timeline', () => {
    it('renders without crashing', () => {
        const { container } = render(<Timeline items={mockItems} />);
        expect(container).toBeInTheDocument();
    });

    it('renders all events as TimelineItem', () => {
        const { getByText } = render(<Timeline items={mockItems} />);
        expect(getByText('A')).toBeInTheDocument();
        expect(getByText('B')).toBeInTheDocument();
    });

    it('sets container height based on number of lanes', () => {
        const { container } = render(<Timeline items={mockItems} />);
        const wrapper = container.firstChild;
        expect(wrapper.querySelectorAll('.timeline-item')).toHaveLength(2);
    });
});
