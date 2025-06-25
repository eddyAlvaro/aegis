import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { RoleSeedService } from './role/role-seed.service';
import { UserSeedService } from './user/user-seed.service';
import { CourseSeedService } from './courses/course-seed.service';
// import { ConfigService } from '@nestjs/config';
// import { AllConfigType } from '@src/config/config.type';
// import { Environment } from '@src/database/config/environments';
const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);
  // const configService = app.get(ConfigService<AllConfigType>);

  // const nodeEnv: Environment =
  //   configService.get('app.nodeEnv', { infer: true }) || 'development';

  await app.get(CourseSeedService).runCommon();
  await app.get(RoleSeedService).run();
  await app.get(UserSeedService).run();
  // run
  // await app.get(RoleSeedService).run();
  // await app.get(StatusSeedService).run();
  // await app.get(UserSeedService).run();

  await app.close();
};

void runSeed();
