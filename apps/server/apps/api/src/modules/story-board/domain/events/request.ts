import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { zOverviewParams } from '@dothis/dto';

export class OverviewParams extends createZodDto(extendApi(zOverviewParams)) {}
