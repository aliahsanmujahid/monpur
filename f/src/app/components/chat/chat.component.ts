import { Conversation, MessageSend } from './../../_models/message';
import { MessageService } from './../../_services/message.service';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('content') content: ElementRef;
  @ViewChildren('messages') messages: QueryList<any>;

  constructor(public accountService: AccountService,public messageService: MessageService,
    private router: Router  ) { }

  UserId: any = 'a';
  ChatId:string;
  ReceiverId:string;
  viewmessage:boolean = false;
  active:any;
  page = 0;
  flag = true;
  unflag = false;
  nochat = false;
  fnochat = false;



  ngOnInit(): void {

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
      this.getchats();
    }

}




  flagit(chatid){
    this.messageService.flagchat({chatid:chatid,userid:this.UserId});
  }

  unflagchat(chatid){
    this.messageService.unflagchat({chatid:chatid,userid:this.UserId});
  }


  showchats(){
    this.flag = true;
    this.unflag = false;
    console.log("show chat cleck");
  }
  showflagchats(){
    this.unflag = true;
    this.flag = false;
    this.getflagchats();
  }
  getchats(){
    this.page = 0;
    this.messageService.getConversation(this.UserId,++this.page);
  }
  pgetchats(){
    this.messageService.pgetConversation(this.UserId,++this.page).subscribe(res => {
      if(res.length < 10){
       this.nochat = true;
      }
    });
  }

  getflagchats(){
    this.page = 0;
    this.messageService.getflagConversation(this.UserId,++this.page);
  }
  pgetflagchats(){
    this.messageService.pgetflagConversation(this.UserId,++this.page).subscribe(res => {
      if(res.length < 10){
       this.fnochat = true;
      }
    });
  }


  loadmessage(user){


   this.messageService.loadmessage(user.chatid,this.UserId);

    if(user.role == "admin" || user.role == "moderator"){
      this.ReceiverId = 'a';
    }else{
      this.ReceiverId = user.id;
    }

    this.active = user;
    this.ChatId = user.chatid
    this.viewmessage = true;

  }

  mloadmessage(user){

    if(user.role == "admin" || user.role == "moderator"){
      this.ReceiverId = 'a';
    }else{
      this.ReceiverId = user.id;
    }

    this.active = user;
    this.ChatId = user.chatid
    this.viewmessage = true;

   this.messageService.loadmessage(user.chatid,this.UserId);

   this.router.navigateByUrl("chat/"+this.ChatId+'/'+this.ReceiverId);

  }

  isUserOnline(user){
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


  ///just for scroll bottom
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
