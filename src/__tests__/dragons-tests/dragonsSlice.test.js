import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';
import dragonsReducer, {
  fetchDragons,
  setSelectedDragon,
  cancelReserveDragon,
} from '../../redux/dragons/dragonsSlice'; // update the path based on your file structure

jest.mock('axios');

describe('dragonsSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        dragons: dragonsReducer,
      },
    });
  });

  it('should handle initial state', () => {
    const actual = store.getState().dragons;
    expect(actual).toEqual([]);
  });

  it('should handle fetchDragons', async () => {
    const mockData = [
      {
        id: '1',
        name: 'Test Dragon 1',
        description: 'This is a test dragon',
        flickr_images: [],
      },
      {
        id: '2',
        name: 'Test Dragon 2',
        description: 'This is another test dragon',
        flickr_images: [],
      },
    ];

    axios.get.mockResolvedValueOnce({ data: mockData });

    await store.dispatch(fetchDragons());

    const expectedState = mockData.map((dragon) => ({
      dragon_id: dragon.id,
      dragon_name: dragon.name,
      description: dragon.description,
      flickr_images: dragon.flickr_images,
      reserved: false,
    }));

    expect(store.getState().dragons).toEqual(expectedState);
  });

  it('should handle setSelectedDragon', async () => {
    // Setting initial state
    store = configureStore({
      reducer: {
        dragons: dragonsReducer,
      },
      preloadedState: {
        dragons: [
          {
            dragon_id: '1',
            dragon_name: 'Test Dragon 1',
            description: 'This is a test dragon',
            flickr_images: [],
            reserved: false,
          },
        ],
      },
    });

    await store.dispatch(setSelectedDragon({ dragon_id: '1' }));
    expect(store.getState().dragons[0].reserved).toBe(true);
  });

  it('should handle cancelReserveDragon', async () => {
    // Setting initial state with a reserved dragon
    store = configureStore({
      reducer: {
        dragons: dragonsReducer,
      },
      preloadedState: {
        dragons: [
          {
            dragon_id: '1',
            dragon_name: 'Test Dragon 1',
            description: 'This is a test dragon',
            flickr_images: [],
            reserved: true,
          },
        ],
      },
    });

    await store.dispatch(cancelReserveDragon('1'));
    expect(store.getState().dragons[0].reserved).toBe(false);
  });
});
