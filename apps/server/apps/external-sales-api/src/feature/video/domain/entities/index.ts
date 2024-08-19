/**
 * video_data_shorts, video_history_shorts, channel_data, channel_history
 * create table video_data_shorts
 * (
 *     video_id          varchar(11)              not null,
 *     channel_id        varchar(52)              not null,
 *     video_title       varchar(2000)            null,
 *     video_description text                     null,
 *     video_tags        varchar(4000)            null,
 *     video_duration    int(6)      default 0    null,
 *     video_published   datetime                 null,
 *     video_category    varchar(50) default ''   null,
 *     video_info_card   int(1)                   null,
 *     video_with_ads    int(1)                   null,
 *     video_end_screen  int(1)                   null,
 *     video_cluster     int(6)                   null,
 *     crawled_date      timestamp                null,
 *     year              int(4)      default 2000 not null,
 *     month             int(2)      default 1    not null,
 *     day               int(2)      default 1    not null,
 *     primary key (video_id, year, month, day)
 * )
 *     row_format = COMPRESSED;
 *
 *     create table video_history_shorts_202301
 * (
 *     video_id          varchar(11)          not null,
 *     video_views       int(20) default 0    null,
 *     video_likes       int(20) default 0    null,
 *     video_comments    int(20) default 0    null,
 *     video_performance double  default 0    null,
 *     year              int(4)  default 2000 not null,
 *     month             int(2)  default 1    not null,
 *     day               int(2)  default 1    not null,
 *     video_cluster     int(6)               null,
 *     primary key (video_id, year, month, day)
 * )
 *     row_format = COMPRESSED;
 *
 *     create table channel_data
 * (
 *     CHANNEL_ID           char(48) default '' not null,
 *     CHANNEL_NAME         char(255)           null,
 *     CHANNEL_DESCRIPTION  text                null,
 *     CHANNEL_TAGS         varchar(2000)       null,
 *     MAINLY_USED_KEYWORDS varchar(2000)       null,
 *     MAINLY_USED_TAGS     varchar(2000)       null,
 *     CHANNEL_COUNTRY      char(100)           null,
 *     CHANNEL_LINK         varchar(8000)       null,
 *     CHANNEL_SINCE        char(24)            null,
 *     CHANNEL_CLUSTER      smallint default -1 not null,
 *     CRAWLED_DATE         timestamp           null,
 *     USER_ID              int                 null,
 *     channel_id_part      char                not null,
 *     CHANNEL_THUMBNAIL    text                null,
 *     primary key (CHANNEL_ID, channel_id_part)
 * )
 *     row_format = COMPRESSED;
 *
 *     create table channel_history_202401
 * (
 *     channel_id            char(48)            not null,
 *     channel_average_views float               null,
 *     channel_subscribers   bigint              null,
 *     channel_total_views   bigint              null,
 *     channel_total_videos  int                 null,
 *     year                  int(4) default 2000 not null,
 *     month                 int(2) default 1    not null,
 *     day                   int(2) default 1    not null,
 *     primary key (channel_id, year, month, day)
 * )
 *     row_format = COMPRESSED;
 */
export * from './channel-data.entity';
export * from './channel-data.entity.module';
export * from './video-data-shorts.entity';
export * from './video-data-shorts.entity';
