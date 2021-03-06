import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT gerado pelo login',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6ImNoYXJsZXNicmVuZG9uIiwiaWF0IjoxNjU3OTQxNzA5LCJleHAiOjE2NTgwMjgxMDl9.LcLr0CbfkDaCBKSmA7H0ydcXzasoaURukQiyffG8KdA',
  })
  token: string;

  @ApiProperty({
    description: 'Dados do usuário autenticado',
  })
  user: User;
}
