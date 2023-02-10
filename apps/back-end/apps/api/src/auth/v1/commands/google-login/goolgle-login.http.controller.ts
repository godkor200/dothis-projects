import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { authApi } from '@dothis/share/lib/dto/auth/auth.api';
import { GoogleOAuthGuard } from '@Libs/commons/src';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
const { getGoogleLogin } = nestControllerContract(authApi);
const { pathParams, description, summary, responses } = getGoogleLogin;
@ApiTags(pathParams)
@Controller()
export class GoogleLoginHttpController {
  @TsRest(getGoogleLogin)
  @UseGuards(GoogleOAuthGuard)
  @ApiOperation({ summary, description })
  @ApiOkResponse({ description: responses[200] })
  @ApiInternalServerErrorResponse({ description: responses['500'] })
  @ApiUnauthorizedResponse({ description: responses[401] })
  googleAuth() {
    return { message: 'Google Authentication' };
  }
}
