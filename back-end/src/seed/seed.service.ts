import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async userSeed() {
    const existing = await this.userModel.countDocuments();
    if (existing > 0) {
      console.log('✅ Users already exist, skipping seeding.');
      return;
    }
    const salt = await bcrypt.genSalt();
    await this.userModel.insertOne({
      firstName: 'Louis',
      lastName: 'Prevosteau',
      username: 'louisp',
      email: 'louis.prevosteau@gmail.com',
      password: await bcrypt.hash('secret', salt),
    });

    console.log('✅ User Seeding completed.');
  }
}
