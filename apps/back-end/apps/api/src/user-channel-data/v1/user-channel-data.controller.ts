import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserChannelDataService } from '../user-channel-data.service';
import { CreateUserChannelDatumDto } from '../dto/create-user-channel-datum.dto';
import { UpdateUserChannelDatumDto } from '../dto/update-user-channel-datum.dto';

@Controller('user-channel-data')
export class UserChannelDataController {
  constructor(
    private readonly userChannelDataService: UserChannelDataService,
  ) {}

  @Post()
  create(@Body() createUserChannelDatumDto: CreateUserChannelDatumDto) {
    return this.userChannelDataService.create(createUserChannelDatumDto);
  }

  @Get()
  findAll() {
    return this.userChannelDataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userChannelDataService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserChannelDatumDto: UpdateUserChannelDatumDto,
  ) {
    return this.userChannelDataService.update(+id, updateUserChannelDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userChannelDataService.remove(+id);
  }
}
