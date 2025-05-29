import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class LicenseCategoryEntity {
  @PrimaryColumn('text')
  id: string;

  @Column({ name: 'category' })
  name: string; // Ej: "M1"
}
