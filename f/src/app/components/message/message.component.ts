import { MessageService } from 'src/app/_services/message.service';
import { Conversation, MessageSend } from './../../_models/message';
import { Component, ElementRef, Input, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @ViewChild('content') content: ElementRef;
  @ViewChildren('messages') messages: QueryList<any>;

  constructor(public accountService: AccountService,public messageService: MessageService,
    private route: ActivatedRoute, private router: Router) { }

  @Input() ChatId: any;
  @Input() ReceiverId: any;

  userid: any  = 'a';

  messagedUser:any;
  tempUser:any;
  page = 1;


  message: MessageSend ={
    chatid:null,
    senderid:'',
    receiverid:'',
    message:''
  };

  ngOnChanges() {
    this.page = 1;
    
    this.route.params.subscribe(p => {
      if(p['cid'] != undefined && p['rid'] != undefined){
        this.ChatId = p['cid'];
        this.ReceiverId =  p['rid'];
      }
    });

    //setting userid
    this.accountService.currentUser$.subscribe( user => {
      if(user){
        if(user.role == 'admin' || user.role == 'moderator'){
          this.userid = 'a';
        }else{
          this.userid = user.userId;
        }
      }
    });

    //setting hub connection
    if(this.userid !== undefined){
      this.messageService.createHubConnection(this.userid);
    }

        //getting chat user and load message
        if(this.ChatId){
          this.messageService.chatUser$.subscribe(res => {
            this.messagedUser = res.find(x => x.chatid == this.ChatId);
            if(this.messagedUser !== undefined){
              this.tempUser = this.messagedUser;
            }
            if(this.messagedUser == undefined){
              this.messagedUser = this.tempUser;
            }
          });
        }

        if(this.messagedUser == undefined){
          // this.router.navigateByUrl("/msg");
          this.messageService.getConversation(this.userid);

           //getting chat user and load message
        if(this.ChatId){
          this.messageService.chatUser$.subscribe(res => {
            this.messagedUser = res.find(x => x.chatid == this.ChatId);
            if(this.messagedUser !== undefined){
              this.tempUser = this.messagedUser;
            }
            if(this.messagedUser == undefined){
              this.messagedUser = this.tempUser;
            }
          });
        }
        this.messageService.loadmessage(this.ChatId,this.userid);
        }

        //null the form
        this.message = {
          chatid:null,
          senderid:'',
          receiverid:'',
          message:''
        };

  }

  ngOnInit(): void {
    this.page = 1;

    this.route.params.subscribe(p => {
      if(p['cid'] != undefined && p['rid'] != undefined){
        this.ChatId = p['cid'];
        this.ReceiverId =  p['rid'];
      }
    });

     //setting userid
     this.accountService.currentUser$.subscribe( user => {
      if(user){
        if(user.role == 'admin' || user.role == 'moderator'){
          this.userid = 'a';
        }else{
          this.userid = user.userId;
        }
      }
    });

     //setting hub connection
     if(this.userid !== undefined){
      this.messageService.createHubConnection(this.userid);
    }

    //getting chat user and load message
    if(this.ChatId){
      this.messageService.chatUser$.subscribe(res => {

          this.messagedUser = res.find(x => x.chatid == this.ChatId);
         if(this.messagedUser !== undefined){
          this.tempUser = this.messagedUser;
        }
        if(this.messagedUser == undefined){
          this.messagedUser = this.tempUser;
        }

      });

    }

    // if(this.messagedUser == undefined){
    //   this.router.navigateByUrl("/msg");
    // }

    if(this.messagedUser == undefined){
      // this.router.navigateByUrl("/msg");
      this.messageService.getConversation(this.userid);

       //getting chat user and load message
    if(this.ChatId){
      this.messageService.chatUser$.subscribe(res => {
        this.messagedUser = res.find(x => x.chatid == this.ChatId);
        if(this.messagedUser !== undefined){
          this.tempUser = this.messagedUser;
        }
        if(this.messagedUser == undefined){
          this.messagedUser = this.tempUser;
        }
      });
    }
    this.messageService.loadmessage(this.ChatId,this.userid);
    }

   //null the form
   this.message = {
        chatid:null,
        senderid:'',
        receiverid:'',
        message:''
    };

  }


  //loading more message
  loadmessage(){
      this.messageService.ploadmessage(this.ChatId,this.userid,++this.page);
      this.scrollToTop();
      this.messages.changes.subscribe(this.scrollToTop);
  }

  sendmsg(){
    this.scrollToBottom();
    this.messages.changes.subscribe(this.scrollToBottom);

    // console.log(this.ChatId)

    if(this.ChatId){

      this.message.senderid = this.userid;
      this.message.receiverid = this.ReceiverId;
      this.message.chatid = this.ChatId;
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

  flagit(chatid){
    this.messageService.flagchat({chatid:chatid,userid:this.userid});
  }

  unflagchat(chatid){

    this.messageService.unflagchat({chatid:chatid,userid:this.userid});

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
  scrollToTop = () => {
    try {
      this.content.nativeElement.scrollTop = 0;
    } catch (err) {}
  }

}
