import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  emailVerified: Date;

  @Column()
  image: string;

  @Column()
  introduction: string;

  @Column()
  totalPoint: number;
}
