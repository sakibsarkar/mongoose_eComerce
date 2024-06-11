import mongoose from "mongoose";
import { IErrorSources, IGenericErrorRes } from "../interface/error";

const handleCastError = (err: mongoose.Error.CastError): IGenericErrorRes => {
  const errorSources: IErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: "Invalid ID",
    errorSources,
  };
};

export default handleCastError;
