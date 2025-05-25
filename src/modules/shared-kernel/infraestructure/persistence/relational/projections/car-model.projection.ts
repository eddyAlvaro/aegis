// import { Injectable } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { TypeORMProjectionBase } from '../../../../../../platform/db/typeorm-proyection.base';
// import { CarModelEntity } from '../../../../../offer-management/infrastructure/persistence/relational/entities/car-model.entity';

// /**
//  * Represents a read projection in the system.
//  *
//  * Projections are used to create optimized views of data for specific queries.
//  * Unlike repositories, which manage the persistence of domain entities,
//  * projections are designed to optimize data reading and querying by providing
//  * denormalized or aggregated representations of domain information.
//  *
//  * @remarks
//  * Projections are updated based on domain events or changes in the database
//  * to reflect the current state of the data in a form that is efficient for queries.
//  *
//  * @template T - The type of data represented by the projection.
//  */
// @Injectable()
// export class CarModelProjection extends TypeORMProjectionBase<CarModelEntity> {
//   public constructor(
//     @InjectRepository(CarModelEntity)
//     repository: Repository<CarModelEntity>,
//   ) {
//     super(repository);
//   }
// }
