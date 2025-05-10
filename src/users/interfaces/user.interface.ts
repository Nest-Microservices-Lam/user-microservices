import { Role } from '../enums/role.type';

export interface UserInterface {
  userId: string;
  fullName: string;
  createdById?: string;
  idCard: string;
  dateBirth?: Date;
  role?: Role;
  phone?: string;
  email?: string;
  password: string;
}
