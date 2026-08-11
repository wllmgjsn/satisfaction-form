interface User {
  id: number;
  username: string;
  password: string;
}

type PotentialUser = Omit<User, "id">;

interface AuthenticatedUser {
  username: string;
  token: string;
}

interface NewFormResponse {
  username : string,
  responses: string[];
}

export type { AuthenticatedUser, User, PotentialUser, NewFormResponse };
