import { Controller, UseGuards } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { apiRouter } from '@dothis/dto';

import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { GoogleOAuthGuard } from '@Libs/oauth';
const { getGoogleLogin } = nestControllerContract(apiRouter.auth);
const { description, summary, responses } = getGoogleLogin;
@ApiTags('유저 인증')
@Controller()
export class GoogleLoginHttpController {
  @TsRest(getGoogleLogin)
  @UseGuards(GoogleOAuthGuard)
  @ApiOperation({ summary, description })
  googleAuth() {
    return { message: 'Google Authentication' };
  }
}
