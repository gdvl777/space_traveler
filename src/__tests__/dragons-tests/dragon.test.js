import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import dragonsReducer from '../../redux/dragons/dragonsSlice'; // Adjust path as needed
import Dragons, { Dragon } from '../../pages/dragon';

const mockDragon = {
  dragon_id: '1',
  dragon_name: 'Dragon 1',
  description: 'desc1',
  flickr_images: ['image1'],
  reserved: false,
};

const store = configureStore({ reducer: { dragons: dragonsReducer } });

describe('<Dragon /> component', () => {
  it('displays dragon details', () => {
    render(
      <Provider store={store}>
        <Dragon dragon={mockDragon} />
      </Provider>,
    );

    expect(screen.getByText(mockDragon.dragon_name)).toBeInTheDocument();
    expect(screen.getByAltText(`Imagen de ${mockDragon.dragon_name}`)).toBeInTheDocument();
    expect(screen.getByTestId('dragon-image')).toHaveAttribute('src', mockDragon.flickr_images[0]);
  });

  it('handles reservation button click', () => {
    render(
      <Provider store={store}>
        <Dragon dragon={mockDragon} />
      </Provider>,
    );

    const button = screen.getByTestId('reserve-button');
    fireEvent.click(button);
  });
});

describe('<Dragons /> container', () => {
  it('renders Dragons component', () => {
    const { container } = render(
      <Provider store={store}>
        <Dragons />
      </Provider>,
    );

    expect(container.firstChild).toBeDefined();
  });
});
