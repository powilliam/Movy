import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Sharedlist } from '../sharedlists/sharedlist.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ nullable: false })
  public identifier: number;

  @Column({ nullable: false })
  public title!: string;

  @Column({ nullable: false })
  public overview!: string;

  @Column({ name: 'release_date', nullable: false })
  public releaseDate!: string;

  @Column({ nullable: false })
  public backdrop!: string;

  @Column({ name: 'vote_average', nullable: false, type: 'real' })
  public voteAverage!: number;

  @ManyToOne(() => Sharedlist, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  public sharedlist: Sharedlist;
}
