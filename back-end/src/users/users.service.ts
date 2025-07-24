import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  findAll(filter = {}) {
    return this.userModel.find(filter).populate([
      { path: 'followers', select: '-password' },
      { path: 'followings', select: '-password' },
    ]);
  }

  findOne(filter) {
    return this.userModel.findOne(filter).populate([
      { path: 'followers', select: '-password' },
      { path: 'followings', select: '-password' },
    ]);
  }

  update(filter, updateUserDto: UpdateUserDto) {
    return this.userModel.findOneAndUpdate(filter, updateUserDto);
  }

  async followUser(userId: string, userToFollowId: string) {
    await this.userModel.updateOne(
      { _id: userId },
      { $addToSet: { followings: userToFollowId } },
    );

    await this.userModel.updateOne(
      { _id: userToFollowId },
      { $addToSet: { followers: userId } },
    );

    return this.userModel.findById(userId).populate([
      { path: 'followings', select: '-password' },
      { path: 'followers', select: '-password' },
    ]);
  }

  async unfollowUser(userId: string, userToFollowId: string) {
    await this.userModel.updateOne(
      { _id: userId },
      { $pull: { followings: userToFollowId } },
    );

    await this.userModel.updateOne(
      { _id: userToFollowId },
      { $pull: { followers: userId } },
    );

    return this.userModel.findById(userId).populate([
      { path: 'followings', select: '-password' },
      { path: 'followers', select: '-password' },
    ]);
  }

  remove(filter) {
    return this.userModel.findOneAndDelete(filter);
  }
}
