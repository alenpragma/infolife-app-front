export type LoginResponse = {
  statusCode: number;
  success: string;
  message: string;
  data: {
    token: string;
    user: any

  };
};

export type RegistrationResponse = {
  data: {
    statusCode: number;
    message: string;
    data: {
      token: string;
      user: any
    };
  };
};
