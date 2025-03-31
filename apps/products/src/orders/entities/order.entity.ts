import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from '../../../../users/src/users/entities/user.entity';
import { ProductEntity } from '../../products/entities/product.entity';

export enum OrderStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn({ name: 'order_id' })
  id: number;

  @Column({ name: 'product_id' })
  productId: number;

  @ManyToOne(() => ProductEntity, { eager: false })
  @JoinColumn({ name: 'product_id' })
  product?: ProductEntity;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => UserEntity, { eager: false })
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column({ name: 'final_price', type: 'numeric', precision: 10, scale: 2 })
  finalPrice: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
