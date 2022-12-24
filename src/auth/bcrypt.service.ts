import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  private saltRounds = 10;

  async getHash(text: string) {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(text, salt);
  }

  compare(text: string, hash: string) {
    return bcrypt.compare(text, hash);
  }
}