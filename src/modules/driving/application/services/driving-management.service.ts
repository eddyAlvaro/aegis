import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentsDto } from '../dtos/driving-training-record.dto';
import { randomUUID } from 'crypto';
import { DrivingTrainingRecordEntity } from '../../infraestructure/persistence/relational/entity/driving-training-record.entity';
import { MailService } from '../../../../mail/mail.service';
import { DrivingTrainingDailyLogEntity } from '../../infraestructure/persistence/relational/entity/driving-training-daily-log.entity';
import { UserEntity } from '../../../users-management/infraestructure/persistence/relational/entity/user.entity';

@Injectable()
export class DrivingManagementService {
  private readonly logger = new Logger(DrivingManagementService.name);
  constructor(
    @InjectRepository(DrivingTrainingRecordEntity)
    private readonly drivingTrainingRecordRepository: Repository<DrivingTrainingRecordEntity>,
    private readonly mailService: MailService,

    // @InjectRepository(DrivingTrainingDailyLogEntity)
    // private readonly drivingTrainingDailyLogRepository: Repository<DrivingTrainingDailyLogEntity>,
  ) {}
  // async getComments(): Promise<CommentsDto[]> {
  //   return await this.commentsRepository.find();
  // }

  async createDrivingTrainingRecord(
    participant: UserEntity,
  ): Promise<CommentsDto> {
    return await this.drivingTrainingRecordRepository.save({
      id: randomUUID(),
      participant: participant,
    });
  }

  async deleteComment(id: string) {}
}
