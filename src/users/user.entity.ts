import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Sharedlist } from '../sharedlists/sharedlist.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ unique: true, nullable: false })
  public username: string;

  @Column({ nullable: false, select: false })
  public password: string;

  @OneToMany(
    () => Sharedlist,
    list => list.creator,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  public sharedlists: Sharedlist[];

  @ManyToMany(
    () => Sharedlist,
    list => list.participants,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  public participating!: Sharedlist[];
}
