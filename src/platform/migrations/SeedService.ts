import { Environment } from '@src/database/config/environments';

export abstract class SeedService {
  abstract runCommon(): Promise<void>;
  abstract runProduction(): Promise<void>;
  abstract runStaging(): Promise<void>;
  abstract runDevelopment(): Promise<void>;
  async run(environment: Environment): Promise<void> {
    console.log(`${this.constructor.name} seeding started.`);
    await this.runCommon();
    switch (environment) {
      case 'development':
        await this.runDevelopment();
      case 'production':
        await this.runProduction();
      case 'staging':
        await this.runStaging();
    }
    console.log(`${environment} seeding completed.`);
  }
}
