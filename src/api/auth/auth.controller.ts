import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { SignInDto, SignUpDto } from '../user/dto/users.dto';
import appConfiguration from 'src/app.configuration';
import { Response, Request } from 'express';
import { Users } from '../user/entities/user.entity';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOkResponse({ description: 'Success' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @Post('signup')
  async signUp(@Req() request: Request, @Body() signUpDto: SignUpDto, @Res() response: Response): Promise<Response> {
    try {
      const user = await this.authService.register(signUpDto);
      return response.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOkResponse({ description: 'Success' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @Post('signin')
  async signIn(@Body() signInDto: SignInDto, @Res() response: Response, @Req() request: Request): Promise<Response> {
    try {
      const token = await this.authService.validate(signInDto);
  
      // Convert the JWT expiration time from seconds to milliseconds and ensure it's a valid number
      const maxAge = parseInt(process.env.JWT_EXPIRES_IN || '86400', 10) * 1000; // Default to 1 day (86400 seconds) if not set
  
      if (isNaN(maxAge)) {
        throw new Error('Invalid JWT_EXPIRES_IN environment variable');
      }
  
      // Set the authentication cookie with the calculated maxAge
      response.cookie('Authentication', token.accessToken, { httpOnly: true, maxAge });
  
      return response.status(HttpStatus.OK).json({ message: 'Success', data: token });
    } catch (error) {
      return response.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized', error: error.message });
    }  
  }
}
