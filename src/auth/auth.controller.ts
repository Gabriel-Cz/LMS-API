import {
  Controller,
  Post,
  Body,
  Res,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Profile, User } from '@prisma/client';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UpdatePasswordDto } from './dto/update-passoword.dto';
import { SignUpDto } from './dto/sign-up-auth.dto';
import { GetUser } from 'src/utils/decorators';
import { AuthGuard } from '@nestjs/passport';
import Success from 'src/utils/dictionaries/succes.dictionary';
import Error from 'src/utils/dictionaries/error.dictionary';
import { CustomLogger } from 'src/logger';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new CustomLogger(AuthController.name);

  constructor(private readonly authService: AuthService) { }

  @ApiResponse(Success.SIGN_UP)
  @ApiResponse(Error.SIGN_UP)
  @Post('sign-up')
  async signUp(@Res() res: Response, @Body() dto: SignUpDto): Promise<void> {
    try {
      const user = await this.authService.signUp(dto);
      res.status(Success.SIGN_UP.status).send(user);
    } catch (error) {
      this.logger.error(error);
      res.status(Error.SIGN_UP.status).send(Error.SIGN_UP.description);
    }
  }

  @ApiResponse(Success.LOGIN)
  @ApiResponse(Error.LOGIN)
  @Post('login')
  async login(
    @Res() res: Response,
    @GetUser() user: User & { Profile: Profile }
  ): Promise<void> {
    try {
      const userFound = await this.authService.login(user);
      res.status(Success.LOGIN.status).send(userFound);
    } catch (error) {
      this.logger.error(error);
      res.status(Error.LOGIN.status).send(Error.LOGIN.description);
    }
  }

  @UseGuards(LocalAuthGuard)
  @ApiResponse(Success.UPDATE_PASSWORD)
  @ApiResponse(Error.UPDATE_PASSWORD)
  @Put('update-password')
  async resetPassword(
    @Res() res: Response,
    @Body() dto: UpdatePasswordDto
  ): Promise<void> {
    try {
      const user = await this.authService.updatePassword(dto);
      res.status(Success.UPDATE_PASSWORD.status).send(user);
    } catch (error) {
      this.logger.error(error);
      res.status(Error.UPDATE_PASSWORD.status).send(Error.UPDATE_PASSWORD.description);
    }
  }
}
