import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ unique: true, nullable: false })
  public username: string;

  @Column({ nullable: false })
  public password: string;
}
