interface IaxiosDefaultErrors {
  response: IerrorResponse;
}

interface IerrorResponse {
  status: number;
  data: IErrorresponseData;
}

interface IErrorresponseData {
  message?: string;
  errors?: IValdiationErrors[];
}
interface IValdiationErrors {
  msg: string;
  param: string;
  value: string;
}

export type { IaxiosDefaultErrors };
