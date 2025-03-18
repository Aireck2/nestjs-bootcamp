import { PrimaryGeneratedColumn } from "typeorm";

export class CouponEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
}
