import produce from 'immer';
import {
  CUSTOMER_DATA_REQUEST,
} from '../../constants/ActionTypes/Pages/CustomerProfile';
import {
  IReduxState,
} from '../../../typings/app';
import {getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected} from "../parts";
import {ICustomerDataParsed} from "../../interfaces/customer";


export interface ICustomerDataState extends IReduxState {
  data: {
    profile: ICustomerDataParsed | null
  };
}

export const initialState: ICustomerDataState = {
  data: {
    profile: null,
  },
};

export const pageCustomerProfile = function(state: ICustomerDataState = initialState, action: any): ICustomerDataState {
  switch (action.type) {
    case `${CUSTOMER_DATA_REQUEST}_REJECTED`:
      return handleRejected(state, action.payload);
    case `${CUSTOMER_DATA_REQUEST}_PENDING`:
      return handlePending(state, action.payload);
    case `${CUSTOMER_DATA_REQUEST}_FULFILLED`:
      return handleFulfilled(state, action.payload);
    default:
      return state;
  }
};

// handlers
const handleFulfilled = (customerState: ICustomerDataState, payload: ICustomerDataParsed | null) => {
  return {
    ...customerState,
    data: {
      ...customerState.data,
      profile: {...payload},
    },
    ...getReducerPartFulfilled(),
  };
};

const handleRejected = (customerState: ICustomerDataState, payload: any) => {
  return {
    ...customerState,
    data: {
      ...customerState.data,
    },
    ...getReducerPartRejected(payload.error),
  };
};

const handlePending = (customerState: ICustomerDataState, payload: any) => {
  return {
    ...customerState,
    data: {
      ...customerState.data,
    },
    ...getReducerPartPending(),
  };
};

// selectors
export function isPageCustomerProfileInitiated(state: any, props: any): boolean {
  return Boolean( isStateExist(state, props)
                  && state.pageCustomerProfile.initiated
                  && state.pageCustomerProfile.initiated === true
  );
}

export function isCustomerProfilePresent(state: any, props: any): boolean {
  return Boolean(isStateExist(state, props)
                && state.pageCustomerProfile.data.profile
                && state.pageCustomerProfile.data.profile.id
  );
}

export function isPageCustomerProfileLoading(state: any, props: any): boolean {
  return Boolean(isStateExist(state, props)
          && state.pageCustomerProfile.pending
          && state.pageCustomerProfile.pending === true
  );
}

export function isPageCustomerProfileRejected(state: any, props: any): boolean {
  return Boolean(isStateExist(state, props)
          && state.pageCustomerProfile.rejected
          && state.pageCustomerProfile.rejected === true
  );
}

export function isPageCustomerProfileFulfilled(state: any, props: any): boolean {
  return Boolean(isStateExist(state, props)
          && state.pageCustomerProfile.fulfilled
          && state.pageCustomerProfile.fulfilled === true
  );
}

export function getCustomerProfile(state: any, props: any): ICustomerDataParsed | null {
  if (isPageCustomerProfileRejected(state, props) || !isCustomerProfilePresent(state, props)) {
    return null;
  }

  return state.pageCustomerProfile.data.profile;
}

function isStateExist(state: any, props: any): boolean {
  return Boolean(state.pageCustomerProfile);
}
