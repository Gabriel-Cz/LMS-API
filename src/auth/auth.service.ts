import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Profile, User, UserRole } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { BcryptService } from './bcrypt.service';
import { UpdatePasswordDto } from './dto/update-passoword.dto';
import { SignUpDto } from './dto/sign-up-auth.dto';
import { AuthResponse, LoginResponse } from './entities/auth.entity';
import { InvalidTokenError, UserEmailRegisteredError } from './entities/Error';
import { LearnerService } from 'src/learner/learner.service';
import { InstructorService } from 'src/instructor/instructor.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private bcryptService: BcryptService,
    private learnerService: LearnerService,
    private instructorService: InstructorService,
    private jwtService: JwtService,
  ) {}

  async validateUserWithEmail(
    email: User['email'],
    password: User['password'],
  ) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new UnauthorizedException(
        "We couldn't found a User with that email",
      );
    }
    const validatePassword = await this.bcryptService.compare(
      password,
      user.password,
    );
    if (!validatePassword) {
      throw new UnauthorizedException('The password is incorrect');
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete user.password;
    return user;
  }

  async signUp({ Profile, Phone, ...dto }: SignUpDto): Promise<AuthResponse> {
    let user: any =
      (await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      })) || ({} as User);

    if (user) {
      throw new UserEmailRegisteredError('The email is already registered.');
    }

    const encryptedPassword = await this.bcryptService.getHash(dto.password);
    dto.password = encryptedPassword;

    if (dto.role === UserRole.LEARNER) {
      user = await this.learnerService.create({
        User: { Profile, Phone, ...dto },
      });
    }
    if (dto.role === UserRole.INSTRUCTOR) {
      user = await this.instructorService.create({
        User: { Profile, Phone, ...dto },
      });
    } else {
      user = await this.prisma.user.create({
        data: {
          ...dto,
          password: encryptedPassword,
          Profile: {
            create: {
              ...Profile,
              Phone: {
                create: {
                  ...Phone,
                },
              },
            },
          },
        },
        include: {
          Profile: {
            include: {
              Phone: true,
            },
          },
        },
      });
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete user.password;
    return user;
  }

  async login({
    id,
    email,
    ...user
  }: User & { Profile: Profile }): Promise<LoginResponse> {
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
