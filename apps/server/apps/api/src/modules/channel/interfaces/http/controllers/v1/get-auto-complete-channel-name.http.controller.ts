import { QueryBus } from '@nestjs/cqrs';
import {
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiOperation,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { match } from 'oxide.ts';
import { IRes } from '@Libs/types';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import {
  GetChannelNameAutocompleteDto,
  GetChannelNameAutocompleteQuery,
  GetChannelNameAutocompleteResult,
} from '@Apps/modules/channel/application/dtos/channel-name-auto-complete.dto';
import { apiRouter } from '@dothis/dto';
import { ExternalAiServerError } from '@Apps/modules/related-word/domain/errors/related-words.errors';
const { autocompleteChannelName } = nestControllerContract(apiRouter.channel);
const { summary, description } = autocompleteChannelName;

@ApiTags('채널')
@Controller()
export class ChannelAutoCompleteController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRest(autocompleteChannelName)
  @ApiOperation({
    summary,
    description,
  })
  @ApiOkResponse({ type: [GetChannelNameAutocompleteResult] })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async execute(
    @Param() params: GetChannelNameAutocompleteQuery,
  ): Promise<IRes<GetChannelNameAutocompleteResult[]>> {
    const arg = new GetChannelNameAutocompleteDto(params);

    const result = await this.queryBus.execute(arg);

    return match(result, {
      Ok: (autocompleteResults) => ({
        success: true,
        data: autocompleteResults,
      }),
      Err: (err: Error) => {
        if (err instanceof ChannelNotFoundError) {
          throw new NotFoundException(err.message);
        }
        if (err instanceof ExternalAiServerError) {
          throw new InternalServerErrorException(err.message);
        }
        throw new InternalServerErrorException(
          'Internal error occurred',
          err.message,
        );
      },
    });
  }
}
