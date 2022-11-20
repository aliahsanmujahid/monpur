import { Conversation, MessageSend } from './../../_models/message';
import { MessageService } from './../../_services/message.service';
import { Component, ElementRef, Input, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
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

  @Input() ChatId: any;
  @Input() ReceiverId: any;

  UserId: string;
  // ChatId:string;
  // ReceiverId:string;
  MessagedUser:any;
  active:any;

  message: MessageSend ={
    chatid:'',
    senderid:'',
    receiverid:'',
    message:''
  };

  ngOnChanges() {

    this.UserId = this.accountService.getuserid()

    if(this.UserId !== undefined){
      this.messageService.createHubConnection(this.UserId);
      //this.messageService.getConversation(this.UserId);
    }

    if(this.ChatId){
      this.messageService.chatUser$.subscribe(res => {
        this.MessagedUser = res.find(x => x.chatid == this.ChatId);
      });
    }

    if(this.ReceiverId){


      this.messageService.getChatUsers(this.ReceiverId).subscribe(res => {
        this.MessagedUser = res;
      });
      this.messageService.haschat({ senderid: this.UserId,receiverid: this.ReceiverId}).subscribe(res => {

        //console.log("haschat res",res);

        if(!res.error){
          this.ChatId = res[0].id
          // console.log("this.ChatId ",this.ChatId );
          this.messageService.loadmessage(this.ChatId,this.UserId);
        }else{
          this.messageService.nullmessage();
        }

      });

    }
  }

  ngOnInit(): void {

    // this.UserId = this.accountService.getuserid()

    // if(this.UserId !== undefined){
    //   this.messageService.createHubConnection(this.UserId);
    //   //this.messageService.getConversation(this.UserId);
    // }

    // if(this.ChatId){
    //   this.messageService.chatUser$.subscribe(res => {
    //     this.MessagedUser = res.find(x => x.chatid == this.ChatId);
    //   });
    // }

    // if(this.ReceiverId){


    //   this.messageService.getChatUsers(this.ReceiverId).subscribe(res => {
    //     this.MessagedUser = res;
    //   });
    //   this.messageService.haschat({ senderid: this.UserId,receiverid: this.ReceiverId}).subscribe(res => {

    //     // console.log("res",res);
    //     if(!res.error){
    //       this.ChatId = res[0].id
    //       this.messageService.loadmessage(this.ChatId);
    //     }
    //   });

    // }

    // console.log(this.accountService.currentUserSource)

  }

  sendmsg(){

    // console.log(this.ChatId)

    if(this.ChatId){

      this.message.senderid = this.UserId;
      this.message.receiverid = this.ReceiverId;
      this.message.chatid = this.ChatId;
      if(this.message.message != ''){
        this.messageService.sendmsg(this.message,this.ReceiverId);
        this.message = {
          chatid:'',
          senderid:'',
          receiverid:'',
          message:''
        }
      }

    }else{
      this.messageService.createchat({ senderid: this.UserId,receiverid: this.ReceiverId}).subscribe(res => {

        console.log("again chat ",res);
        if(!res.error){
          this.message.senderid = this.UserId;
          this.message.receiverid = this.ReceiverId;
          this.message.chatid = res[0].id;
          this.ChatId =  res[0].id;
          if(this.message.message != ''){
          this.messageService.sendmsg(this.message,this.ReceiverId);
          this.message = {
          chatid:'',
          senderid:'',
          receiverid:'',
          message:''
        }
        }
        }

      });
    }

    //console.log("chat id ", this.message);
  }

  activeclass(userid){
    this.active = userid;
  }


  // loadmessage(id,receiveid){
  //  this.ChatId = id
  //  this.ReceiverId = receiveid;

  //  this.messageService.chatUser$.subscribe(res => {

  //  this.MessagedUser = res.find(x => x.chatid == id);

  //  });
  //  console.log(this.MessagedUser);

  //  this.messageService.loadmessage(id);

  // }

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
