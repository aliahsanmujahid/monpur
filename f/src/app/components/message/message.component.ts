import { Conversation, MessageSend } from './../../_models/message';
import { MessageService } from './../../_services/message.service';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @ViewChild('content') content: ElementRef;
  @ViewChildren('messages') messages: QueryList<any>;

  constructor(public accountService: AccountService,public messageService: MessageService) { }

  UserId: string;
  ChatId:string;
  ReceiverId:string;
  MessagedUser:Conversation;
  active:any;

  message: MessageSend ={
    chatid:'',
    senderid:'',
    message:''
  };

  ngOnInit(): void {

    this.UserId = this.accountService.getuserid()
    if(this.UserId !== undefined){
      this.messageService.createHubConnection(this.UserId);
      this.messageService.getConversation(this.UserId);
    }

    // console.log(this.accountService.currentUserSource)

  }
  sendmsg(){

    this.message.senderid = this.UserId
    this.message.chatid = this.ChatId
    if(this.message.message != ''){
      this.messageService.sendmsg(this.message,this.ReceiverId);
      this.message = {
        chatid:'',
        senderid:'',
        message:''
      }
    }

    //console.log("chat id ", this.message);
  }

  activeclass(userid){
    this.active = userid;
  }


  loadmessage(id,receiveid){
   this.ChatId = id
   this.ReceiverId = receiveid;

   this.messageService.chatUser$.subscribe(res => {

   this.MessagedUser = res.find(x => x.chatid == id);

   });

   this.messageService.loadmessage(id);


  }

  isUserOnline(id){
    var  online = false;
    this.messageService.isOnline$.subscribe( x => {
      online = x.find((user) => user.userId == id) ? true : false ;
    });
    return online;
  }

  ngAfterViewInit() {
    this.scrollToBottom();
    this.messages.changes.subscribe(this.scrollToBottom);
  }

  scrollToBottom = () => {
    try {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    } catch (err) {}
  }

}
