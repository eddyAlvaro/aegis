import { ApiProperty } from '@nestjs/swagger';

export class FileDto {
  constructor(props: FileDto) {
    this.id = props.id;
    this.path = props.path;
  }
  @ApiProperty()
  id: string;

  path: string;
}
