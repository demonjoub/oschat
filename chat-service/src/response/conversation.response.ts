export class ConversationResponse {
  public conversationId: number
  public status: boolean
}


export class ConversationListResponse {
  public id: number
  public conversationId: number
  public roomName: string
  public status: number

  public projectcode: string
  public unitaddr: string
  public unitcode: string
  public name: string

  public read: {
    conversationId?: string,
    readBy?: string,
    isread?: boolean
  }

  // public status: {
  //   read?: boolean,
  //   readBy?: string
  // }
  public message: {
    body?: string,
    userId?: string,
    createAt?: string
  }
  public member: string[]
  public createAt: string
}