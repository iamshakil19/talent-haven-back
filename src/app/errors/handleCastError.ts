import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interfaces/error';

const handleCastError = (error: mongoose.Error.CastError): TGenericErrorResponse => {

  // let message = 'Invalid Id';

  // if (error.kind === 'ObjectId') {
  //   message = 'Wrong Id format';
  // }

  const errorSources: TErrorSources = [
    {
      path: error.path,
      message: error.message,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid ID',
    errorSources,
  };
};

export default handleCastError;
