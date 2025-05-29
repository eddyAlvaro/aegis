import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class VehiclesEntity {
  @PrimaryColumn('text')
  id: string;

  @Column({ name: 'plate_number', unique: true })
  plateNumber: string; // Ej: "BVV-196"

  @Column({ name: 'category' })
  category: string; // Ej: "M1"

  @Column({ name: 'mileage' })
  mileage: string; // Ej: 26833

  @CreateDateColumn()
  createdAt: Date;
}
