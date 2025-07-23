import { Injectable } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { TripDocument } from './entities/trip.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TripsService {
  constructor(
    @InjectModel('Trip') private readonly tripModel: Model<TripDocument>,
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
}
