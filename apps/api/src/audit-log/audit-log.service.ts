import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditEvent } from './entities/audit-event.entity';
import * as crypto from 'crypto';

@Injectable()
export class AuditLogService {
  constructor(
    @InjectRepository(AuditEvent)
    private auditEventRepository: Repository<AuditEvent>,
  ) {}

  private calculateHash(
    eventType: string,
    payload: any,
    prevHash: string | null,
  ): string {
    const data = JSON.stringify({
      event_type: eventType,
      payload,
      prev_hash: prevHash,
    });
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  async createEvent(eventType: string, payload: any): Promise<AuditEvent> {
    // Get the last event to chain the hash
    const lastEvent = await this.auditEventRepository.findOne({
      order: { created_at: 'DESC' },
    });

    const prevHash = lastEvent ? lastEvent.hash : null;
    const hash = this.calculateHash(eventType, payload, prevHash);

    const event = this.auditEventRepository.create({
      event_type: eventType,
      payload,
      hash,
      prev_hash: prevHash,
    });

    return this.auditEventRepository.save(event);
  }

  async getEvents(): Promise<AuditEvent[]> {
    return this.auditEventRepository.find({
      order: { created_at: 'ASC' },
    });
  }

  async verifyChain(): Promise<boolean> {
    const events = await this.getEvents();

    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      const prevHash = i > 0 ? events[i - 1].hash : null;

      const expectedHash = this.calculateHash(
        event.event_type,
        event.payload,
        prevHash,
      );

      if (event.hash !== expectedHash || event.prev_hash !== prevHash) {
        return false;
      }
    }

    return true;
  }
}
