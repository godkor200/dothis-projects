
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 4.11.0
 * Query Engine version: 8fde8fef4033376662cad983758335009d522acb
 */
Prisma.prismaVersion = {
  client: "4.11.0",
  engine: "8fde8fef4033376662cad983758335009d522acb"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = () => (val) => val


/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

exports.Prisma.AccountOrderByRelevanceFieldEnum = makeEnum({
  id: 'id',
  userId: 'userId',
  type: 'type',
  provider: 'provider',
  providerAccountId: 'providerAccountId',
  refresh_token: 'refresh_token',
  access_token: 'access_token',
  token_type: 'token_type',
  scope: 'scope',
  id_token: 'id_token',
  session_state: 'session_state'
});

exports.Prisma.AccountScalarFieldEnum = makeEnum({
  id: 'id',
  userId: 'userId',
  type: 'type',
  provider: 'provider',
  providerAccountId: 'providerAccountId',
  refresh_token: 'refresh_token',
  access_token: 'access_token',
  expires_at: 'expires_at',
  token_type: 'token_type',
  scope: 'scope',
  id_token: 'id_token',
  session_state: 'session_state'
});

exports.Prisma.CreatorAuthOrderByRelevanceFieldEnum = makeEnum({
  profileUrl: 'profileUrl'
});

exports.Prisma.CreatorAuthScalarFieldEnum = makeEnum({
  id: 'id',
  creatorId: 'creatorId',
  isMain: 'isMain',
  profileUrl: 'profileUrl',
  platform: 'platform',
  createdAt: 'createdAt'
});

exports.Prisma.CreatorOrderByRelevanceFieldEnum = makeEnum({
  userId: 'userId'
});

exports.Prisma.CreatorReviewItemOrderByRelevanceFieldEnum = makeEnum({
  content: 'content'
});

exports.Prisma.CreatorReviewItemScalarFieldEnum = makeEnum({
  id: 'id',
  reviewId: 'reviewId',
  content: 'content',
  isChecked: 'isChecked'
});

exports.Prisma.CreatorReviewOrderByRelevanceFieldEnum = makeEnum({
  userId: 'userId',
  content: 'content'
});

exports.Prisma.CreatorReviewScalarFieldEnum = makeEnum({
  id: 'id',
  creatorId: 'creatorId',
  userId: 'userId',
  content: 'content',
  createdAt: 'createdAt'
});

exports.Prisma.CreatorScalarFieldEnum = makeEnum({
  id: 'id',
  userId: 'userId',
  createdAt: 'createdAt'
});

exports.Prisma.FaqOrderByRelevanceFieldEnum = makeEnum({
  title: 'title',
  content: 'content'
});

exports.Prisma.FaqScalarFieldEnum = makeEnum({
  id: 'id',
  type: 'type',
  title: 'title',
  content: 'content',
  createdAt: 'createdAt'
});

exports.Prisma.LogOrderByRelevanceFieldEnum = makeEnum({
  message: 'message',
  senderId: 'senderId'
});

exports.Prisma.LogScalarFieldEnum = makeEnum({
  id: 'id',
  logType: 'logType',
  message: 'message',
  senderId: 'senderId',
  isRead: 'isRead',
  requestId: 'requestId',
  createdAt: 'createdAt'
});

exports.Prisma.NoticeOrderByRelevanceFieldEnum = makeEnum({
  title: 'title',
  content: 'content'
});

exports.Prisma.NoticeScalarFieldEnum = makeEnum({
  id: 'id',
  title: 'title',
  content: 'content',
  createdAt: 'createdAt'
});

exports.Prisma.PointOrderByRelevanceFieldEnum = makeEnum({
  userId: 'userId'
});

exports.Prisma.PointScalarFieldEnum = makeEnum({
  id: 'id',
  userId: 'userId',
  quantity: 'quantity',
  type: 'type',
  createdAt: 'createdAt'
});

exports.Prisma.RankingOrderByRelevanceFieldEnum = makeEnum({
  userId: 'userId'
});

exports.Prisma.RankingScalarFieldEnum = makeEnum({
  id: 'id',
  userId: 'userId',
  ranking: 'ranking',
  type: 'type',
  score: 'score',
  change: 'change',
  createdAt: 'createdAt'
});

exports.Prisma.RequestApplyCreatorScalarFieldEnum = makeEnum({
  id: 'id',
  requestId: 'requestId',
  creatorId: 'creatorId'
});

exports.Prisma.RequestBookmarkOrderByRelevanceFieldEnum = makeEnum({
  userId: 'userId'
});

exports.Prisma.RequestBookmarkScalarFieldEnum = makeEnum({
  id: 'id',
  requestId: 'requestId',
  userId: 'userId',
  createdAt: 'createdAt'
});

exports.Prisma.RequestCommentHeartOrderByRelevanceFieldEnum = makeEnum({
  userId: 'userId'
});

exports.Prisma.RequestCommentHeartScalarFieldEnum = makeEnum({
  id: 'id',
  requestCommentId: 'requestCommentId',
  userId: 'userId',
  createdAt: 'createdAt'
});

exports.Prisma.RequestCommentOrderByRelevanceFieldEnum = makeEnum({
  userId: 'userId',
  content: 'content'
});

exports.Prisma.RequestCommentScalarFieldEnum = makeEnum({
  id: 'id',
  requestId: 'requestId',
  userId: 'userId',
  parentId: 'parentId',
  rootId: 'rootId',
  content: 'content',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.RequestFundingOrderByRelevanceFieldEnum = makeEnum({
  userId: 'userId'
});

exports.Prisma.RequestFundingScalarFieldEnum = makeEnum({
  id: 'id',
  userId: 'userId',
  quantity: 'quantity',
  requestId: 'requestId',
  createdAt: 'createdAt',
  status: 'status'
});

exports.Prisma.RequestInquiryMessageOrderByRelevanceFieldEnum = makeEnum({
  fromId: 'fromId',
  text: 'text',
  fileUrl: 'fileUrl'
});

exports.Prisma.RequestInquiryMessageScalarFieldEnum = makeEnum({
  id: 'id',
  roomId: 'roomId',
  fromId: 'fromId',
  text: 'text',
  fileUrl: 'fileUrl',
  type: 'type',
  isRead: 'isRead',
  createdAt: 'createdAt'
});

exports.Prisma.RequestInquiryOrderByRelevanceFieldEnum = makeEnum({
  userId: 'userId'
});

exports.Prisma.RequestInquiryScalarFieldEnum = makeEnum({
  id: 'id',
  requestId: 'requestId',
  creatorId: 'creatorId',
  userId: 'userId',
  createdAt: 'createdAt'
});

exports.Prisma.RequestPlatformScalarFieldEnum = makeEnum({
  id: 'id',
  requestId: 'requestId',
  name: 'name'
});

exports.Prisma.RequestPostOrderByRelevanceFieldEnum = makeEnum({
  userId: 'userId',
  title: 'title',
  content: 'content',
  solvedUrl: 'solvedUrl',
  thumbnailUrl: 'thumbnailUrl',
  refusalReason: 'refusalReason'
});

exports.Prisma.RequestPostScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  userId: 'userId',
  title: 'title',
  content: 'content',
  category: 'category',
  creatorId: 'creatorId',
  expires: 'expires',
  totalViews: 'totalViews',
  status: 'status',
  solvedUrl: 'solvedUrl',
  thumbnailUrl: 'thumbnailUrl',
  refusalReason: 'refusalReason',
  totalQuantity: 'totalQuantity',
  totalLikeScroe: 'totalLikeScroe',
  isUnspecified: 'isUnspecified'
});

exports.Prisma.RequestReactionOrderByRelevanceFieldEnum = makeEnum({
  userId: 'userId'
});

exports.Prisma.RequestReactionScalarFieldEnum = makeEnum({
  id: 'id',
  userId: 'userId',
  type: 'type',
  requestId: 'requestId',
  createdAt: 'createdAt'
});

exports.Prisma.RequestReportOrderByRelevanceFieldEnum = makeEnum({
  userId: 'userId',
  content: 'content'
});

exports.Prisma.RequestReportScalarFieldEnum = makeEnum({
  id: 'id',
  requestId: 'requestId',
  userId: 'userId',
  content: 'content',
  type: 'type',
  status: 'status',
  createdAt: 'createdAt'
});

exports.Prisma.SessionOrderByRelevanceFieldEnum = makeEnum({
  id: 'id',
  sessionToken: 'sessionToken',
  userId: 'userId'
});

exports.Prisma.SessionScalarFieldEnum = makeEnum({
  id: 'id',
  sessionToken: 'sessionToken',
  userId: 'userId',
  expires: 'expires'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserOrderByRelevanceFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  email: 'email',
  image: 'image',
  introduction: 'introduction'
});

exports.Prisma.UserScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  email: 'email',
  emailVerified: 'emailVerified',
  image: 'image',
  introduction: 'introduction',
  totalPoint: 'totalPoint'
});

