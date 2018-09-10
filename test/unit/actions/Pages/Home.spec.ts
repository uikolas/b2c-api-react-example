import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import {getDataAction, dataActionPendingState} from '../../../../src/shared/actions/Pages/Home';
import * as fixtures from "../../../../src/shared/services/Pages/Home.fixtures.json";
import {config} from '../../../../src/shared/config';


const middlewares = [
  thunk,
];
const mockStore = configureStore(middlewares);

describe('ActionsPagesHome', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });
  it('should create an action to get the data', () => {

    const expectedPayload = {
      items: fixtures,
      items_count: fixtures.length,
    };

    fetchMock
      .getOnce(
        `${config.API_PROTOCOL}://${config.API_HOST}:${config.API_PORT}${config.API_PATH}home`,
        {
          body: expectedPayload,
            headers: {
            'content-type': 'application/json',
          }
        }
      );


    const expectedActions = [
      dataActionPendingState,
    ];

    // Initialize mockstore with empty state
    const initialState = {};
    const store = mockStore(initialState);
    store.dispatch(getDataAction());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
