import {
  Controller,
  Post,
  Body,
  Res,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Profile, User } from '@prisma/client';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UpdatePasswordDto } from './dto/update-passoword.dto';
import { SignUpDto } from './dto/sign-up-auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { GetUser } from 'src/utils/decorators';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('sign-up')
  async signUp(@Res() res: Response, @Body() dto: SignUpDto): Promise<void> {
    try {
      const user = await this.authService.signUp(dto);
      res.status(201).send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @Res() res: Response,
    @GetUser() user: User & { Profile: Profile }
  ): Promise<void> {
    try {
      const userFound = await this.authService.login(user);
      res.status(201).send(userFound);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  @Put('update-password')
  async resetPassword(
    @Req() req: Request,
    @Res() res: Response,
    @Body() dto: UpdatePasswordDto
  ): Promise<void> {
    try {
      const user = await this.authService.updatePassword(dto);
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
