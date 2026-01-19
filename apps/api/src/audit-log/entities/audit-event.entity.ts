import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('audit_events')
export class AuditEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  event_type: string;

  @Column('jsonb')
  payload: Record<string, unknown>;

  @Column()
  hash: string;

  @Column({ nullable: true })
  prev_hash: string;

  @CreateDateColumn()
  created_at: Date;
}
