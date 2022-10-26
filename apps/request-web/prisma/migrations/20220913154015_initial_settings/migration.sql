-- CreateTable
CREATE TABLE `accounts` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,

    UNIQUE INDEX `accounts_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `sessions_sessionToken_key`(`sessionToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,
    `introduction` TEXT NULL,

    UNIQUE INDEX `users_name_key`(`name`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `verificationtokens` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `verificationtokens_token_key`(`token`),
    UNIQUE INDEX `verificationtokens_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `requestposts` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `category` ENUM('GAME', 'LIFE_TALK', 'COOK_EAT', 'TOUR_FOOD', 'DANCE_MUSIC', 'ENTERTAINMENT', 'EDUCATION', 'FINANCE', 'SPORTS_HEALTH', 'BEAUTY_FASHION', 'HOBBY', 'ETC') NULL DEFAULT 'ETC',
    `creatorId` BIGINT NULL,
    `expires` DATETIME(3) NULL,
    `totalViews` INTEGER NOT NULL DEFAULT 0,
    `status` ENUM('REQUEST', 'ACCEPT', 'REGISTRATION', 'COMPLETION', 'EXPIRATION', 'REFUSE') NOT NULL DEFAULT 'REQUEST',
    `solvedUrl` VARCHAR(191) NULL,
    `thumbnailUrl` VARCHAR(191) NULL,
    `refusalReason` VARCHAR(191) NULL,

    INDEX `requestposts_userId_creatorId_status_createdAt_idx`(`userId`, `creatorId`, `status`, `createdAt` DESC),
    FULLTEXT INDEX `requestposts_title_content_idx`(`title`, `content`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `requestfundings` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `requestId` BIGINT NULL,
    `userId` VARCHAR(191) NULL,
    `quantity` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `requestfundings_requestId_userId_createdAt_idx`(`requestId`, `userId`, `createdAt` DESC),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `requestcomments` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `requestId` BIGINT NOT NULL,
    `userId` VARCHAR(191) NULL,
    `parentId` BIGINT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `content` TEXT NOT NULL,

    INDEX `requestcomments_requestId_userId_parentId_createdAt_idx`(`requestId`, `userId`, `parentId`, `createdAt` DESC),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `requestreactions` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `requestId` BIGINT NOT NULL,
    `userId` VARCHAR(191) NULL,
    `type` ENUM('LIKE', 'DISLIKE') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `requestreactions_requestId_userId_type_createdAt_idx`(`requestId`, `userId`, `type`, `createdAt` DESC),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `requestbookmarks` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `requestId` BIGINT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `requestbookmarks_requestId_userId_createdAt_idx`(`requestId`, `userId`, `createdAt` DESC),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `requestplatforms` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `requestId` BIGINT NOT NULL,
    `name` ENUM('YOUTUBE', 'INSTAGRAM', 'FACEBOOK', 'TWITCH') NOT NULL,

    INDEX `requestplatforms_requestId_name_idx`(`requestId`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `requestapplycreators` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `requestId` BIGINT NOT NULL,
    `creatorId` BIGINT NULL,

    INDEX `requestapplycreators_requestId_creatorId_idx`(`requestId`, `creatorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `requestreports` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `requestId` BIGINT NOT NULL,
    `userId` VARCHAR(191) NULL,
    `content` LONGTEXT NOT NULL,
    `type` ENUM('SEXUAL', 'VIOLENT', 'HATFULE', 'CHILD', 'TERRORISM', 'SPAM') NOT NULL,
    `status` ENUM('PROCESSING', 'COMPLETION') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `requestreports_requestId_userId_type_status_createdAt_idx`(`requestId`, `userId`, `type`, `status`, `createdAt` DESC),
    FULLTEXT INDEX `requestreports_content_idx`(`content`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `requestinquirys` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `requestId` BIGINT NOT NULL,
    `creatorId` BIGINT NULL,
    `userId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `requestinquirys_creatorId_userId_createdAt_idx`(`creatorId`, `userId`, `createdAt` DESC),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `requestinquirymessages` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `roomId` BIGINT NOT NULL,
    `fromId` VARCHAR(191) NOT NULL,
    `text` TEXT NOT NULL,
    `fileUrl` VARCHAR(191) NULL,
    `type` ENUM('TEXT', 'IMAGE', 'VIDEO', 'FILE') NOT NULL DEFAULT 'TEXT',
    `isRead` BOOLEAN NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `requestinquirymessages_roomId_fromId_type_createdAt_idx`(`roomId`, `fromId`, `type`, `createdAt` DESC),
    FULLTEXT INDEX `requestinquirymessages_text_idx`(`text`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `alarms` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `link` VARCHAR(200) NULL,
    `status` ENUM('UNREAD', 'READ') NOT NULL DEFAULT 'UNREAD',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `alarms_userId_status_createdAt_idx`(`userId`, `status`, `createdAt` DESC),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `points` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `type` ENUM('WITHDRAW', 'DEPOSIT', 'FUNDING', 'RETURN') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `points_userId_type_createdAt_idx`(`userId`, `type`, `createdAt` DESC),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rankings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NULL,
    `ranking` INTEGER NOT NULL,
    `type` ENUM('FUN', 'COOL', 'SEXY') NOT NULL,
    `score` BIGINT NOT NULL,
    `change` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `rankings_userId_ranking_type_createdAt_idx`(`userId`, `ranking`, `type`, `createdAt` DESC),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `faqs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('BEST', 'GUIDE', 'ACCOUNT', 'CREATOR', 'BUSSINESS') NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `faqs_createdAt_idx`(`createdAt` DESC),
    FULLTEXT INDEX `faqs_title_content_idx`(`title`, `content`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `notices_createdAt_idx`(`createdAt` DESC),
    FULLTEXT INDEX `notices_title_content_idx`(`title`, `content`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `creators` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `creators_userId_key`(`userId`),
    INDEX `creators_userId_createdAt_idx`(`userId`, `createdAt` DESC),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `creatorauths` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `creatorId` BIGINT NOT NULL,
    `isMain` BOOLEAN NOT NULL DEFAULT false,
    `profileUrl` VARCHAR(191) NULL,
    `platform` ENUM('YOUTUBE', 'INSTAGRAM', 'FACEBOOK', 'TWITCH') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `creatorauths_creatorId_platform_createdAt_idx`(`creatorId`, `platform`, `createdAt` DESC),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `creatorreviews` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `creatorId` BIGINT NOT NULL,
    `userId` VARCHAR(191) NULL,
    `content` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `creatorreviews_creatorId_userId_createdAt_idx`(`creatorId`, `userId`, `createdAt` DESC),
    FULLTEXT INDEX `creatorreviews_content_idx`(`content`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `creatorreviewitems` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `reviewId` BIGINT NOT NULL,
    `content` VARCHAR(255) NOT NULL,
    `isChecked` BOOLEAN NOT NULL DEFAULT true,

    INDEX `creatorreviewitems_reviewId_idx`(`reviewId`),
    FULLTEXT INDEX `creatorreviewitems_content_idx`(`content`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requestposts` ADD CONSTRAINT `requestposts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requestposts` ADD CONSTRAINT `requestposts_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `creators`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requestfundings` ADD CONSTRAINT `requestfundings_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `requestposts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requestfundings` ADD CONSTRAINT `requestfundings_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requestcomments` ADD CONSTRAINT `requestcomments_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `requestposts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requestcomments` ADD CONSTRAINT `requestcomments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requestreactions` ADD CONSTRAINT `requestreactions_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `requestposts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requestreactions` ADD CONSTRAINT `requestreactions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requestbookmarks` ADD CONSTRAINT `requestbookmarks_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `requestposts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requestbookmarks` ADD CONSTRAINT `requestbookmarks_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requestplatforms` ADD CONSTRAINT `requestplatforms_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `requestposts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requestapplycreators` ADD CONSTRAINT `requestapplycreators_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `requestposts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requestapplycreators` ADD CONSTRAINT `requestapplycreators_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `creators`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requestreports` ADD CONSTRAINT `requestreports_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `requestposts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requestreports` ADD CONSTRAINT `requestreports_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requestinquirys` ADD CONSTRAINT `requestinquirys_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `requestposts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requestinquirys` ADD CONSTRAINT `requestinquirys_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `creators`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requestinquirys` ADD CONSTRAINT `requestinquirys_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requestinquirymessages` ADD CONSTRAINT `requestinquirymessages_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `requestinquirys`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requestinquirymessages` ADD CONSTRAINT `requestinquirymessages_fromId_fkey` FOREIGN KEY (`fromId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alarms` ADD CONSTRAINT `alarms_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `points` ADD CONSTRAINT `points_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rankings` ADD CONSTRAINT `rankings_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `creators` ADD CONSTRAINT `creators_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `creatorauths` ADD CONSTRAINT `creatorauths_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `creators`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `creatorreviews` ADD CONSTRAINT `creatorreviews_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `creators`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `creatorreviews` ADD CONSTRAINT `creatorreviews_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `creatorreviewitems` ADD CONSTRAINT `creatorreviewitems_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `creatorreviews`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
