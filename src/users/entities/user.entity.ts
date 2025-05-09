import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

//---------------------------------------------------------------

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'userId' })
  userId: string;

  @Index('fullName_index')
  @Column({ type: 'varchar', length: 255 })
  fullName: string;

  @Index('idCard_index')
  @Column({ type: 'varchar', length: 20, unique: true })
  idCard: string;

  @Index('email_index')
  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  created_by_user_id: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'created_by_user_id' })
  createdBy?: User;

  @Column({ type: 'date', nullable: true })
  dateBirth: Date;

  @Column({ type: 'varchar', length: 40, default: 'otro' })
  intentionVote: string;

  @Index('department_index')
  @Column({ length: 100, nullable: true })
  department: string;

  @Index()
  @Column({ length: 100, nullable: true })
  municipalitie: string;

  @Index()
  @Column({ nullable: true })
  zona: number;

  @Index()
  @Column({ length: 50, nullable: true })
  votingPlace: string;

  @Column({ nullable: true })
  table: number;

  @Column({ length: 50, nullable: true })
  address: string;

  @Index('phone_index')
  @Column({ type: 'varchar', length: 20, unique: true, nullable: true })
  phone?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  rol?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;
}
