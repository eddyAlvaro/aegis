import { Controller, Get, HttpStatus, Inject, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { match, Result } from 'oxide.ts';
import { routesV1 } from '../../../../config/app-routes';
import { ApiErrorResponse } from '../../../../platform/api/api-error.response';
import { CarBrandDto } from '../../dto/car-brand.dto';
import { QueryRequestDto } from '../../../../platform/api/query.request.dto';
import { CAR_MODEL_PROJECTION } from '../../di/tokens';
// import { CarModelProjection } from '../../infraestructure/persistence/relational/projections/car-model.projection';

@ApiTags(routesV1.sharedKernel.root)
@Controller(routesV1.version)
export class GetCarModelsHttpController {
  constructor() {} // private readonly carModelProjection: CarModelProjection, // @Inject(CAR_MODEL_PROJECTION)

  // @ApiOperation({
  //   summary: 'Find car brands',
  //   description: 'Para filtrar por marca el tipo debe ser `brand.id`',
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
  // @Get(routesV1.sharedKernel.car.getCarModels)
  // async create(@Query() queryParams: QueryRequestDto): Promise<CarBrandDto[]> {
  //   const brands = await this.carModelProjection.findAll(
  //     {
  //       filterOptions: queryParams.filterOptions ?? [],
  //       sortOptions: queryParams.sortOptions ?? [],
  //     },
  //     ['carBrand'],
  //   );
  //   return brands.map(
  //     (brand) =>
  //       new CarBrandDto({
  //         id: brand.id,
  //         name: brand.name,
  //       }),
  //   );
  // }
}
