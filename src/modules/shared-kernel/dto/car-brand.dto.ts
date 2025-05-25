import { ApiProperty } from '@nestjs/swagger';
import { IdRequestDto } from '../../../platform/api/id.request.dto';

export class CarBrandDto extends IdRequestDto {
  constructor(props: CarBrandDto) {
    super(props.id);
    this.name = props.name;
  }
  @ApiProperty()
  name: string;
}
