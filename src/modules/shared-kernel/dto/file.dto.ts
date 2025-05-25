import { ApiProperty } from '@nestjs/swagger';
import { IdRequestDto } from '../../../platform/api/id.request.dto';

export class FileDto extends IdRequestDto {
  constructor(props: FileDto) {
    super(props.id);
    this.path = props.path;
  }
  @ApiProperty()
  path: string;
}
