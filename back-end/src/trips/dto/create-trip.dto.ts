import { StepDto } from './step.dto';

export class CreateTripDto {
  readonly title: string;
  readonly description?: string;
  readonly date: Date;
  readonly steps: StepDto[];
  readonly distance: number;
  readonly elevationGain: number;
  readonly elevationLoss: number;
  readonly time?: Date;
  readonly user: string;
}
