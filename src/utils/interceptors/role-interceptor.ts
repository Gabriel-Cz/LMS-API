import {
  CallHandler,
  ContextType,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { User, UserRole } from '@prisma/client';
import { Observable } from 'rxjs';
import Error from '../dictionaries/error.dictionary';

const exception = (contextType: ContextType, text?: string): void => {
  if (contextType === 'http') {
    throw new UnauthorizedException(text);
  } else {
    throw new WsException(text);
  }
};

@Injectable()
export class RoleInterceptor implements NestInterceptor {
  private logger = new Logger(RoleInterceptor.name);
  constructor(private roles: UserRole[]) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const contextType: ContextType = context.getType();
    const req =
      contextType === 'http'
        ? context.switchToHttp().getRequest()
        : context.switchToWs().getClient();

    const user = req.user as User;
    if (!user) {
      exception(contextType);
    }
    if (this.roles.includes(user.role)) {
      exception(contextType, Error.UNAUTHORIZED_ERROR.description);
    }
    return next.handle();
  }
}
