import { Conversation, MessageSend } from './../../_models/message';
import { MessageService } from './../../_services/message.service';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('content') content: ElementRef;
  @ViewChildren('messages') messages: QueryList<any>;

  constructor(public accountService: AccountService,public messageService: MessageService) { }

  UserId: string;
  ChatId:string;
  ReceiverId:string;
  viewmessage:boolean = false;
  MessagedUser:Conversation;
  active:any;



  ngOnInit(): void {
    this.UserId = this.accountService.getuserid()
    if(this.UserId !== undefined){
      this.messageService.createHubConnection(this.UserId);
      this.getchats();
    }
    // console.log(this.accountService.currentUserSource)
  }

  flagshow(flag){
    if(flag == 1){
     return true;
    }else{
      return false;
    }
  }

  flagit(chatid){

    this.messageService.flagchat({chatid:chatid,userid:this.UserId});
    // console.log(chatid);

  }
  unflagchat(chatid){

    this.messageService.unflagchat({chatid:chatid,userid:this.UserId});
    // console.log(chatid);

  }


  getchats(){
    this.messageService.getConversation(this.UserId);
  }
  getflagchats(){
    this.messageService.getflagConversation(this.UserId);
  }



  activeclass(userid){
    this.active = userid;
  }


  loadmessage(id,receiveid){
    // console.log("loading message");
    this.active = receiveid;
    this.ChatId = id
    this.ReceiverId = receiveid;
    this.viewmessage = true;
  //  this.messageService.chatUser$.subscribe(res => {

  //  this.MessagedUser = res.find(x => x.chatid == id);

  //  });
  //  console.log(this.MessagedUser);

   this.messageService.loadmessage(id,this.UserId);

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
