import { IsNotEmpty, IsString, Length } from 'class-validator';
import { nanoid } from 'nanoid';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { UserProfile } from './user-profile.entity';

interface CreateUserProps {
  username: string;
  password: string;
}

interface UserProps {
  id: string;
  username: string;
  password: string;
}

@Entity()
export class User {
  @PrimaryColumn({ unique: true })
  @IsString()
  public id: string;

  @Column({ unique: true })
  @IsString()
  @Length(3, 20)
  @IsNotEmpty()
  public username: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  public password: string;

  @OneToOne(() => UserProfile, (profile) => profile.user)
  profile: UserProfile;

  constructor(props: UserProps) {
    Object.assign(this, props);

    this.initProfile();
  }

  public static create(props: CreateUserProps): User {
    return new User({
      id: nanoid(21),
      username: props.username,
      password: props.password,
    });
  }

  public static from(props: UserProps): User {
    return new User({
      id: props.id,
      username: props.username,
      password: props.password,
    });
  }

  private initProfile() {
    const profile = UserProfile.create({
      userId: this.id,
      displayName: this.username,
      summary: `Hello, my name is ${this.username}`,
    });

    this.profile = profile;
  }

  public changeProfileData({
    displayName,
    summary,
  }: {
    displayName?: string;
    summary?: string;
  }) {
    this.profile.displayName = displayName ?? this.profile.displayName;
    this.profile.summary = summary
      ? this.profile.summary
      : `Hello, i am ${displayName}`;
  }
}
