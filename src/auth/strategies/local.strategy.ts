import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from '@prisma/client';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate({ email, username, password }: any): Promise<User> {
    let user: User = {
      id: '',
      email: '',
      password: '',
      role: 'ADMIN',
      createdAt: undefined
    };
    if (email) {
      user = await this.authService.validateUserWithEmail(email, password)
    } else {
      user = await this.authService.validateUserWithEmail(username, password)
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete user.password;
    return user;
  }
}
