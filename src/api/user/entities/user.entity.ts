import { Entity, Column, PrimaryColumn, BeforeInsert, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { createHash } from 'crypto';
import { Modules } from 'src/api/sessions/entities/session.entity';

@Entity({ name: 'users' })
export class Users {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  course: string;

  @Column({ default: '' })
  deviceId: string;

  @Column({ default: '' })
  studentId: string;

  @BeforeInsert()
  generateId() {
    const uuid = uuidv4();
    const hash = createHash('sha256').update(uuid).digest('hex');
    this.id = hash.substring(0, 10);
  }

  @OneToMany(() => Modules, (entity) => entity.user)
    modules: Modules[];
}
