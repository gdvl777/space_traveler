import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  fetchDragons,
  cancelReserveDragon,
  setSelectedDragon,
  dragonsSlice,
} from '../../redux/dragons/dragonsSlice';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockAxios = new MockAdapter(axios);

describe('Dragons Slice', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('fetchDragons should dispatch fulfilled action with dragons data', async () => {
    const dragonsData = [
      {
        id: '1',
        name: 'Dragon 1',
        description: 'Description 1',
        flickr_images: [],
      },
      {
        id: '2',
        name: 'Dragon 2',
        description: 'Description 2',
        flickr_images: [],
      },
    ];

    mockAxios.onGet('https://api.spacexdata.com/v4/dragons').reply(200, dragonsData);

    const expectedActions = [
      fetchDragons.pending.type,
      fetchDragons.fulfilled.type,
    ];

    const store = mockStore({ dragons: [] });

    await store.dispatch(fetchDragons());

    const actions = store.getActions().map((action) => action.type);
    expect(actions).toEqual(expectedActions);
    expect(store.getState().dragons).toEqual(dragonsData.map((dragon) => ({
      dragon_id: dragon.id,
      dragon_name: dragon.name,
      description: dragon.description,
      flickr_images: dragon.flickr_images,
      reserved: false,
    })));
  });

  it('setSelectedDragon should update reserved status for a dragon', () => {
    const initialState = [
      {
        dragon_id: '1',
        dragon_name: 'Dragon 1',
        description: 'Description 1',
        flickr_images: [],
        reserved: false,
      },
      {
        dragon_id: '2',
        dragon_name: 'Dragon 2',
        description: 'Description 2',
        flickr_images: [],
        reserved: false,
      },
    ];

    const updatedState = dragonsSlice.reducer(initialState, setSelectedDragon.fulfilled({
      dragon_id: '1',
      dragon_name: 'Dragon 1',
      description: 'Description 1',
      flickr_images: [],
      reserved: true,
    }));

    expect(updatedState).toEqual([
      {
        dragon_id: '1',
        dragon_name: 'Dragon 1',
        description: 'Description 1',
        flickr_images: [],
        reserved: true, // Reserved status should be updated to true
      },
      {
        dragon_id: '2',
        dragon_name: 'Dragon 2',
        description: 'Description 2',
        flickr_images: [],
        reserved: false,
      },
    ]);
  });

  it('cancelReserveDragon should update reserved status for a dragon', () => {
    const initialState = [
      {
        dragon_id: '1',
        dragon_name: 'Dragon 1',
        description: 'Description 1',
        flickr_images: [],
        reserved: true,
      },
      {
        dragon_id: '2',
        dragon_name: 'Dragon 2',
        description: 'Description 2',
        flickr_images: [],
        reserved: false,
      },
    ];

    const updatedState = dragonsSlice.reducer(initialState, cancelReserveDragon.fulfilled('1'));

    expect(updatedState).toEqual([
      {
        dragon_id: '1',
        dragon_name: 'Dragon 1',
        description: 'Description 1',
        flickr_images: [],
        reserved: false, // Reserved status should be updated to false
      },
      {
        dragon_id: '2',
        dragon_name: 'Dragon 2',
        description: 'Description 2',
        flickr_images: [],
        reserved: false,
      },
    ]);
  });
});
