import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MessageSend } from 'src/app/_models/message';
import { AccountService } from 'src/app/_services/account.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-messagebox',
  templateUrl: './messagebox.component.html',
  styleUrls: ['./messagebox.component.css']
})
export class MessageboxComponent implements OnInit {

  @ViewChild('content') content: ElementRef;
  @ViewChildren('messages') messages: QueryList<any>;

  chatid: any = null;
  userid: any = null;
  receiverid = 'a';
  time:number = 0;
  page = 1;


  constructor(public accountService: AccountService,public messageService: MessageService) { }

  noerror:boolean;
  showcheck:boolean = false;

  message: MessageSend ={
    chatid:null,
    senderid:'',
    receiverid:'',
    message:''
  };

  ngOnInit(): void {

    //getting userid
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


    //haschat or not haschat and load message
    this.messageService.haschat({ senderid: this.userid,receiverid: this.receiverid}).subscribe(res => {

      console.log(res)

      if(!res.error){
        this.chatid = res[0].id
        this.messageService.loadmessage(this.chatid,this.userid,this.page);
      }else{
        this.messageService.nullmessage();
      }



    });

  }
  //ngoninit end from here//


  //loading more message
  loadmessage(){
    console.log("loading message");
    this.messageService.ploadmessage(this.chatid,this.userid,++this.page).subscribe( res =>{

      console.log("message",res);

    });
    this.scrollToTop();
    this.messages.changes.subscribe(this.scrollToTop);
  }

  ///sending message
  sendmessage(){
    this.scrollToBottom();
    this.messages.changes.subscribe(this.scrollToBottom);

    if(this.chatid){

      this.message.senderid = this.userid;
      this.message.receiverid = this.receiverid;
      this.message.chatid = this.chatid;

      if(this.message.message != ''){
        this.messageService.sendmsg(this.message,this.receiverid);
        this.message = {
          chatid:null,
          senderid:'',
          receiverid:'',
          message:''
        }
      }
    }else{
      this.messageService.createchat({ senderid: this.userid,receiverid: this.receiverid}).subscribe(res => {

        if(!res.error){
          this.message.senderid = this.userid;
          this.message.receiverid = this.receiverid;
          this.message.chatid = res[0].id;
          this.chatid =  res[0].id;
          if(this.message.message != ''){
          this.messageService.sendmsg(this.message,this.receiverid);

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

  unblock(){
    this.showcheck = false;
    this.time = 0;
  }

  sendmsg(){
    this.time++;
    if(this.time > 3){
       this.showcheck = true;
    }else{
    this.sendmessage();
    }

  }





  //just for scroll bottom
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
