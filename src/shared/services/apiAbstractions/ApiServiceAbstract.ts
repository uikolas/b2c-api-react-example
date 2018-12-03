import { unexpectedServerError } from 'src/shared/constants/messages/errors';

interface IResponseError {
  problem?: string;
  data?: {
    errors: [{detail: string}],
  };
}

export class ApiServiceAbstract {

  protected static getParsedAPIError = (response: IResponseError) => {
    let errorMessage: string;
    if (!response || !response.problem) {
      errorMessage = unexpectedServerError;
    } else {
      errorMessage = response.problem;
    }

    // TODO: If there are possible to be more than one error - loop them
    if (response.data && response.data.errors && response.data.errors[0] && response.data.errors[0].detail) {
      errorMessage = response.data.errors[0].detail;
    }
    return errorMessage;
  };
}
