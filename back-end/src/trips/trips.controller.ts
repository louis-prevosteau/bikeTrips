import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { User } from 'src/users/users.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createTripDto: CreateTripDto, @User() user) {
    return this.tripsService.create({ ...createTripDto, user });
  }

  @Get()
  findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query() query: any,
  ) {
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(100, parseInt(limit) || 15);
    const { page: _p, limit: _l, search, ...filter } = query;
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }
    return this.tripsService.findAll(filter, pageNum, limitNum);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tripsService.findOne({ _id: id });
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripsService.update({ _id: id }, updateTripDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tripsService.remove({ _id: id });
  }
}
