import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthSerrvice) {
    super();
  }

  async validate({ email, username, password }: any): Promise<User> {
    const user: User;
    if (email) await this.authService.validateUserWithEmail(email, password);
    if (username) {
      await this.authService.validateUserWithUsername(username, password);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete user.password;
    return user;
  }
}
