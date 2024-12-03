export interface AuthCredentials {
    username: string;
    password: string;
  }
  
  export interface AuthResponse {
    token: string;
    user: {
      id: string;
      email: string;
      name: string;
    };
  }
  