import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from 'src/api/user/entities/user.entity';

@Entity({ name: 'lectures' })
export class Lecture {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    lectureName: string;

    @ManyToOne(() => Users, user => user.lectures, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'studentId' })
    student: Users;

    @Column()
    studentId: string;

    @Column({ default: false })
    markedAttendance: boolean;

    @Column({ type: 'timestamp', nullable: false })
    startTime: Date;

    @Column({ type: 'timestamp', nullable: false })
    endTime: Date;
}
