import { IsString, Length } from 'class-validator';
import { nanoid } from 'nanoid';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

interface UserProfileProps {
  id: string;
  userId: string;
  displayName: string;
  summary: string;
}

interface CreateUserProfileProps {
  userId: string;
  displayName: string;
  summary: string;
}

@Entity()
export class UserProfile {
  @PrimaryColumn()
  @IsString()
  id: string;

  @Column()
  @IsString()
  @Length(1, 120)
  displayName: string;

  @Column()
  @IsString()
  @Length(0, 600)
  summary: string;

  @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  public constructor(props: UserProfileProps) {
    Object.assign(this, props);
  }

  public static create(props: CreateUserProfileProps): UserProfile {
    return new UserProfile({
      id: nanoid(21),
      userId: props.userId,
      displayName: props.displayName,
      summary: props.summary,
    });
  }

  public static from(props: UserProfileProps): UserProfile {
    return new UserProfile(props);
  }
}