exports.Prisma.VerificationTokenOrderByRelevanceFieldEnum = makeEnum({
  identifier: 'identifier',
  token: 'token'
});

exports.Prisma.VerificationTokenScalarFieldEnum = makeEnum({
  identifier: 'identifier',
  token: 'token',
  expires: 'expires'
});
exports.AuthPlatformType = makeEnum({
  YOUTUBE: 'YOUTUBE',
  INSTAGRAM: 'INSTAGRAM',
  FACEBOOK: 'FACEBOOK',
  TWITCH: 'TWITCH'
});

exports.FaqType = makeEnum({
  BEST: 'BEST',
  GUIDE: 'GUIDE',
  ACCOUNT: 'ACCOUNT',
  CREATOR: 'CREATOR',
  BUSSINESS: 'BUSSINESS'
});

exports.LogType = makeEnum({
  POINT_CHARGE: 'POINT_CHARGE',
  REQUEST_STATUS_CHANGE: 'REQUEST_STATUS_CHANGE',
  NEW_REQUEST: 'NEW_REQUEST',
  REQUEST_ACCEPT: 'REQUEST_ACCEPT',
  BRING_FUNDING: 'BRING_FUNDING'
});

exports.MessageType = makeEnum({
  TEXT: 'TEXT',
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  FILE: 'FILE'
});

