
interface IResponseError {
  problem?: string;
  data?: {
    errors: [{detail: string}],
  };
}

export const getParsedAPIError = (response: IResponseError) => {
  let errorMessage = response.problem;
  if (response.data.errors && response.data.errors[0].detail) {
    errorMessage = response.data.errors[0].detail;
  }
  return errorMessage;
};
