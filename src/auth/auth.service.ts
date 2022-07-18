import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prima: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { nickname, password } = loginDto;

    // Checks if the user record exists, using nickname to check
    const user = await this.prima.user.findUnique({ where: { nickname } });

    if (!user) {
      throw new UnauthorizedException('Usuário e/ou senha inválidos');
    }

    // check if the login information is corret
    const isHashValid = await bcrypt.compare(password, user.password);

    if (!isHashValid) {
      throw new UnauthorizedException('Usuário e/ou senha inválidos');
    }

    delete user.password;

    return {
      token: this.jwtService.sign({ nickname }),
      user,
    };
  }
}
