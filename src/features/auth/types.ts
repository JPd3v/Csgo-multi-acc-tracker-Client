interface IuserInfo {
  _id: string;
  name: string;
}

interface IauthUserToken {
  accessToken: string;
}

export type { IuserInfo, IauthUserToken };
