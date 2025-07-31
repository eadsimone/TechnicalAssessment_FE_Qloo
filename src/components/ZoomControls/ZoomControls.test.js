import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ZoomControls from './ZoomControls';

describe('ZoomControls', () => {
    it('displays the correct zoom percentage', () => {
        const { getByText } = render(
            <ZoomControls zoomLevel={1.5} onZoomIn={() => {}} onZoomOut={() => {}} />
        );
        expect(getByText('Zoom: 150%')).toBeInTheDocument();
    });

    it('calls onZoomIn and onZoomOut when buttons are clicked', () => {
        const zoomInMock = jest.fn();
        const zoomOutMock = jest.fn();

        const { getByText } = render(
            <ZoomControls zoomLevel={1} onZoomIn={zoomInMock} onZoomOut={zoomOutMock} />
        );

        fireEvent.click(getByText(/Zoom In/i));
        fireEvent.click(getByText(/Zoom Out/i));

        expect(zoomInMock).toHaveBeenCalledTimes(1);
        expect(zoomOutMock).toHaveBeenCalledTimes(1);
    });
});
