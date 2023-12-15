export interface User {
  name: string | null;
  email: string | null;
}

export interface CreateUserVariables {
  email: string;
  password: string;
  displayName: string;
}

export interface LogInVariables {
  email: string;
  password: string;
}
