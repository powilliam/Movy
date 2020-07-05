import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Movie } from '../movies/movie.entity';

@Entity()
export class Sharedlist {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ nullable: false })
  public name!: string;

  @Column({ name: 'access_code', nullable: false, unique: true })
  public accessCode!: string;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  public creator!: User;

  @ManyToMany(
    () => User,
    user => user.participating,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinTable()
  public participants!: User[];

  @OneToMany(
    () => Movie,
    movie => movie.sharedlist,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  public movies!: Movie[];
}
