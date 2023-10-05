import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import Dragons, { Dragon } from '../../pages/dragon'; // Asegúrate de que la ruta al archivo Dragons sea correcta

// Mock de useDispatch y useSelector
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('Dragon Component', () => {
  const mockDragon = {
    dragon_id: '1',
    dragon_name: 'Dragon 1',
    description: 'This is Dragon 1',
    flickr_images: ['image_url'],
    reserved: false,
  };

  it('renders Dragon component correctly', () => {
    const { getByText, getByTestId } = render(<Dragon dragon={mockDragon} />);
    expect(getByText('Dragon 1')).toBeInTheDocument();
    expect(getByText('This is Dragon 1')).toBeInTheDocument();
    expect(getByTestId('dragon-image')).toBeInTheDocument();
    expect(getByTestId('reserve-button')).toBeInTheDocument();
  });

  it('calls dispatch when Reserve Dragon button is clicked', () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    const { getByTestId } = render(<Dragon dragon={mockDragon} />);
    fireEvent.click(getByTestId('reserve-button'));

    expect(dispatch).toHaveBeenCalledWith({
      type: 'dragons/setSelectedDragon',
      payload: mockDragon,
    });
  });

  it('calls dispatch when Cancel Reservation button is clicked', () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    const reservedDragon = { ...mockDragon, reserved: true };

    const { getByText } = render(<Dragon dragon={reservedDragon} />);
    fireEvent.click(getByText('Cancel Reservation'));

    expect(dispatch).toHaveBeenCalledWith({
      type: 'dragons/cancelReserveDragon',
      payload: '1',
    });
  });
});

describe('Dragons Component', () => {
  it('renders Dragons component correctly', () => {
    useSelector.mockReturnValue([]); // Mock useSelector to return an empty array
    const { getByText } = render(<Dragons />);
    expect(getByText('Reserve Dragon')).toBeInTheDocument();
  });
});
