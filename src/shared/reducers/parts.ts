export const getReducerPartFulfilled = () => ({
    error: false,
    pending: false,
    fulfilled: true,
    rejected: false,
});

export const getReducerPartPending = () => ({
  error: false,
  pending: true,
  fulfilled: false,
  rejected: false,
});

export const getReducerPartRejected = (errorMessage: string) => ({
  error: errorMessage,
  pending: false,
  fulfilled: false,
  rejected: true,
});
