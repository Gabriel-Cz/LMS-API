import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Profile, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { BcryptService } from './bcrypt.service';
import { LoginDto } from './dto/login-auth.dto';
import { UpdatePasswordDto } from './dto/update-passoword.dto';
import { SignUpDto } from './dto/sign-up-auth.dto';
import { AuthResponse, LoginResponse } from './entities/auth.entity';
import { InvalidTokenError, UserEmailRegisteredError } from './entities/Error';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private bcryptService: BcryptService,
    private jwtService: JwtService
  ) {}

  async validateUserWithEmail(email: User['email'], password: User['password']) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new UnauthorizedException("We couldn't found a User with that email");
    }
    const validatePassword = await this.bcryptService.compare(
      password,
      user.password
    );
    if (!validatePassword) {
      throw new UnauthorizedException('The password is incorrect');
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete user.password;
    return user;
  }

  async signUp(dto: SignUpDto): Promise<AuthResponse> {
    const userExist = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (userExist) {
      throw new UserEmailRegisteredError('The email is already registered.');
    }

    const encryptedPassword = await this.bcryptService.getHash(dto.password);
    const user = await this.prisma.user.create({
      data: {
        password: encryptedPassword,
        ...SignUpDto
      }
    })

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete user.password;
    return user;
  }

  async login({ id, email, ...user }: User & { Profile: Profile }): Promise<LoginResponse> {
    const payload = { id, email };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '1d' }),
      id: id,
      email: email,
      ...user,
    };
  }

  async updatePassword(dto: UpdatePasswordDto): Promise<boolean> {
    try {
      const { email } = this.jwtService.verify(dto.email);
      const securePassword = await this.bcryptService.getHash(dto.password);
      await this.prisma.user.update({
        where: { email },
        data: { password: securePassword },
      });
      return true;
    } catch (error) {
      throw new InvalidTokenError('Invalid token');
    }
  }
}
