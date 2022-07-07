import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  // nickname
  @IsString()
  @ApiProperty({
    description: 'Nome de usuário. É usado ao fazer login. Deve ser único',
    example: 'charlesbrendon',
  })
  nickname: string;

  // Name
  @IsString()
  @ApiProperty({
    description: 'Nome de usuário. Apenas para ixibição',
    example: 'Charles Brendon',
  })
  name: string;

  // Password
  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  @ApiProperty({
    description:
      'Digite uma senha que combine letras números e caracteres especiais',
    example: 'AbD124!%',
  })
  password: string;

  // Confirm Passward
  @ApiProperty({
    description: 'Digite novamente a senha anterior',
    example: 'AbD124!%',
  })
  confirmPassword: string;

  // Image
  @IsUrl()
  @ApiProperty({
    description: 'Imagem de perfil do usuário',
    example: 'https://avatars.githubusercontent.com/u/85361355',
  })
  image: string;
}
