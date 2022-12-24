import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Profile, User } from '@prisma/client';

export const GetUser = createParamDecorator(
  (_data, context: ExecutionContext): User & { Profile: Profile } => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  }
);