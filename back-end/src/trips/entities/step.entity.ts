import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Step {
  @Prop({ required: true })
  step: string;

  @Prop({ type: [String], default: [] })
  waypoint: string[];
}

export const StepSchema = SchemaFactory.createForClass(Step);
