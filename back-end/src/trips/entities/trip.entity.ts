import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { StepSchema, Step } from './step.entity';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export type TripDocument = HydratedDocument<Trip>;

@Schema()
export class Trip {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ type: [StepSchema], required: true })
  steps: Step[];

  @Prop({ type: Number, required: true })
  distance: number;

  @Prop({ type: Number, required: true })
  elevationGain: number;

  @Prop({ type: Number, required: true })
  elevationLoss: number;

  @Prop({ type: Date })
  time?: Date;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  user: User;
}

export const TripSchema = SchemaFactory.createForClass(Trip);
