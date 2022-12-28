import { Injectable } from '@nestjs/common';
import { CreateUserChannelDatumDto } from './dto/create-user-channel-datum.dto';
import { UpdateUserChannelDatumDto } from './dto/update-user-channel-datum.dto';

@Injectable()
export class UserChannelDataService {
  create(createUserChannelDatumDto: CreateUserChannelDatumDto) {
    return 'This action adds a new userChannelDatum';
  }

  findAll() {
    return `This action returns all userChannelData`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userChannelDatum`;
  }

  update(id: number, updateUserChannelDatumDto: UpdateUserChannelDatumDto) {
    return `This action updates a #${id} userChannelDatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} userChannelDatum`;
  }
}
