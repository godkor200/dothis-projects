import { Controller, UseGuards } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { apiRouter } from '@dothis/dto';
import { GoogleOAuthGuard } from '@Libs/commons/src';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
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
