import { Injectable } from '@nestjs/common';
import { DataNotFoundError } from 'src/application/errors/data-not-found.error';
import { UserProfile } from 'src/domain/entities/user-profile.entity';
import { UserRepository } from 'src/infra/repositories/user.repository';

@Injectable()
export class GetUserProfile {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(id: string): Promise<UserProfile> {
    const profile = await this.userRepo.findProfile(id);

    if (!profile) throw new DataNotFoundError('Profile not found.');

    return profile;
  }
}
