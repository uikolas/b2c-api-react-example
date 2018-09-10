import {
  PAGES_HOME_GET_DATA_REQUEST,
} from '../../../../src/shared/constants/ActionTypes/Pages/Home';
import {initialState, pagesHome} from '../../../../src/shared/reducers/Pages/Home';
import * as fixtures from "../../../../src/shared/services/Pages/Home.fixtures.json";


describe('Pages Home Reducer', () => {
  it('should return the initial state', () => {
    expect(pagesHome(undefined, {})).toEqual(initialState);
  });

  it('should handle PAGES_HOME_GET_DATA_REQUEST', () => {
    const expectedPayload = {
      items: fixtures,
      items_count: fixtures.length,
    };

    const expectedError = new Error('Expected error.');

    expect(
      pagesHome([], {
        type: PAGES_HOME_GET_DATA_REQUEST + '_PENDING',
        meta: {},
      })
    ).toEqual({
      ...initialState,
      error: null,
      data: {},
      pending: true,
      fulfilled: false,
      rejected: false,
    });
    expect(
      pagesHome([], {
        type: PAGES_HOME_GET_DATA_REQUEST + '_FULFILLED',
        payload: expectedPayload,
      })
    ).toEqual({
      ...initialState,
      error: null,
      data: expectedPayload,
      pending: false,
      fulfilled: true,
      rejected: false,
    });
    expect(
      pagesHome([], {
        type: PAGES_HOME_GET_DATA_REQUEST + '_REJECTED',
        error: expectedError,
      })
    ).toEqual({
      ...initialState,
      error: expectedError,
      data: {},
      pending: false,
      fulfilled: false,
      rejected: true,
    });
  });
});
