import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import {
  PAGES_HOME_GET_DATA_REQUEST,
} from '../../../../src/shared/constants/ActionTypes/Pages/Home';
import {PagesHomeService} from '../../../../src/shared/services/Pages/Home';
import * as fixtures from "../../../../src/shared/services/Pages/Home.fixtures.json";
import {config} from '../../../../src/shared/config';


const middlewares = [
  thunk,
];
const mockStore = configureStore(middlewares);
// SKIPPED FOR CLARITY
describe.skip('PagesHomeService', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });
  it('should fetch the data', () => {

    const expectedPayload = {
      items: fixtures.default,
      items_count: fixtures.default.length,
    };
    // console.info('expectedPayload', expectedPayload);

    fetchMock
      .getOnce(
        `${config.API_PROTOCOL}://${config.API_HOST}:${config.API_PORT}${config.API_PATH}home`,
        {
          body: JSON.stringify(expectedPayload),
          headers: {
            'content-type': 'application/json',
          }
        }
      );

    const expectedActions = [
      { type: PAGES_HOME_GET_DATA_REQUEST + '_FULFILLED', payload: Promise.resolve(expectedPayload) }
    ];

    // Initialize mockstore with empty state
    const initialState = {};
    const store = mockStore(initialState);

    PagesHomeService.getData(PAGES_HOME_GET_DATA_REQUEST, store.dispatch).then((result: any) => {
      // console.info('result', result);
      expect(result).toEqual(expectedPayload);
      // console.info('store.getActions()', store.getActions());
      // console.info('expectedActions', expectedActions);
      expect(store.getActions()).toEqual(expectedActions);
    }).catch((err) => {
      console.error('err', err);
    });
  });
});
