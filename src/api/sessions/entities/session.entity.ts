import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from 'src/api/user/entities/user.entity';

@Entity({ name: 'modules' })
export class Modules {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    moduleId: string;

    @Column({ nullable: false })
    moduleName: string;

     @ManyToOne(() => Users, (entity) => entity.studentId)
     @JoinColumn({ name: 'userId' })
     user: Users;

    @Column({ default: false })
    markedAttendance: boolean;

    @Column({ type: 'timestamp', nullable: false })
    startTime: Date;

    @Column({ type: 'timestamp', nullable: false })
    endTime: Date;

    @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
    latitude: number;

    @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
    longitude: number;

    @Column({ nullable: true })
    place: string;
}
