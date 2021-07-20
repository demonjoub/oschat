import { Column, PrimaryGeneratedColumn, Entity, Generated, OneToOne, JoinColumn } from 'typeorm';
import { ReadEntity } from './read.entity';

@Entity("conversation")
export class ConversationEntity {

  @PrimaryGeneratedColumn('increment')
  id: number

  @Generated('uuid')
  @Column()
  conversationId: number

  @Column("simple-array", { nullable: true })
  member: string[]

  @Column()
  roomName: string

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createAt: string

  @Column("int", { default: () => 1 })
  status: number

  @Column()
  projectcode: string

  @Column()
  unitaddr: string

  @Column()
  unitcode: string

  @Column()
  name: string

  @OneToOne(() => ReadEntity)
  @JoinColumn()
  read: ReadEntity

}
