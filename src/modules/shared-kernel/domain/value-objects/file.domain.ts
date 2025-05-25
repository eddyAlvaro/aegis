import { AggregateRoot } from '../../../../platform/ddd';

/** Note:
 * Value Objects with multiple properties can contain
 * other Value Objects inside if needed.
 * */

export interface FileProps {
  path: string;
}

export class FileDomain extends AggregateRoot<FileProps> {
  protected _id: string;

  get path(): string {
    return this.props.path;
  }

  public validate(): void {}
}
