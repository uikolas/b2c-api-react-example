import produce from 'immer';
import {
  CUSTOMER_DATA_REQUEST,
  CUSTOMER_DATA_UPDATE,
  CUSTOMER_PASSWORD_UPDATE,
} from '../../constants/ActionTypes/Pages/CustomerProfile';
import {
  IReduxState,
} from '../../../typings/app';
import {getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected} from "../parts";
import {ICustomerDataParsed} from "../../interfaces/customer";
import {IPayloadError} from "../../interfaces/errors/index";


export interface ICustomerDataState extends IReduxState {
  data: {
    profile: ICustomerDataParsed | null,
    isPasswordUpdated: boolean | null;
  };
}

export const initialState: ICustomerDataState = {
  data: {
    profile: null,
    isPasswordUpdated: null,
  },
};

export const pageCustomerProfile = function(state: ICustomerDataState = initialState, action: any): ICustomerDataState {
  switch (action.type) {
    case `${CUSTOMER_DATA_REQUEST}_REJECTED`:
    case `${CUSTOMER_DATA_UPDATE}_REJECTED`:
      return handleRejected(state, action.payload);
    case `${CUSTOMER_DATA_REQUEST}_PENDING`:
    case `${CUSTOMER_DATA_UPDATE}_PENDING`:
      return handlePending(state);
    case `${CUSTOMER_DATA_REQUEST}_FULFILLED`:
    case `${CUSTOMER_DATA_UPDATE}_FULFILLED`:
      return handleFulfilled(state, action.payload);
    case `${CUSTOMER_PASSWORD_UPDATE}_FULFILLED`:
      return handleUpdatePasswordFulfilled(state);
    case `${CUSTOMER_PASSWORD_UPDATE}_REJECTED`:
      return handleUpdatePasswordRejected(state, action.payload);
    case `${CUSTOMER_PASSWORD_UPDATE}_PENDING`:
      return handleUpdatePasswordPending(state);
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

const handleRejected = (customerState: ICustomerDataState, payload: IPayloadError) => {
  return {
    ...customerState,
    data: {
      ...customerState.data,
    },
    ...getReducerPartRejected(payload.error),
  };
};

const handlePending = (customerState: ICustomerDataState) => {
  return {
    ...customerState,
    data: {
      ...customerState.data,
    },
    ...getReducerPartPending(),
  };
};

const handleUpdatePasswordFulfilled = (customerState: ICustomerDataState) => {
  return {
    ...customerState,
    data: {
      ...customerState.data,
      isPasswordUpdated: true,
    },
    ...getReducerPartFulfilled(),
  };
};

const handleUpdatePasswordPending = (customerState: ICustomerDataState) => {
  return {
    ...customerState,
    data: {
      ...customerState.data,
      isPasswordUpdated: false,
    },
    ...getReducerPartPending(),
  };
};

const handleUpdatePasswordRejected = (customerState: ICustomerDataState, payload: IPayloadError) => {
  return {
    ...customerState,
    data: {
      ...customerState.data,
      isPasswordUpdated: false,
    },
    ...getReducerPartRejected(payload.error),
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
  if (!isCustomerProfilePresent(state, props)) {
    return null;
  }

  return state.pageCustomerProfile.data.profile;
}

export function isCustomerPasswordUpdated(state: any, props: any): boolean | null {
  return (isStateExist(state, props))
    ? state.pageCustomerProfile.data.isPasswordUpdated
    : null;
}

function isStateExist(state: any, props: any): boolean {
  return Boolean(state.pageCustomerProfile);
}