exports.PoinType = makeEnum({
  WITHDRAW: 'WITHDRAW',
  DEPOSIT: 'DEPOSIT',
  FUNDING: 'FUNDING',
  RETURN: 'RETURN'
});

exports.RankingType = makeEnum({
  FUN: 'FUN',
  COOL: 'COOL',
  SEXY: 'SEXY'
});

exports.ReactionType = makeEnum({
  LIKE: 'LIKE',
  DISLIKE: 'DISLIKE'
});

exports.RequestCategoryType = makeEnum({
  GAME: 'GAME',
  LIFE_TALK: 'LIFE_TALK',
  COOK_EAT: 'COOK_EAT',
  TOUR_FOOD: 'TOUR_FOOD',
  DANCE_MUSIC: 'DANCE_MUSIC',
  ENTERTAINMENT: 'ENTERTAINMENT',
  EDUCATION: 'EDUCATION',
  FINANCE: 'FINANCE',
  SPORTS_HEALTH: 'SPORTS_HEALTH',
  BEAUTY_FASHION: 'BEAUTY_FASHION',
  HOBBY: 'HOBBY',
  ETC: 'ETC'
});

exports.RequestFundingStatus = makeEnum({
  FUNDING: 'FUNDING',
  COMPLETION: 'COMPLETION',
  CANCELED: 'CANCELED',
  REFUND: 'REFUND'
});

exports.RequestPlatformType = makeEnum({
  YOUTUBE: 'YOUTUBE',
  INSTAGRAM: 'INSTAGRAM',
  FACEBOOK: 'FACEBOOK',
  TWITCH: 'TWITCH'
});

exports.RequestReportStatus = makeEnum({
  PROCESSING: 'PROCESSING',
  COMPLETION: 'COMPLETION'
});

exports.RequestReportType = makeEnum({
  SEXUAL: 'SEXUAL',
  SLANG: 'SLANG',
  SPAMMER: 'SPAMMER',
  TERRORISM: 'TERRORISM',
  PRIVACY: 'PRIVACY',
  COPYRIGHT: 'COPYRIGHT',
  SPAM: 'SPAM',
  RIOT: 'RIOT',
  ETC: 'ETC'
});

exports.RequestStatusType = makeEnum({
  REQUEST: 'REQUEST',
  ACCEPT: 'ACCEPT',
  REGISTRATION: 'REGISTRATION',
  COMPLETION: 'COMPLETION',
  EXPIRATION: 'EXPIRATION',
  REFUSE: 'REFUSE'
});

exports.Prisma.ModelName = makeEnum({
  Account: 'Account',
  Session: 'Session',
  User: 'User',
  VerificationToken: 'VerificationToken',
  RequestPost: 'RequestPost',
  RequestFunding: 'RequestFunding',
  RequestReaction: 'RequestReaction',
  RequestComment: 'RequestComment',
  RequestCommentHeart: 'RequestCommentHeart',
  RequestBookmark: 'RequestBookmark',
  RequestPlatform: 'RequestPlatform',
  RequestApplyCreator: 'RequestApplyCreator',
  RequestReport: 'RequestReport',
  RequestInquiry: 'RequestInquiry',
  RequestInquiryMessage: 'RequestInquiryMessage',
  Point: 'Point',
  Ranking: 'Ranking',
  Faq: 'Faq',
  Notice: 'Notice',
  Creator: 'Creator',
  CreatorAuth: 'CreatorAuth',
  CreatorReview: 'CreatorReview',
  CreatorReviewItem: 'CreatorReviewItem',
  Log: 'Log'
});

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
