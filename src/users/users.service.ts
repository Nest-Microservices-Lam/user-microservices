import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PermissionRole } from './interfaces/permission_role.interface';
import { Permissions } from './enums/permissions.type';
import { Role } from './enums/role.type';
import { validateUUID } from 'src/utils/validateuuid';
import { UpdateUserpasswordDto } from './dto/update-user-password';
import { UpdateUserIntentionDto } from './dto/updateIntention-user';

//-----------------------------------------------------

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  private userAccess: PermissionRole = {
    role: Role.FRIEND,
    permissions: [Permissions.USER],
  };

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const {
      idCard,
      phone,
      email,
      password,
      dateBirth,
      fullName,
      permission_role,
      createdById,
    } = createUserDto;
    let cryptPassword: string = '';

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

      if (password) {
        cryptPassword = await bcrypt.hash(password, 10);
      }

      switch (permission_role?.role) {
        case Role.ADMIN:
          this.userAccess = {
            role: Role.ADMIN,
            permissions: [Permissions.ADVANCED],
          };
          break;
        case Role.COORDINATOR:
          this.userAccess = {
            role: Role.COORDINATOR,
            permissions: [Permissions.INTERMEDIANTE],
          };
          break;
        case Role.LEADER:
          this.userAccess = {
            role: Role.LEADER,
            permissions: [Permissions.BASIC],
          };
          break;
        case Role.FAMILIAR:
          this.userAccess = {
            role: Role.FAMILIAR,
            permissions: [Permissions.USER],
          };
          break;
        default:
          this.userAccess = this.userAccess = {
            role: Role.FRIEND,
            permissions: [Permissions.USER],
          };
      }

      const createUser = this.userRepository.create({
        fullName: fullName.toLowerCase(),
        idCard,
        dateBirth,
        phone: phone || undefined,
        email: email?.toLowerCase() || undefined,
        password: cryptPassword || undefined,
        permission_role: this.userAccess,
        created_by_user_id: createdById,
      });

      const newUser = await this.userRepository.save(createUser, {});

      return {
        operation: 'SUCCESS',
        message: `El ${newUser.permission_role.role} ${newUser.fullName.toUpperCase()} con documento ${newUser.idCard} fue creado exitosamente`,
      };
    } catch (error) {
      this.logger.error('Error al crear usuario', error);
      throw new InternalServerErrorException('Error al crear usuario');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    validateUUID(id);

    const { department, municipalitie, votingPlace, ...data } = updateUserDto;

    const updateUser = this.userRepository.create({
      userId: id,
      department: department?.toLowerCase(),
      municipalitie: municipalitie?.toLowerCase(),
      votingPlace: votingPlace?.toLowerCase(),
      ...data,
    });

    try {
      const currentUser = await this.userRepository.save(updateUser);

      if (!currentUser)
        return {
          operation: 'FAIL',
          message: `El usuario no fue editado`,
        };

      return {
        operation: 'SUCCESS',
        message: `${currentUser.fullName.toUpperCase()} fue editado exitosamente`,
      };
    } catch (error) {
      this.logger.error('Error al editar usuario', error);
      throw new InternalServerErrorException('Error al editar usuario');
    }
  }

  async updatePassword(id: string, updateUserDto: UpdateUserpasswordDto) {
    validateUUID(id);
  }

  async updateIntentionVote(id: string, intention: UpdateUserIntentionDto) {
    validateUUID(id);
  }
}
