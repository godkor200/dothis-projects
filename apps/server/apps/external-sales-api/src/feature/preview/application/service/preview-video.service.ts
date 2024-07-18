import {
  PreviewVideoDto,
  previewVideoInboundPort,
} from '@ExternalApps/feature/preview/domain/port/preview-video.inbound.port';

export class PreviewVideoService implements previewVideoInboundPort {
  constructor() {}
  async execute(dto: PreviewVideoDto): Promise<void> {}
}
