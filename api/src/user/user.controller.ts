/* создал командой nest g co user --no-spec.чтобы автоматически импортировались, собрались в module */
import { Controller, Get, Param } from '@nestjs/common';
import { UserDetails } from './user-details.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: string): Promise<UserDetails | null> {
    return this.userService.findById(id);
  }
}
