import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity("read")
export class ReadEntity {

  @PrimaryColumn()
  conversationId: string

  @Column()
  readBy: string

  @Column({ default: () => false })
  isread: boolean

  @Column({ type: 'text' })
  readByMessage: string
}
