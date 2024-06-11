export type IErrorSources = {
  path: string | number;
  message: string;
}[];

export type IGenericErrorRes = {
  statusCode: number;
  message: string;
  errorSources: IErrorSources;
};

export interface IAnyObject {
  [key: string]: any;
}
