import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserpasswordDto } from './dto/update-user-password';
import { UpdateUserIntentionDto } from './dto/updateIntention-user';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/v1/create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch('/v1/update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch('/v1/update-password/:id')
  updatePassword(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserpasswordDto,
  ) {
    return this.usersService.updatePassword(id, updateUserDto);
  }

  @Patch('/v1/update-intention/:id')
  updateIntentionVote(
    @Param('id') id: string,
    @Body() intention: UpdateUserIntentionDto,
  ) {
    return this.usersService.updateIntentionVote(id, intention);
  }
}
