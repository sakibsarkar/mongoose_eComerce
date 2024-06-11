/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

import AppError from "../errors/AppError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import handleValidationError from "../errors/handleValidationError";
import handleZodError from "../errors/handleZodError";
import { IErrorSources } from "../interface/error";

const globalErrorHandler: ErrorRequestHandler = (errror, req, res, next) => {
  //setting default values
  let message = "Something went wrong!";
  let statusCode = 500;
  let errorMessages: IErrorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (errror instanceof ZodError) {
    const simpleErr = handleZodError(errror);
    statusCode = simpleErr?.statusCode;
    message = simpleErr?.message;
    errorMessages = simpleErr?.errorSources;
  } else if (errror?.name === "ValidationError") {
    const simpleErr = handleValidationError(errror);
    statusCode = simpleErr?.statusCode;
    message = simpleErr?.message;
    errorMessages = simpleErr?.errorSources;
  } else if (errror?.name === "CastError") {
    const simpleErr = handleCastError(errror);
    statusCode = simpleErr?.statusCode;
    message = simpleErr?.message;
    errorMessages = simpleErr?.errorSources;
  } else if (errror?.code === 11000) {
    const simpleErr = handleDuplicateError(errror);
    statusCode = simpleErr?.statusCode;
    message = simpleErr?.message;
    errorMessages = simpleErr?.errorSources;
  } else if (errror instanceof AppError) {
    statusCode = errror?.statusCode;
    message = errror.message;
    errorMessages = [
      {
        path: "",
        message: errror?.message,
      },
    ];
  } else if (errror instanceof Error) {
    message = errror.message;
    errorMessages = [
      {
        path: "",
        message: errror?.message,
      },
    ];
  }

  //ultimate return
  return res.status(statusCode).json({
    success: false,
    message,
    errorMessages: errorMessages,
    stack: errror?.stack,
  });
};

export default globalErrorHandler;

//pattern
/*
success
message
errorSources:[
  path:'',
  message:''
]
stack
*/
