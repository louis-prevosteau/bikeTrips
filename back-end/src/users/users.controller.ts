import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@User() user) {
    return this.usersService.findOne({ _id: user._id });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ _id: id });
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const uploadPath = './uploads/profile-pictures';
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }

          callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `profile-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  @Patch('profile')
  async update(
    @User() user,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const updatedData = {
      ...updateUserDto,
      avatar: file.filename,
    };

    return this.usersService.update({ _id: user._id }, updatedData);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/follow')
  async follow(@User() user, @Param('id') id: string) {
    return this.usersService.followUser(user._id, id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/unfollow')
  async unfollow(@User() user, @Param('id') id: string) {
    return this.usersService.unfollowUser(user._id, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('profile')
  remove(@User() user) {
    return this.usersService.remove({ _id: user._id });
  }
}
