import { Module, Provider } from '@nestjs/common';
import { AtStrategy, GoogleStrategy, LocalStrategy } from './strategy';
import {
  GoogleOAuthGuard,
  IsAdminGuard,
  JwtRefreshGuard,
  JwtAccessGuard,
} from './guards';
const guard: Provider[] = [
  GoogleOAuthGuard,
  IsAdminGuard,
  JwtRefreshGuard,
  JwtAccessGuard,
];
const strategy: Provider[] = [AtStrategy, GoogleStrategy, LocalStrategy];
@Module({
  providers: [...strategy, ...guard],
})
export class OAuthModule {}
