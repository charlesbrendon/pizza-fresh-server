import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'ID do usuário que está criando o pedido',
    example: 'ecb90a23-92cd-44e9-808f-0b1ccc4f8507',
  })
  userId: string;

  @IsInt()
  @IsPositive()
  @ApiProperty({
    description: 'Número da mesa que está fazendo o pedido ',
    example: 1,
  })
  tableNumber: number;

  @IsUUID(undefined, { each: true })
  @ApiProperty({
    description: 'Lista com os IDs dos produtos que estão no pedido',
    example:
      '["066866ad-ada4-4614-a121-35e40e0c302a", "e7eaa21a-ebd9-40fd-95b1-f33df74ceb7c" ]',
  })
  products: string[];
}
