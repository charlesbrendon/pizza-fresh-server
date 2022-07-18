import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @ApiProperty({
    description: 'Nome do produto',
    example: 'Pizza de Atum',
  })
  name: string;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @ApiProperty({
    description: 'Preço do produto',
    example: 40.55,
  })
  price: number;

  @IsString()
  @ApiProperty({
    description: 'Descrição do produto',
    example: 'Pizza de Atum, molho, mussarela e cebola',
  })
  description: string;

  @IsUrl()
  @ApiProperty({
    description: 'Imagem do produto',
    example: 'https://i.imgur.com/2WTQHql.png',
  })
  image: string;
}
