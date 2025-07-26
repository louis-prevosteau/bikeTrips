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
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { User } from 'src/users/users.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { storageConfig } from './storage.helper';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FilesInterceptor('photos', null, {
      storage: storageConfig(),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  create(
    @Body() createTripDto: CreateTripDto,
    @User() user,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (files?.length) {
      createTripDto.photos = files.map((file) => file.filename);
    }

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
    const { page: _p, limit: _l, search, user, ...filter } = query;
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    } else if (user) {
      filter.user = user;
    }
    return this.tripsService.findAll(filter, pageNum, limitNum);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tripsService.findOne({ _id: id });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(
    FilesInterceptor('photos', null, {
      storage: storageConfig(),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updateTripDto: UpdateTripDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (files?.length) {
      updateTripDto.photos = files.map((file) => file.filename);
    }

    return this.tripsService.update({ _id: id }, updateTripDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tripsService.remove({ _id: id });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/like')
  async like(@Param('id') id: string, @User() user) {
    return this.tripsService.likeTrip(id, user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/unlike')
  async unlike(@Param('id') id: string, @User() user) {
    return this.tripsService.unlikeTrip(id, user._id);
  }
}
