import { Profile, User, UserRole } from '@prisma/client';

export class AuthResponse implements Omit<User, 'password'> {
  id: string;
  email: string;
  role: UserRole | null;
  createdAt: Date | null;
}

export class LoginResponse implements Omit<User, 'password'> {
  id: string;
  accessToken: string;
  email: string;
  role: UserRole | null;
  createdAt: Date | null;
  Profile: Profile
}
