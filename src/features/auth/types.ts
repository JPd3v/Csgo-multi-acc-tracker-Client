interface IuserInfo {
  _id: string;
  name: string;
}

interface IauthUserToken {
  accessToken: string | null;
}

export type { IuserInfo, IauthUserToken };
