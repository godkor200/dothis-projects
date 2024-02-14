import { mock } from 'jest-mock-extended';

import { QueryBus } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { Err } from 'oxide.ts';
import { FindVideoPageHttpController } from '@Apps/modules/video/interfaces/http/v1/find-video-paging/find-video-page.http.controller';

const mockQueryBus = mock<QueryBus>();

let controller: FindVideoPageHttpController;
beforeEach(async () => {
  controller = new FindVideoPageHttpController(mockQueryBus);
});
describe('예외 처리', () => {
  it('해당 키워드에 비디오가 없을 경우 Not Found를 띄웁니다.', async () => {
    mockQueryBus.execute.mockResolvedValue(Err(new NotFoundException()));
    try {
      await controller.execute('6', {
        limit: '5',
        search: '고기',
        related: '영화평론',
      });
    } catch (err) {
      expect(err.message).toBe('Not Found');
      expect(err.status).toBe(404);
    }
  });
});
