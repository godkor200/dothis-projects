import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import {
  zChannelNameAutocompleteQuery,
  zChannelNameAutocompleteResponse,
} from '@dothis/dto';
export class GetChannelNameAutocompleteQuery extends createZodDto(
  extendApi(zChannelNameAutocompleteQuery),
) {
  constructor(props: GetChannelNameAutocompleteQuery) {
    super();
    Object.assign(this, props);
  }
}
export class GetChannelNameAutocompleteDto extends GetChannelNameAutocompleteQuery {
  constructor(props: GetChannelNameAutocompleteQuery) {
    super(props);
    Object.assign(this, props);
  }
}
export class GetChannelNameAutocompleteResult extends createZodDto(
  extendApi(zChannelNameAutocompleteResponse),
) {}
