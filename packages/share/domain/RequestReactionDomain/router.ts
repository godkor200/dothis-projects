import { t } from '../../server/trpc';
import toggleUpdate from './procedure/toggleUpdate';

export const router = t.router({ toggleUpdate });
