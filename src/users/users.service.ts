import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { validateUUID } from 'src/utils/validateuuid';
import { UpdateUserIntentionDto } from './dto/updateIntention-user';

//-----------------------------------------------------

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { idCard, phone, email, dateBirth, fullName, createdById, role } =
      createUserDto;

    try {
      const existingUser = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.createdBy', 'createdBy')
        .select([
          'user.userId',
          'user.fullName',
          'user.idCard',
          'createdBy.userId',
          'createdBy.fullName',
        ])
        .where('user.idCard = :idCard', { idCard: String(idCard) })
        .orWhere('user.phone = :phone', { phone: String(phone) })
        .orWhere('user.email = :email', { email: String(email) })
        .getOne();

      if (existingUser)
        return {
          operation: 'FAIL',
          message: `${existingUser.fullName.toUpperCase()} con documento ${existingUser.idCard} ya fue creado por ${existingUser.createdBy?.fullName.toUpperCase()}`,
        };

      const createUser = this.userRepository.create({
        fullName: fullName.toLowerCase(),
        idCard,
        dateBirth,
        phone: phone || undefined,
        email: email?.toLowerCase() || undefined,
        created_by_user_id: createdById || undefined,
        rol: role || undefined,
      });

      const newUser = await this.userRepository.save(createUser, {});

      return {
        operation: 'SUCCESS',
        message: `El ${newUser.rol} ${newUser.fullName.toUpperCase()} con documento ${newUser.idCard} fue creado exitosamente`,
      };
    } catch (error) {
      this.logger.error('Error al crear usuario', error);
      throw new InternalServerErrorException('Error al crear usuario');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    validateUUID(id);

    const { department, municipalitie, votingPlace, fullName, email, ...data } =
      updateUserDto;

    const updateUser = this.userRepository.create({
      userId: id,
      fullName: fullName.toLowerCase(),
      email: email?.toLocaleLowerCase(),
      department: department?.toLowerCase(),
      municipalitie: municipalitie?.toLowerCase(),
      votingPlace: votingPlace?.toLowerCase(),
      ...data,
    });

    try {
      const currentUser = await this.userRepository.update(id, updateUser);

      if (!currentUser.affected)
        return {
          operation: 'FAIL',
          message: `El usuario no fue editado`,
        };

      return {
        operation: 'SUCCESS',
        message: `${fullName.toUpperCase()} fue editado exitosamente`,
      };
    } catch (error) {
      this.logger.error('Error al editar usuario', error);
      throw new BadRequestException('Error al editar usuario');
    }
  }

  async updateIntentionVote(id: string, intention: UpdateUserIntentionDto) {
    validateUUID(id);

    const { intentionVote } = intention;

    try {
      const currentUser = await this.userRepository.update(id, {
        intentionVote: intentionVote.toLowerCase(),
      });

      if (!currentUser.affected)
        return {
          operation: 'FAIL',
          message: `El usuario no fue editado`,
        };

      return {
        operation: 'SUCCESS',
        message: `Intención editada exitosamente`,
      };
    } catch (error) {
      this.logger.error('Error al editar usuario', error);
      throw new InternalServerErrorException('Error al editar usuario');
    }
  }
}
