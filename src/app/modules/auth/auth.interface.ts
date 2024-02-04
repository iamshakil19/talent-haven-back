export interface ILoginUser {
  email: string;
  password: string;
}

export interface ILoginUserResponse {
  accessToken: string;
  refreshToken?: string;
}

export interface IRefreshTokenResponse {
  accessToken: string;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}
