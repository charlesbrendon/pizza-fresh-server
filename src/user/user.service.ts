import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
@Injectable()
export class UserService {
  private userSelect = {
    id: true,
    nickname: true,
    name: true,
    password: false,
    image: true,
    createdAt: true,
    updatedAt: true,
  };

  constructor(private readonly prisma: PrismaService) {}
  // Find all user
  findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      select: this.userSelect,
    });
  }
  // Function to check ID
  async findById(id: string): Promise<User> {
    const record = await this.prisma.user.findUnique({
      where: { id },
      select: this.userSelect,
    });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }
    return record;
  }
  // Find user By ID
  async findOne(id: string): Promise<User> {
    return this.findById(id);
  }
  // Create user
  async create(dto: CreateUserDto): Promise<User> {
    if (dto.password != dto.confirmPassword) {
      throw new BadRequestException('A senhas digitadas não são iguais.');
    }

    delete dto.confirmPassword;

    const data: User = {
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
    };
    return this.prisma.user
      .create({ data, select: this.userSelect })
      .catch(handleError);
  }
  // Edit user by ID
  async update(id: string, dto: UpdateUserDto): Promise<User> {
    await this.findById(id);

    if (dto.password) {
      if (dto.password != dto.confirmPassword) {
        throw new BadRequestException('A senhas digitadas não são iguais.');
      }
    }

    delete dto.confirmPassword;

    const data: Partial<User> = {
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
    };

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.user
      .update({
        where: { id },
        data,
        select: this.userSelect,
      })
      .catch(handleError);
  }
  // Remove user by ID
  async delete(id: string) {
    await this.findById(id);
    await this.prisma.user.delete({ where: { id } });
  }
}
