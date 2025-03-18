import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { CategoryEntity } from "../../categories/entities/category.entity";

@Entity({ name: "products", schema: "public" })
export class ProductEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "text", nullable: false })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "numeric", precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: "int", nullable: false })
  stock: number;

  @Column({ type: "text", nullable: true })
  img_url: string;

  @Column({ type: "boolean", default: false })
  has_discount: boolean;

  @Column({ type: "numeric", precision: 5, scale: 2, default: 0 })
  discount: number;

  @Column({
    type: "numeric",
    precision: 10,
    scale: 2,
    generatedType: "STORED",
    asExpression: "(price - ((price * discount) / 100))",
  })
  price_with_discount: number;

  @Column({ name: "is_active", type: "boolean", default: true })
  is_active: boolean;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({ name: "category_id" })
  category: CategoryEntity;

  @CreateDateColumn({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: Date;
}
