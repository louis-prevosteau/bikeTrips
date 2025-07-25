import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './entities/user.entity';
import { TripDocument } from 'src/trips/entities/trip.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    @InjectModel('Trip') private readonly tripModel: Model<TripDocument>,
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
    return this.userModel
      .findOne(filter)
      .populate([
        { path: 'followers', select: '-password' },
        { path: 'followings', select: '-password' },
        { path: 'favoriteTrips' },
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

  async remove(filter) {
    const user = await this.userModel.findOne(filter);
    await this.tripModel.deleteMany({ user: user._id });
    await this.userModel.updateMany(
      { followings: user._id },
      { $pull: { followings: user._id } },
    );
    await this.userModel.updateMany(
      { followers: user._id },
      { $pull: { followers: user._id } },
    );
    await this.tripModel.updateMany(
      { likedBy: user._id },
      { $pull: { likedBy: user._id } },
    );
    return this.userModel.findOneAndDelete({ _id: user._id });
  }
}
