export type Role = "USER" | "ADMIN";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  picture: string;
  role: Role;
}
