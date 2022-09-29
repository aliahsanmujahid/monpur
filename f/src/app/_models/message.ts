export interface Message {
    id: number;
    chatid: string;
    senderid: string;
    message: string;
    date: number;
  }

  export interface MessageSend {
    senderid : string,
    receiverid : string,
    message: string,
    chatid: string,
  }

  export interface Online {
    userId: number;
    socketId: number;
  }

  export interface Conversation {
    chatid:number;
    id:number;
    unread:number;
    flag:number;
    date:string;
    name: string;
    image: string;
  }
