import { Column, PrimaryGeneratedColumn, Entity, Index } from 'typeorm';

@Entity("messages")
export class MessagesEntity {

  @PrimaryGeneratedColumn('increment')
  id: number

  @Index()
  @Column()
  conversationId: string

  // message body
  @Column()
  message: string

  // image url
  @Column()
  imageurl: string

  // image juristicname
  @Column()
  juristicname: string

  // user 
  @Column()
  userId: string

  // createAt
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createAt: string

  @Column({ default: () => false })
  status: boolean



}
