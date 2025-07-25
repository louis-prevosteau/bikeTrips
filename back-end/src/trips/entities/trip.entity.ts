import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { StepSchema, Step } from './step.entity';
import mongoose, { HydratedDocument, SchemaTypes } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export type TripDocument = HydratedDocument<Trip>;

@Schema()
export class Trip {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, enum: ['road', 'mountain'] })
  profile: string;

  @Prop()
  description?: string;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ type: [String], default: [] })
  photos: string[];

  @Prop({ type: [StepSchema], required: true })
  steps: Step[];

  @Prop({ type: Number, required: true })
  distance: number;

  @Prop({ type: Number, required: true })
  elevationGain: number;

  @Prop({ type: Number, required: true })
  elevationLoss: number;

  @Prop()
  time?: number;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  user: User;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    default: [],
  })
  likedBy: User[];
}

export const TripSchema = SchemaFactory.createForClass(Trip);
