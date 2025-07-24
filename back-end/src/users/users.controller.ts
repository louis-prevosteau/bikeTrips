import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@User() user) {
    return this.usersService.findOne({ _id: user._id });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ _id: id });
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('profile')
  update(@User() user, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update({ _id: user._id }, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/follow')
  async follow(@User() user, @Param('id') id: string) {
    return this.usersService.followUser(user._id, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/unfollow')
  async unfollow(@User() user, @Param('id') id: string) {
    return this.usersService.unfollowUser(user._id, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('profile')
  remove(@User() user) {
    return this.usersService.remove({ _id: user._id });
  }
}
