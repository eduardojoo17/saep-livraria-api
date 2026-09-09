import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('editoras')
export class Editora {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  nome!: string;

  @Column("varchar")
  cidade!: string;

  @Column("varchar")
  email!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
