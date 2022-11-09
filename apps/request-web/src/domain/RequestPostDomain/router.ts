import { t } from '@/server/trpc';

import complete from './procedure/complete';
import create from './procedure/create';
import Delete from './procedure/delete';
import get from './procedure/get';
import getDetail from './procedure/getDetail';
import getRecommends from './procedure/getRecommends';
import getSolveds from './procedure/getSolveds';
import getUserForCreator from './procedure/getUserForCreator';
import update from './procedure/update';
import updateStatus from './procedure/updateStatus';

export const router = t.router({
  // query
  get,
  getDetail,
  getSolveds,
  getUserForCreator,
  getRecommends,

  // mutation
  create,
  delete: Delete,
  update,
  updateStatus,
  complete,
});
