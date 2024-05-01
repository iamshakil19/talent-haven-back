/* eslint-disable @typescript-eslint/no-explicit-any */

import { TErrorSources, TGenericErrorResponse } from "../interfaces/error";

const handleDuplicateError = (error: any): TGenericErrorResponse => {
  // Extract value within double quotes using regex
  const match = error.message.match(/"([^"]*)"/);

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];

  const field = Object.keys(error.keyPattern)[0];

  const errorSources: TErrorSources = [
    {
      path: field,
      message: `${extractedMessage} is already exists`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Duplicate-error',
    errorSources,
  };
};

export default handleDuplicateError;
