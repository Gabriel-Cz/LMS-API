import { User, UserRole } from '@prisma/client';

export class AuthResponse implements Omit<User, 'password'> {
  id: string;
  lastLoggedIn: Date | null;
  email: string;
  username: string;
  role: UserRole | null;
  createdAt: Date | null;
}

export class LoginResponse implements Omit<User, 'password'> {
  id: string;
  accessToken: string;
  lastLoggedIn: Date | null;
  email: string;
  username: string;
  role: UserRole | null;
  createdAt: Date | null;
}
