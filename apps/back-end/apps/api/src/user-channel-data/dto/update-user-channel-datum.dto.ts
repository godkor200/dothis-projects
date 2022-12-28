import { PartialType } from '@nestjs/mapped-types';
import { CreateUserChannelDatumDto } from './create-user-channel-datum.dto';

export class UpdateUserChannelDatumDto extends PartialType(CreateUserChannelDatumDto) {}
