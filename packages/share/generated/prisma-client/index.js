
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  decompressFromBase64,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum
} = require('./runtime/index')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 4.5.0
 * Query Engine version: 0362da9eebca54d94c8ef5edd3b2e90af99ba452
 */
Prisma.prismaVersion = {
  client: "4.5.0",
  engine: "0362da9eebca54d94c8ef5edd3b2e90af99ba452"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
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


  const path = require('path')

const { findSync } = require('./runtime')
const fs = require('fs')

// some frameworks or bundlers replace or totally remove __dirname
const hasDirname = typeof __dirname !== 'undefined' && __dirname !== '/'

// will work in most cases, ie. if the client has not been bundled
const regularDirname = hasDirname && fs.existsSync(path.join(__dirname, 'schema.prisma')) && __dirname

// if the client has been bundled, we need to look for the folders
const foundDirname = !regularDirname && findSync(process.cwd(), [
    "generated/prisma-client",
    "prisma-client",
], ['d'], ['d'], 1)[0]

const dirname = regularDirname || foundDirname || __dirname

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

const dmmfString = "{\"datamodel\":{\"enums\":[{\"name\":\"RequestFundingStatus\",\"values\":[{\"name\":\"FUNDING\",\"dbName\":null},{\"name\":\"COMPLETION\",\"dbName\":null},{\"name\":\"CANCELED\",\"dbName\":null},{\"name\":\"REFUND\",\"dbName\":null}],\"dbName\":null},{\"name\":\"RequestCategoryType\",\"values\":[{\"name\":\"GAME\",\"dbName\":null},{\"name\":\"LIFE_TALK\",\"dbName\":null},{\"name\":\"COOK_EAT\",\"dbName\":null},{\"name\":\"TOUR_FOOD\",\"dbName\":null},{\"name\":\"DANCE_MUSIC\",\"dbName\":null},{\"name\":\"ENTERTAINMENT\",\"dbName\":null},{\"name\":\"EDUCATION\",\"dbName\":null},{\"name\":\"FINANCE\",\"dbName\":null},{\"name\":\"SPORTS_HEALTH\",\"dbName\":null},{\"name\":\"BEAUTY_FASHION\",\"dbName\":null},{\"name\":\"HOBBY\",\"dbName\":null},{\"name\":\"ETC\",\"dbName\":null}],\"dbName\":null},{\"name\":\"RequestStatusType\",\"values\":[{\"name\":\"REQUEST\",\"dbName\":null},{\"name\":\"ACCEPT\",\"dbName\":null},{\"name\":\"REGISTRATION\",\"dbName\":null},{\"name\":\"COMPLETION\",\"dbName\":null},{\"name\":\"EXPIRATION\",\"dbName\":null},{\"name\":\"REFUSE\",\"dbName\":null}],\"dbName\":null},{\"name\":\"ReactionType\",\"values\":[{\"name\":\"LIKE\",\"dbName\":null},{\"name\":\"DISLIKE\",\"dbName\":null}],\"dbName\":null},{\"name\":\"RequestPlatformType\",\"values\":[{\"name\":\"YOUTUBE\",\"dbName\":null},{\"name\":\"INSTAGRAM\",\"dbName\":null},{\"name\":\"FACEBOOK\",\"dbName\":null},{\"name\":\"TWITCH\",\"dbName\":null}],\"dbName\":null},{\"name\":\"RequestReportType\",\"values\":[{\"name\":\"SEXUAL\",\"dbName\":null},{\"name\":\"SLANG\",\"dbName\":null},{\"name\":\"SPAMMER\",\"dbName\":null},{\"name\":\"TERRORISM\",\"dbName\":null},{\"name\":\"PRIVACY\",\"dbName\":null},{\"name\":\"COPYRIGHT\",\"dbName\":null},{\"name\":\"SPAM\",\"dbName\":null},{\"name\":\"RIOT\",\"dbName\":null},{\"name\":\"ETC\",\"dbName\":null}],\"dbName\":null},{\"name\":\"RequestReportStatus\",\"values\":[{\"name\":\"PROCESSING\",\"dbName\":null},{\"name\":\"COMPLETION\",\"dbName\":null}],\"dbName\":null},{\"name\":\"MessageType\",\"values\":[{\"name\":\"TEXT\",\"dbName\":null},{\"name\":\"IMAGE\",\"dbName\":null},{\"name\":\"VIDEO\",\"dbName\":null},{\"name\":\"FILE\",\"dbName\":null}],\"dbName\":null},{\"name\":\"PoinType\",\"values\":[{\"name\":\"WITHDRAW\",\"dbName\":null},{\"name\":\"DEPOSIT\",\"dbName\":null},{\"name\":\"FUNDING\",\"dbName\":null},{\"name\":\"RETURN\",\"dbName\":null}],\"dbName\":null},{\"name\":\"RankingType\",\"values\":[{\"name\":\"FUN\",\"dbName\":null},{\"name\":\"COOL\",\"dbName\":null},{\"name\":\"SEXY\",\"dbName\":null}],\"dbName\":null},{\"name\":\"FaqType\",\"values\":[{\"name\":\"BEST\",\"dbName\":null},{\"name\":\"GUIDE\",\"dbName\":null},{\"name\":\"ACCOUNT\",\"dbName\":null},{\"name\":\"CREATOR\",\"dbName\":null},{\"name\":\"BUSSINESS\",\"dbName\":null}],\"dbName\":null},{\"name\":\"AuthPlatformType\",\"values\":[{\"name\":\"YOUTUBE\",\"dbName\":null},{\"name\":\"INSTAGRAM\",\"dbName\":null},{\"name\":\"FACEBOOK\",\"dbName\":null},{\"name\":\"TWITCH\",\"dbName\":null}],\"dbName\":null},{\"name\":\"LogType\",\"values\":[{\"name\":\"POINT_CHARGE\",\"dbName\":null},{\"name\":\"REQUEST_STATUS_CHANGE\",\"dbName\":null},{\"name\":\"NEW_REQUEST\",\"dbName\":null},{\"name\":\"REQUEST_ACCEPT\",\"dbName\":null},{\"name\":\"BRING_FUNDING\",\"dbName\":null}],\"dbName\":null}],\"models\":[{\"name\":\"Account\",\"dbName\":\"accounts\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"provider\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"providerAccountId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"refresh_token\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"access_token\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expires_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"token_type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"scope\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"id_token\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"session_state\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"AccountToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"provider\",\"providerAccountId\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"provider\",\"providerAccountId\"]}],\"isGenerated\":false},{\"name\":\"Session\",\"dbName\":\"sessions\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sessionToken\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expires\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"SessionToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"User\",\"dbName\":\"users\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"emailVerified\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"introduction\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"totalPoint\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"accounts\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Account\",\"relationName\":\"AccountToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sessions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Session\",\"relationName\":\"SessionToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestPosts\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestPost\",\"relationName\":\"RequestPostToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestFundings\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestFunding\",\"relationName\":\"RequestFundingToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestComments\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestComment\",\"relationName\":\"RequestCommentToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestReactions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestReaction\",\"relationName\":\"RequestReactionToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestBookmarks\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestBookmark\",\"relationName\":\"RequestBookmarkToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestReports\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestReport\",\"relationName\":\"RequestReportToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestInquiries\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestInquiry\",\"relationName\":\"RequestInquiryToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestinquiryMessages\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestInquiryMessage\",\"relationName\":\"RequestInquiryMessageToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestCommentHearts\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestCommentHeart\",\"relationName\":\"RequestCommentHeartToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"logs\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Log\",\"relationName\":\"receiver\",\"relationFromFields\":[],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"points\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Point\",\"relationName\":\"PointToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rankings\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Ranking\",\"relationName\":\"RankingToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creatorReviews\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CreatorReview\",\"relationName\":\"CreatorReviewToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creator\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Creator\",\"relationName\":\"CreatorToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Log\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Log\",\"relationName\":\"sender\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"VerificationToken\",\"dbName\":\"verificationtokens\",\"fields\":[{\"name\":\"identifier\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"token\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expires\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"identifier\",\"token\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"identifier\",\"token\"]}],\"isGenerated\":false},{\"name\":\"RequestPost\",\"dbName\":\"requestposts\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"RequestPostToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creator\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Creator\",\"relationName\":\"CreatorToRequestPost\",\"relationFromFields\":[\"creatorId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"category\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestCategoryType\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creatorId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expires\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"totalViews\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"RequestStatusType\",\"default\":\"REQUEST\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"solvedUrl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"thumbnailUrl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"refusalReason\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"totalQuantity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"totalLikeScroe\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isUnspecified\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestFundings\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestFunding\",\"relationName\":\"RequestFundingToRequestPost\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestReactions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestReaction\",\"relationName\":\"RequestPostToRequestReaction\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestApplyCreators\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestApplyCreator\",\"relationName\":\"RequestApplyCreatorToRequestPost\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestPlatforms\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestPlatform\",\"relationName\":\"RequestPlatformToRequestPost\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestComments\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestComment\",\"relationName\":\"RequestPost_RequestComment\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestBookmarks\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestBookmark\",\"relationName\":\"RequestBookmarkToRequestPost\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestReports\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestReport\",\"relationName\":\"RequestPostToRequestReport\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestInquirys\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestInquiry\",\"relationName\":\"RequestInquiryToRequestPost\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Log\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Log\",\"relationName\":\"LogToRequestPost\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"RequestFunding\",\"dbName\":\"requestfundings\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"RequestFundingToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"quantity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"request\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestPost\",\"relationName\":\"RequestFundingToRequestPost\",\"relationFromFields\":[\"requestId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"RequestFundingStatus\",\"default\":\"FUNDING\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"RequestReaction\",\"dbName\":\"requestreactions\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"RequestReactionToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ReactionType\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"request\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestPost\",\"relationName\":\"RequestPostToRequestReaction\",\"relationFromFields\":[\"requestId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"userId\",\"requestId\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"userId\",\"requestId\"]}],\"isGenerated\":false},{\"name\":\"RequestComment\",\"dbName\":\"requestcomments\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"request\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestPost\",\"relationName\":\"RequestPost_RequestComment\",\"relationFromFields\":[\"requestId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"RequestCommentToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"parentId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"parentComment\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestComment\",\"relationName\":\"RequestCommentToRequestComment\",\"relationFromFields\":[\"parentId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rootId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"hearts\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestCommentHeart\",\"relationName\":\"RequestCommentToRequestCommentHeart\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"childrenComments\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestComment\",\"relationName\":\"RequestCommentToRequestComment\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"RequestCommentHeart\",\"dbName\":\"requestcommenthearts\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestComment\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestComment\",\"relationName\":\"RequestCommentToRequestCommentHeart\",\"relationFromFields\":[\"requestCommentId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestCommentId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"RequestCommentHeartToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"requestCommentId\",\"userId\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"requestCommentId\",\"userId\"]}],\"isGenerated\":false},{\"name\":\"RequestBookmark\",\"dbName\":\"requestbookmarks\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"request\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestPost\",\"relationName\":\"RequestBookmarkToRequestPost\",\"relationFromFields\":[\"requestId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"RequestBookmarkToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"RequestPlatform\",\"dbName\":\"requestplatforms\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"request\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestPost\",\"relationName\":\"RequestPlatformToRequestPost\",\"relationFromFields\":[\"requestId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestPlatformType\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"RequestApplyCreator\",\"dbName\":\"requestapplycreators\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"request\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestPost\",\"relationName\":\"RequestApplyCreatorToRequestPost\",\"relationFromFields\":[\"requestId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creator\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Creator\",\"relationName\":\"CreatorToRequestApplyCreator\",\"relationFromFields\":[\"creatorId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creatorId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"RequestReport\",\"dbName\":\"requestreports\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"request\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestPost\",\"relationName\":\"RequestPostToRequestReport\",\"relationFromFields\":[\"requestId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"RequestReportToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestReportType\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestReportStatus\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"RequestInquiry\",\"dbName\":\"requestinquirys\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"request\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestPost\",\"relationName\":\"RequestInquiryToRequestPost\",\"relationFromFields\":[\"requestId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creator\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Creator\",\"relationName\":\"CreatorToRequestInquiry\",\"relationFromFields\":[\"creatorId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creatorId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"RequestInquiryToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestInquiryMessages\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestInquiryMessage\",\"relationName\":\"RequestInquiryToRequestInquiryMessage\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"RequestInquiryMessage\",\"dbName\":\"requestinquirymessages\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"room\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestInquiry\",\"relationName\":\"RequestInquiryToRequestInquiryMessage\",\"relationFromFields\":[\"roomId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"roomId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"from\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"RequestInquiryMessageToUser\",\"relationFromFields\":[\"fromId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fromId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"text\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fileUrl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"MessageType\",\"default\":\"TEXT\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isRead\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"Point\",\"dbName\":\"points\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"PointToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"quantity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PoinType\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"Ranking\",\"dbName\":\"rankings\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"RankingToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ranking\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RankingType\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"score\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"change\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"Faq\",\"dbName\":\"faqs\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"FaqType\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"Notice\",\"dbName\":\"notices\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"Creator\",\"dbName\":\"creators\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"CreatorToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestPosts\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestPost\",\"relationName\":\"CreatorToRequestPost\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestApplyCreators\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestApplyCreator\",\"relationName\":\"CreatorToRequestApplyCreator\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestInquiries\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestInquiry\",\"relationName\":\"CreatorToRequestInquiry\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creatorAuths\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CreatorAuth\",\"relationName\":\"CreatorToCreatorAuth\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creatorReviews\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CreatorReview\",\"relationName\":\"CreatorToCreatorReview\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"CreatorAuth\",\"dbName\":\"creatorauths\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creator\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Creator\",\"relationName\":\"CreatorToCreatorAuth\",\"relationFromFields\":[\"creatorId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creatorId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isMain\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profileUrl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"platform\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AuthPlatformType\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"CreatorReview\",\"dbName\":\"creatorreviews\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creator\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Creator\",\"relationName\":\"CreatorToCreatorReview\",\"relationFromFields\":[\"creatorId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creatorId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"CreatorReviewToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reviewItems\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CreatorReviewItem\",\"relationName\":\"CreatorReviewToCreatorReviewItem\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"CreatorReviewItem\",\"dbName\":\"creatorreviewitems\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"review\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CreatorReview\",\"relationName\":\"CreatorReviewToCreatorReviewItem\",\"relationFromFields\":[\"reviewId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reviewId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isChecked\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"Log\",\"dbName\":\"logmessages\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"logType\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"LogType\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"message\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"senderId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sender\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"sender\",\"relationFromFields\":[\"senderId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isRead\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"receiver\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"receiver\",\"relationFromFields\":[],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"request\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RequestPost\",\"relationName\":\"LogToRequestPost\",\"relationFromFields\":[\"requestId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}],\"types\":[]},\"mappings\":{\"modelOperations\":[{\"model\":\"Account\",\"plural\":\"accounts\",\"findUnique\":\"findUniqueAccount\",\"findFirst\":\"findFirstAccount\",\"findMany\":\"findManyAccount\",\"create\":\"createOneAccount\",\"createMany\":\"createManyAccount\",\"delete\":\"deleteOneAccount\",\"update\":\"updateOneAccount\",\"deleteMany\":\"deleteManyAccount\",\"updateMany\":\"updateManyAccount\",\"upsert\":\"upsertOneAccount\",\"aggregate\":\"aggregateAccount\",\"groupBy\":\"groupByAccount\"},{\"model\":\"Session\",\"plural\":\"sessions\",\"findUnique\":\"findUniqueSession\",\"findFirst\":\"findFirstSession\",\"findMany\":\"findManySession\",\"create\":\"createOneSession\",\"createMany\":\"createManySession\",\"delete\":\"deleteOneSession\",\"update\":\"updateOneSession\",\"deleteMany\":\"deleteManySession\",\"updateMany\":\"updateManySession\",\"upsert\":\"upsertOneSession\",\"aggregate\":\"aggregateSession\",\"groupBy\":\"groupBySession\"},{\"model\":\"User\",\"plural\":\"users\",\"findUnique\":\"findUniqueUser\",\"findFirst\":\"findFirstUser\",\"findMany\":\"findManyUser\",\"create\":\"createOneUser\",\"createMany\":\"createManyUser\",\"delete\":\"deleteOneUser\",\"update\":\"updateOneUser\",\"deleteMany\":\"deleteManyUser\",\"updateMany\":\"updateManyUser\",\"upsert\":\"upsertOneUser\",\"aggregate\":\"aggregateUser\",\"groupBy\":\"groupByUser\"},{\"model\":\"VerificationToken\",\"plural\":\"verificationTokens\",\"findUnique\":\"findUniqueVerificationToken\",\"findFirst\":\"findFirstVerificationToken\",\"findMany\":\"findManyVerificationToken\",\"create\":\"createOneVerificationToken\",\"createMany\":\"createManyVerificationToken\",\"delete\":\"deleteOneVerificationToken\",\"update\":\"updateOneVerificationToken\",\"deleteMany\":\"deleteManyVerificationToken\",\"updateMany\":\"updateManyVerificationToken\",\"upsert\":\"upsertOneVerificationToken\",\"aggregate\":\"aggregateVerificationToken\",\"groupBy\":\"groupByVerificationToken\"},{\"model\":\"RequestPost\",\"plural\":\"requestPosts\",\"findUnique\":\"findUniqueRequestPost\",\"findFirst\":\"findFirstRequestPost\",\"findMany\":\"findManyRequestPost\",\"create\":\"createOneRequestPost\",\"createMany\":\"createManyRequestPost\",\"delete\":\"deleteOneRequestPost\",\"update\":\"updateOneRequestPost\",\"deleteMany\":\"deleteManyRequestPost\",\"updateMany\":\"updateManyRequestPost\",\"upsert\":\"upsertOneRequestPost\",\"aggregate\":\"aggregateRequestPost\",\"groupBy\":\"groupByRequestPost\"},{\"model\":\"RequestFunding\",\"plural\":\"requestFundings\",\"findUnique\":\"findUniqueRequestFunding\",\"findFirst\":\"findFirstRequestFunding\",\"findMany\":\"findManyRequestFunding\",\"create\":\"createOneRequestFunding\",\"createMany\":\"createManyRequestFunding\",\"delete\":\"deleteOneRequestFunding\",\"update\":\"updateOneRequestFunding\",\"deleteMany\":\"deleteManyRequestFunding\",\"updateMany\":\"updateManyRequestFunding\",\"upsert\":\"upsertOneRequestFunding\",\"aggregate\":\"aggregateRequestFunding\",\"groupBy\":\"groupByRequestFunding\"},{\"model\":\"RequestReaction\",\"plural\":\"requestReactions\",\"findUnique\":\"findUniqueRequestReaction\",\"findFirst\":\"findFirstRequestReaction\",\"findMany\":\"findManyRequestReaction\",\"create\":\"createOneRequestReaction\",\"createMany\":\"createManyRequestReaction\",\"delete\":\"deleteOneRequestReaction\",\"update\":\"updateOneRequestReaction\",\"deleteMany\":\"deleteManyRequestReaction\",\"updateMany\":\"updateManyRequestReaction\",\"upsert\":\"upsertOneRequestReaction\",\"aggregate\":\"aggregateRequestReaction\",\"groupBy\":\"groupByRequestReaction\"},{\"model\":\"RequestComment\",\"plural\":\"requestComments\",\"findUnique\":\"findUniqueRequestComment\",\"findFirst\":\"findFirstRequestComment\",\"findMany\":\"findManyRequestComment\",\"create\":\"createOneRequestComment\",\"createMany\":\"createManyRequestComment\",\"delete\":\"deleteOneRequestComment\",\"update\":\"updateOneRequestComment\",\"deleteMany\":\"deleteManyRequestComment\",\"updateMany\":\"updateManyRequestComment\",\"upsert\":\"upsertOneRequestComment\",\"aggregate\":\"aggregateRequestComment\",\"groupBy\":\"groupByRequestComment\"},{\"model\":\"RequestCommentHeart\",\"plural\":\"requestCommentHearts\",\"findUnique\":\"findUniqueRequestCommentHeart\",\"findFirst\":\"findFirstRequestCommentHeart\",\"findMany\":\"findManyRequestCommentHeart\",\"create\":\"createOneRequestCommentHeart\",\"createMany\":\"createManyRequestCommentHeart\",\"delete\":\"deleteOneRequestCommentHeart\",\"update\":\"updateOneRequestCommentHeart\",\"deleteMany\":\"deleteManyRequestCommentHeart\",\"updateMany\":\"updateManyRequestCommentHeart\",\"upsert\":\"upsertOneRequestCommentHeart\",\"aggregate\":\"aggregateRequestCommentHeart\",\"groupBy\":\"groupByRequestCommentHeart\"},{\"model\":\"RequestBookmark\",\"plural\":\"requestBookmarks\",\"findUnique\":\"findUniqueRequestBookmark\",\"findFirst\":\"findFirstRequestBookmark\",\"findMany\":\"findManyRequestBookmark\",\"create\":\"createOneRequestBookmark\",\"createMany\":\"createManyRequestBookmark\",\"delete\":\"deleteOneRequestBookmark\",\"update\":\"updateOneRequestBookmark\",\"deleteMany\":\"deleteManyRequestBookmark\",\"updateMany\":\"updateManyRequestBookmark\",\"upsert\":\"upsertOneRequestBookmark\",\"aggregate\":\"aggregateRequestBookmark\",\"groupBy\":\"groupByRequestBookmark\"},{\"model\":\"RequestPlatform\",\"plural\":\"requestPlatforms\",\"findUnique\":\"findUniqueRequestPlatform\",\"findFirst\":\"findFirstRequestPlatform\",\"findMany\":\"findManyRequestPlatform\",\"create\":\"createOneRequestPlatform\",\"createMany\":\"createManyRequestPlatform\",\"delete\":\"deleteOneRequestPlatform\",\"update\":\"updateOneRequestPlatform\",\"deleteMany\":\"deleteManyRequestPlatform\",\"updateMany\":\"updateManyRequestPlatform\",\"upsert\":\"upsertOneRequestPlatform\",\"aggregate\":\"aggregateRequestPlatform\",\"groupBy\":\"groupByRequestPlatform\"},{\"model\":\"RequestApplyCreator\",\"plural\":\"requestApplyCreators\",\"findUnique\":\"findUniqueRequestApplyCreator\",\"findFirst\":\"findFirstRequestApplyCreator\",\"findMany\":\"findManyRequestApplyCreator\",\"create\":\"createOneRequestApplyCreator\",\"createMany\":\"createManyRequestApplyCreator\",\"delete\":\"deleteOneRequestApplyCreator\",\"update\":\"updateOneRequestApplyCreator\",\"deleteMany\":\"deleteManyRequestApplyCreator\",\"updateMany\":\"updateManyRequestApplyCreator\",\"upsert\":\"upsertOneRequestApplyCreator\",\"aggregate\":\"aggregateRequestApplyCreator\",\"groupBy\":\"groupByRequestApplyCreator\"},{\"model\":\"RequestReport\",\"plural\":\"requestReports\",\"findUnique\":\"findUniqueRequestReport\",\"findFirst\":\"findFirstRequestReport\",\"findMany\":\"findManyRequestReport\",\"create\":\"createOneRequestReport\",\"createMany\":\"createManyRequestReport\",\"delete\":\"deleteOneRequestReport\",\"update\":\"updateOneRequestReport\",\"deleteMany\":\"deleteManyRequestReport\",\"updateMany\":\"updateManyRequestReport\",\"upsert\":\"upsertOneRequestReport\",\"aggregate\":\"aggregateRequestReport\",\"groupBy\":\"groupByRequestReport\"},{\"model\":\"RequestInquiry\",\"plural\":\"requestInquiries\",\"findUnique\":\"findUniqueRequestInquiry\",\"findFirst\":\"findFirstRequestInquiry\",\"findMany\":\"findManyRequestInquiry\",\"create\":\"createOneRequestInquiry\",\"createMany\":\"createManyRequestInquiry\",\"delete\":\"deleteOneRequestInquiry\",\"update\":\"updateOneRequestInquiry\",\"deleteMany\":\"deleteManyRequestInquiry\",\"updateMany\":\"updateManyRequestInquiry\",\"upsert\":\"upsertOneRequestInquiry\",\"aggregate\":\"aggregateRequestInquiry\",\"groupBy\":\"groupByRequestInquiry\"},{\"model\":\"RequestInquiryMessage\",\"plural\":\"requestInquiryMessages\",\"findUnique\":\"findUniqueRequestInquiryMessage\",\"findFirst\":\"findFirstRequestInquiryMessage\",\"findMany\":\"findManyRequestInquiryMessage\",\"create\":\"createOneRequestInquiryMessage\",\"createMany\":\"createManyRequestInquiryMessage\",\"delete\":\"deleteOneRequestInquiryMessage\",\"update\":\"updateOneRequestInquiryMessage\",\"deleteMany\":\"deleteManyRequestInquiryMessage\",\"updateMany\":\"updateManyRequestInquiryMessage\",\"upsert\":\"upsertOneRequestInquiryMessage\",\"aggregate\":\"aggregateRequestInquiryMessage\",\"groupBy\":\"groupByRequestInquiryMessage\"},{\"model\":\"Point\",\"plural\":\"points\",\"findUnique\":\"findUniquePoint\",\"findFirst\":\"findFirstPoint\",\"findMany\":\"findManyPoint\",\"create\":\"createOnePoint\",\"createMany\":\"createManyPoint\",\"delete\":\"deleteOnePoint\",\"update\":\"updateOnePoint\",\"deleteMany\":\"deleteManyPoint\",\"updateMany\":\"updateManyPoint\",\"upsert\":\"upsertOnePoint\",\"aggregate\":\"aggregatePoint\",\"groupBy\":\"groupByPoint\"},{\"model\":\"Ranking\",\"plural\":\"rankings\",\"findUnique\":\"findUniqueRanking\",\"findFirst\":\"findFirstRanking\",\"findMany\":\"findManyRanking\",\"create\":\"createOneRanking\",\"createMany\":\"createManyRanking\",\"delete\":\"deleteOneRanking\",\"update\":\"updateOneRanking\",\"deleteMany\":\"deleteManyRanking\",\"updateMany\":\"updateManyRanking\",\"upsert\":\"upsertOneRanking\",\"aggregate\":\"aggregateRanking\",\"groupBy\":\"groupByRanking\"},{\"model\":\"Faq\",\"plural\":\"faqs\",\"findUnique\":\"findUniqueFaq\",\"findFirst\":\"findFirstFaq\",\"findMany\":\"findManyFaq\",\"create\":\"createOneFaq\",\"createMany\":\"createManyFaq\",\"delete\":\"deleteOneFaq\",\"update\":\"updateOneFaq\",\"deleteMany\":\"deleteManyFaq\",\"updateMany\":\"updateManyFaq\",\"upsert\":\"upsertOneFaq\",\"aggregate\":\"aggregateFaq\",\"groupBy\":\"groupByFaq\"},{\"model\":\"Notice\",\"plural\":\"notices\",\"findUnique\":\"findUniqueNotice\",\"findFirst\":\"findFirstNotice\",\"findMany\":\"findManyNotice\",\"create\":\"createOneNotice\",\"createMany\":\"createManyNotice\",\"delete\":\"deleteOneNotice\",\"update\":\"updateOneNotice\",\"deleteMany\":\"deleteManyNotice\",\"updateMany\":\"updateManyNotice\",\"upsert\":\"upsertOneNotice\",\"aggregate\":\"aggregateNotice\",\"groupBy\":\"groupByNotice\"},{\"model\":\"Creator\",\"plural\":\"creators\",\"findUnique\":\"findUniqueCreator\",\"findFirst\":\"findFirstCreator\",\"findMany\":\"findManyCreator\",\"create\":\"createOneCreator\",\"createMany\":\"createManyCreator\",\"delete\":\"deleteOneCreator\",\"update\":\"updateOneCreator\",\"deleteMany\":\"deleteManyCreator\",\"updateMany\":\"updateManyCreator\",\"upsert\":\"upsertOneCreator\",\"aggregate\":\"aggregateCreator\",\"groupBy\":\"groupByCreator\"},{\"model\":\"CreatorAuth\",\"plural\":\"creatorAuths\",\"findUnique\":\"findUniqueCreatorAuth\",\"findFirst\":\"findFirstCreatorAuth\",\"findMany\":\"findManyCreatorAuth\",\"create\":\"createOneCreatorAuth\",\"createMany\":\"createManyCreatorAuth\",\"delete\":\"deleteOneCreatorAuth\",\"update\":\"updateOneCreatorAuth\",\"deleteMany\":\"deleteManyCreatorAuth\",\"updateMany\":\"updateManyCreatorAuth\",\"upsert\":\"upsertOneCreatorAuth\",\"aggregate\":\"aggregateCreatorAuth\",\"groupBy\":\"groupByCreatorAuth\"},{\"model\":\"CreatorReview\",\"plural\":\"creatorReviews\",\"findUnique\":\"findUniqueCreatorReview\",\"findFirst\":\"findFirstCreatorReview\",\"findMany\":\"findManyCreatorReview\",\"create\":\"createOneCreatorReview\",\"createMany\":\"createManyCreatorReview\",\"delete\":\"deleteOneCreatorReview\",\"update\":\"updateOneCreatorReview\",\"deleteMany\":\"deleteManyCreatorReview\",\"updateMany\":\"updateManyCreatorReview\",\"upsert\":\"upsertOneCreatorReview\",\"aggregate\":\"aggregateCreatorReview\",\"groupBy\":\"groupByCreatorReview\"},{\"model\":\"CreatorReviewItem\",\"plural\":\"creatorReviewItems\",\"findUnique\":\"findUniqueCreatorReviewItem\",\"findFirst\":\"findFirstCreatorReviewItem\",\"findMany\":\"findManyCreatorReviewItem\",\"create\":\"createOneCreatorReviewItem\",\"createMany\":\"createManyCreatorReviewItem\",\"delete\":\"deleteOneCreatorReviewItem\",\"update\":\"updateOneCreatorReviewItem\",\"deleteMany\":\"deleteManyCreatorReviewItem\",\"updateMany\":\"updateManyCreatorReviewItem\",\"upsert\":\"upsertOneCreatorReviewItem\",\"aggregate\":\"aggregateCreatorReviewItem\",\"groupBy\":\"groupByCreatorReviewItem\"},{\"model\":\"Log\",\"plural\":\"logs\",\"findUnique\":\"findUniqueLog\",\"findFirst\":\"findFirstLog\",\"findMany\":\"findManyLog\",\"create\":\"createOneLog\",\"createMany\":\"createManyLog\",\"delete\":\"deleteOneLog\",\"update\":\"updateOneLog\",\"deleteMany\":\"deleteManyLog\",\"updateMany\":\"updateManyLog\",\"upsert\":\"upsertOneLog\",\"aggregate\":\"aggregateLog\",\"groupBy\":\"groupByLog\"}],\"otherOperations\":{\"read\":[],\"write\":[\"executeRaw\",\"queryRaw\"]}}}"
const dmmf = JSON.parse(dmmfString)
exports.Prisma.dmmf = JSON.parse(dmmfString)

/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/Users/hj/work/dothis-projects/packages/share/generated/prisma-client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [],
    "previewFeatures": [
      "interactiveTransactions",
      "fullTextSearch",
      "fullTextIndex"
    ],
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null
  },
  "relativePath": "../../prisma",
  "clientVersion": "4.5.0",
  "engineVersion": "0362da9eebca54d94c8ef5edd3b2e90af99ba452",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "mysql",
  "dataProxy": false
}
config.document = dmmf
config.dirname = dirname




const { warnEnvConflicts } = require('./runtime/index')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(dirname, config.relativeEnvPaths.schemaEnvPath)
})

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

path.join(__dirname, "libquery_engine-darwin-arm64.dylib.node");
path.join(process.cwd(), "generated/prisma-client/libquery_engine-darwin-arm64.dylib.node")
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "generated/prisma-client/schema.prisma")
