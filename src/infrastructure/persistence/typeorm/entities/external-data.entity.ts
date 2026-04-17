import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "external_data" })
export class ExternalDataOrmEntity {
  @PrimaryGeneratedColumn("uuid")
  internalId!: string;

  @Column({ type: "varchar", unique: true })
  id!: string;

  @Column({ type: "varchar" })
  symbol!: string;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "float" })
  priceUsd!: number;

  @Column({ type: "integer", nullable: true })
  marketCapRank!: number | null;

  @Column({ type: "varchar" })
  source!: string;

  @Column({ type: "datetime" })
  fetchedAt!: string;
}
