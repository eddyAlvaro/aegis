import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { match, Result } from 'oxide.ts';
import { routesV1 } from '../../../../config/app-routes';
import { ApiErrorResponse } from '../../../../platform/api/api-error.response';
import { Repository } from 'typeorm';
// import { CarBrandEntity } from '../../../offer-management/infrastructure/persistence/relational/entities/car-brand.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CarBrandDto } from '../../dto/car-brand.dto';

@ApiTags(routesV1.sharedKernel.root)
@Controller(routesV1.version)
export class GetCarBrandsHttpController {
  constructor() {} // private readonly typeormCarBrandRepository: Repository<CarBrandEntity>, // @InjectRepository(CarBrandEntity)

  // @ApiOperation({
  //   summary: 'Find car brands',
  // })
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   type: CarBrandDto,
  //   isArray: true,
  // })
  // @ApiResponse({
  //   status: HttpStatus.BAD_REQUEST,
  //   type: ApiErrorResponse,
  // })
  // @Get(routesV1.sharedKernel.car.getCarBrands)
  // async create(): Promise<CarBrandDto[]> {
  //   const brands = await this.typeormCarBrandRepository.find();
  //   return brands.map(
  //     (brand) =>
  //       new CarBrandDto({
  //         id: brand.id,
  //         name: brand.name,
  //       }),
  //   );
  // }
}
