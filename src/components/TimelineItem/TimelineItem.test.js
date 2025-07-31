import React from 'react';
import { render } from '@testing-library/react';
import TimelineItem from './TimelineItem';

describe('TimelineItem', () => {
    const item = {
        id: 1,
        name: 'Test Event',
        start: '2021-01-01',
        end: '2021-01-02',
    };

    it('renders with correct text', () => {
        const { getByText } = render(
            <TimelineItem item={item} top={0} left="10%" width="20%" />
        );
        expect(getByText('Test Event')).toBeInTheDocument();
    });

    it('applies style props correctly', () => {
        const { container } = render(
            <TimelineItem item={item} top={50} left="10%" width="25%" />
        );
        const div = container.firstChild;
        expect(div).toHaveStyle({
            top: '50px',
            left: '10%',
            width: '25%',
        });
    });

    it('applies tooltip as title', () => {
        const { getByTitle } = render(
            <TimelineItem item={item} top={0} left="0%" width="10%" />
        );
        expect(getByTitle('Test Event')).toBeInTheDocument();
    });
});
