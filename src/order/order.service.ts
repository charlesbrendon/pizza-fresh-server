import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateOrderDto) {
    const data: Prisma.OrderCreateInput = {
      user: {
        connect: { id: dto.userId },
      },
      table: {
        connect: { number: dto.tableNumber },
      },
      products: {
        connect: dto.products.map((productId) => ({
          id: productId,
        })),
      },
    };
    return this.prisma.order
      .create({
        data,
        select: {
          id: true,
          table: {
            select: {
              number: true,
            },
          },
          user: {
            select: {
              name: true,
            },
          },
          products: {
            select: {
              name: true,
            },
          },
        },
      })
      .catch(handleError);
  }

  findAll() {
    return this.prisma.order.findMany({
      select: {
        id: true,
        user: {
          select: { name: true },
        },
        table: {
          select: { number: true },
        },
        products: {
          select: { name: true },
        },
        _count: { select: { products: true } },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
        table: {
          select: {
            number: true,
          },
        },
        products: {
          select: {
            name: true,
            description: true,
            price: true,
            image: true,
          },
        },
      },
    });
  }
}
