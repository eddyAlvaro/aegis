import { ApiProperty } from '@nestjs/swagger';
import { IdRequestDto } from '../../../platform/api/id.request.dto';

export class CarModelDto extends IdRequestDto {
  constructor(props: CarModelDto) {
    super(props.id);
    this.name = props.name;
  }
  @ApiProperty()
  name: string;
}
