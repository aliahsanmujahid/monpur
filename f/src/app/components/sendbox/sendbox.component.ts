import { Component, ElementRef, Input, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { MessageSend } from 'src/app/_models/message';
import { AccountService } from 'src/app/_services/account.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-sendbox',
  templateUrl: './sendbox.component.html',
  styleUrls: ['./sendbox.component.css']
})
export class SendboxComponent {

  @ViewChild('content') content: ElementRef;
  @ViewChildren('messages') messages: QueryList<any>;

  @Input() ReceiverId: null;

  constructor(public accountService: AccountService,public messageService: MessageService) { }

  page = 1;
  UserId: any = 'a';
  messagedUser:any;
  active:any;
  message: MessageSend ={
    chatid:null,
    senderid:'',
    receiverid:'',
    message:''
  };

  // ngOnInit(): void {
  //   this.page = 0;

  //   this.UserId = this.accountService.getuserid();
  // }

  ngOnChanges() {
    this.page = 0;

    //getting userid
    this.accountService.currentUser$.subscribe( user => {
      if(user){
        if(user.role == 'admin' || user.role == 'moderator'){
          this.UserId = 'a';
        }else{
          this.UserId = user.userId;
        }
      }
    });

    //setting hub connection
    if(this.UserId !== undefined){
      this.messageService.createHubConnection(this.UserId);
    }

    if(this.ReceiverId !== null){


      this.messageService.getChatUsers(this.ReceiverId).subscribe(res => {
        this.messagedUser = res;
      });

      // console.log("---",this.UserId, this.ReceiverId);

      this.messageService.haschat({ senderid: this.UserId,receiverid: this.ReceiverId}).subscribe(res => {

        if(!res.error){
          this.message.chatid = res[0].id;
          this.messageService.loadmessage(this.message.chatid,this.UserId);
        }else{
          this.messageService.nullmessage();
        }

      });

    }
  }


  ///sending message
  sendmessage(){
    this.scrollToBottom();
    this.messages.changes.subscribe(this.scrollToBottom);

    if(this.message.chatid !== null){

      this.message.senderid = this.UserId;
      this.message.receiverid = this.ReceiverId;

      if(this.message.message != ''){
        this.messageService.sendmsg(this.message,this.ReceiverId);
        this.message = {
          chatid:null,
          senderid:'',
          receiverid:'',
          message:''
        }
      }
    }else{
      this.messageService.createchat({ senderid: this.UserId,receiverid: this.ReceiverId}).subscribe(res => {

        console.log("message res",res);

        if(!res.error){
          this.message.senderid = this.UserId;
          this.message.receiverid = this.ReceiverId;
          this.message.chatid = res[0].id;
          if(this.message.message != ''){
          this.messageService.sendmsg(this.message,this.ReceiverId);

          this.message = {
          chatid:null,
          senderid:'',
          receiverid:'',
          message:''
        }
        }
        }

      });
    }

  }



  isUserOnline(user){
    if(user){
    var  online = false;
    if(user.role == "admin" || user.role == "moderator"){
      this.messageService.isOnline$.subscribe( x => {
        online = x.find((u) => u.userId == 'a') ? true : false ;
      });
      return online;

    }else{
    this.messageService.isOnline$.subscribe( x => {
      online = x.find((u) => u.userId == user.id) ? true : false ;
    });
    return online;
    }
    }
    return false;

  }

  //loading more message
  loadmessage(){
    this.messageService.ploadmessage(this.message.chatid,this.UserId,++this.page);
    this.scrollToTop();
    this.messages.changes.subscribe(this.scrollToTop);
  }

  flagit(chatid){
    this.messageService.flagchat({chatid:chatid,userid:this.UserId});
  }

  unflagchat(chatid){

    this.messageService.unflagchat({chatid:chatid,userid:this.UserId});

  }




  scrollToBottom = () => {
    try {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    } catch (err) {}
  }
  scrollToTop = () => {
    try {
      this.content.nativeElement.scrollTop = 0;
    } catch (err) {}
  }





}
