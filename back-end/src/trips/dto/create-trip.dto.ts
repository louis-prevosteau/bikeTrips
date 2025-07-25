import { StepDto } from './step.dto';
import { IsOptional, IsString, IsArray } from 'class-validator';

export class CreateTripDto {
  readonly title: string;
  readonly description?: string;
  readonly date: Date;
  readonly steps: StepDto[];
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  photos?: string[];
  readonly distance: number;
  readonly elevationGain: number;
  readonly elevationLoss: number;
  readonly time?: number;
  readonly user: string;
}
