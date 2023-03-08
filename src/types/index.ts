interface IaxiosDefaultErrors {
  response: IerrorResponse;
}

interface IerrorResponse {
  status: number;
  data: IErrorresponseData;
}

interface IErrorresponseData {
  message?: string;
  errors?: [{ msg: string }];
}

export type { IaxiosDefaultErrors };
