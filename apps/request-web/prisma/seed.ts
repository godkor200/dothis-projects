import { PrismaClient } from '@prisma/client';

import { alarms } from './data/Alarms';
import { creatorAuths, creators } from './data/Creators';
import { faqs } from './data/Faqs';
import { notices } from './data/Notices';
import {
  requestApplyCreators,
  requestComments,
  requestFundings,
  requestPlatforms,
  requestPosts,
  requestReactions,
  requestReports,
} from './data/RequestPosts';
import { users } from './data/Users';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany({
    where: {
      id: {
        in: users.map((user) => user.id),
      }
    }
  });
  await prisma.$queryRaw`ALTER TABLE users AUTO_INCREMENT = 1`;
  await prisma.user.createMany({ data: [...users] });

  await prisma.creator.deleteMany();
  await prisma.$queryRaw`ALTER TABLE creators AUTO_INCREMENT = 1`;
  await prisma.creator.createMany({ data: [...creators] });

  await prisma.creatorAuth.deleteMany();
  await prisma.$queryRaw`ALTER TABLE creatorauths AUTO_INCREMENT = 1`;
  await prisma.creatorAuth.createMany({ data: creatorAuths });

  const dbCreators = await prisma.creator.findMany()

  await prisma.requestPost.deleteMany();
  await prisma.$queryRaw`ALTER TABLE requestposts AUTO_INCREMENT = 1`;
  await prisma.requestPost.createMany({ data: requestPosts(dbCreators) });

  await prisma.requestApplyCreator.deleteMany();
  await prisma.$queryRaw`ALTER TABLE requestapplycreators AUTO_INCREMENT = 1`;
  await prisma.requestApplyCreator.createMany({ data: requestApplyCreators(dbCreators) });

  await prisma.requestPlatform.deleteMany();
  await prisma.$queryRaw`ALTER TABLE requestplatforms AUTO_INCREMENT = 1`;
  await prisma.requestPlatform.createMany({ data: requestPlatforms });

  await prisma.requestFunding.deleteMany();
  await prisma.$queryRaw`ALTER TABLE requestfundings AUTO_INCREMENT = 1`;
  await prisma.requestFunding.createMany({ data: requestFundings });

  await prisma.requestComment.deleteMany();
  await prisma.$queryRaw`ALTER TABLE requestcomments AUTO_INCREMENT = 1`;
  await prisma.requestComment.createMany({ data: requestComments });

  await prisma.requestReport.deleteMany();
  await prisma.$queryRaw`ALTER TABLE requestreports AUTO_INCREMENT = 1`;
  await prisma.requestReport.createMany({ data: requestReports });

  await prisma.requestReaction.deleteMany();
  await prisma.$queryRaw`ALTER TABLE requestreactions AUTO_INCREMENT = 1`;
  await prisma.requestReaction.createMany({ data: requestReactions });

  await prisma.faq.deleteMany();
  await prisma.$queryRaw`ALTER TABLE faqs AUTO_INCREMENT = 1`;
  await prisma.faq.createMany({ data: faqs });

  await prisma.notice.deleteMany();
  await prisma.$queryRaw`ALTER TABLE notices AUTO_INCREMENT = 1`;
  await prisma.notice.createMany({ data: notices });

  await prisma.alarm.deleteMany();
  await prisma.$queryRaw`ALTER TABLE alarms AUTO_INCREMENT = 1`;
  await prisma.alarm.createMany({ data: alarms });
}


main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export default {};
