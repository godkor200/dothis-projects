import { CommandBus } from '@nestjs/cqrs';
import { Body, Controller, NotFoundException } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import {
  nestControllerContract,
  tsRestHandler,
  TsRestHandler,
} from '@ts-rest/nest';
import { externalApiRouter } from '@dothis/dto';
import { match } from 'oxide.ts';
import {
  CompleteVideoShortsBody,
  CompleteVideoShortsDto,
} from '@ExternalApps/feature/crawler/application/dto/complete.dto';
import { IRes, TTsRestRes } from '@Libs/types';
import { CompleteVideoShortsResponse } from '@ExternalApps/feature/crawler/domain/port/video-shorts.complete.inbound.port';
import { VideoNotFoundException } from '@ExternalApps/feature/crawl-queue/video/domain/events/errors/video.error';
const c = nestControllerContract(externalApiRouter.crawler);
const { completeVideos } = c;

@Controller()
export class CompleteVideosController {
  constructor(private readonly commandBus: CommandBus) {}
  @ApiExcludeEndpoint()
  @TsRestHandler(completeVideos)
  async execute(@Body() body: CompleteVideoShortsBody) {
    return tsRestHandler(completeVideos, async ({ body }) => {
      const res: CompleteVideoShortsResponse = await this.commandBus.execute(
        new CompleteVideoShortsDto(body),
      );
      return match<CompleteVideoShortsResponse, TTsRestRes<IRes>>(res, {
        Ok: (res) => ({
          status: 200,
          body: { success: res },
        }),
        Err: (err) => {
          if (err instanceof VideoNotFoundException) {
            throw new NotFoundException(err.message);
          }
          throw err;
        },
      });
    });
  }
}
