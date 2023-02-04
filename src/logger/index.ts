import { ConsoleLogger, Injectable } from '@nestjs/common';
import { AuditAction, AuditResource } from './entities/types';

@Injectable()
export class CustomLogger extends ConsoleLogger {
  constructor(customContext?: string) {
    super(customContext);
  }

  audit(username: string, action: string, data?: string): void {
    super.log(`User: ${username}, Action: ${action}, Data: ${data}`);
  }

  debug(message: string | object) {
    message = JSON.stringify(message);
    super.debug(message);
  }

  error(error: any): void {
    const message = error.message || 'No message';
    const stack = error.stack || 'No stacktrace';
    super.error(message, stack);
  }

  intercept(
    req: any,
    controller: string,
    handler: string,
    action: AuditAction,
    resource?: AuditResource
  ) {
    const user = req.user?.username || 'unauthenticated';
    if ((process.env.node_env = 'development')) {
      super.log(
        JSON.stringify(
          {
            user: user,
            action: action,
            resource: resource,
            url: `${req.method} ${req.url}`,
            origin: req.ip,
            'controller-handler': `${controller}.${handler}`,
          },
          null,
          2
        )
      );
    }
  }

  log(message: string) {
    super.log(message);
  }

  verbose(message: string) {
    super.verbose(message);
  }

  warn(message: string) {
    super.warn(message);
  }
}
