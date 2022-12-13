export interface Message {
    id: number;
    chatid: number;
    senderid: string;
    message: string;
    date: number;
  }

  export interface MessageSend {
    senderid : string,
    receiverid : string,
    message: string,
    chatid: number,
  }

  export interface Online {
    userId: string;
    socketId: string;
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
