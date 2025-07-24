import { Injectable } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { TripDocument } from './entities/trip.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/users/entities/user.entity';

@Injectable()
export class TripsService {
  constructor(
    @InjectModel('Trip') private readonly tripModel: Model<TripDocument>,
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}
  create(createTripDto: CreateTripDto) {
    return this.tripModel.create(createTripDto);
  }

  async findAll(filter: any = {}, page: number = 1, limit: number = 15) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.tripModel.find(filter).populate('user').skip(skip).limit(limit),
      this.tripModel.countDocuments(filter),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  findOne(filter) {
    return this.tripModel.findOne(filter).populate('user');
  }

  update(filter, updateTripDto: UpdateTripDto) {
    return this.tripModel.findOneAndUpdate(filter, updateTripDto);
  }

  remove(filter) {
    return this.tripModel.findOneAndDelete(filter);
  }

  async likeTrip(trip: string, user: string) {
    await this.tripModel.updateOne(
      { _id: trip },
      { $addToSet: { likedBy: user } },
    );

    await this.userModel.updateOne(
      { _id: user },
      { $addToSet: { favoriteTrips: trip } },
    );

    return this.tripModel
      .findById(trip)
      .populate([{ path: 'likedBy', select: '-password' }]);
  }

  async unlikeTrip(trip: string, user: string) {
    await this.tripModel.updateOne({ _id: trip }, { $pull: { likedBy: user } });

    await this.userModel.updateOne(
      { _id: user },
      { $pull: { favoriteTrips: trip } },
    );

    return this.tripModel
      .findById(trip)
      .populate([{ path: 'likedBy', select: '-password' }]);
  }
}
