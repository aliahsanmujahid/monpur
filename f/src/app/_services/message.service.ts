import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { Conversation, Message, Online } from '../_models/message';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private socket: Socket;
  private url = 'http://localhost:8000';
  baseUrl = environment.apiUrl;

  private isOnline = new BehaviorSubject<Online[]>([]);
  isOnline$ = this.isOnline.asObservable();

  // private Conversation = new BehaviorSubject<Conversation[]>([]);
  // Conversation$ = this.Conversation.asObservable();

  public chatUser = new BehaviorSubject<Conversation[]>([]);
  chatUser$ = this.chatUser.asObservable();


  public userMessage = new BehaviorSubject<Message[]>([]);
  userMessage$ = this.userMessage.asObservable();

  constructor(private http: HttpClient,private router: Router) { }



  createHubConnection(userId) {

    this.socket = io(this.url, {transports: ['websocket', 'polling', 'flashsocket']});
    this.socket.emit("new-user-add", userId);


    this.socket.on("get-users", (users) => {
      this.isOnline.next(users);
      //console.log("isOnline", this.isOnline);
    });

    this.socket.on("recieve-message", (data) => {

      this.userMessage$.pipe(take(1)).subscribe(datas => {

       if (datas.some((msg) => msg.chatid == data.chatid)) {
          this.userMessage.next([...datas, data])
       }
       //console.log("recieve-message",datas);

      })
       //console.log("recieve-message",data);
    });

  }


  sendmsg(model,receiverId){
    console.log("receiverid", receiverId);

    this.http.post(this.baseUrl + 'createmessege/',model ).pipe(
      map((data: any) => {

          this.userMessage$.pipe(take(1)).subscribe(datas => {
              this.userMessage.next([...datas, data])
              this.socket.emit("send-message", {...data,receiverId});

          })

      })
    ).subscribe();

  }



  loadmessage(id){
    return this.http.get(this.baseUrl + 'getmessages/' + id).pipe(
      map((data: Message[]) => {
        const newdata = [...data].sort((a, b) => a.id - b.id);

        this.userMessage.next(newdata);
        //console.log("this.userMessage",this.userMessage);

      })
    ).subscribe();


  }


  isUserOnline(id){
    var  online = false;
    this.isOnline$.subscribe( x => {
      online = x.find((user) => user.userId == id) ? true : false ;
    });
    return online;
  }


  getConversation(id){
    this.http.get(this.baseUrl + 'getchats/' + id).pipe(
      map((data: any) => {

        data.forEach(e => {
          // console.log(data)
          const receiverid = e.senderid == id ? e.receiverid : e.senderid;
          this.getUsers(receiverid,e.id);



        });

      })
    ).subscribe();
  }

  getUsers(id,chatid){
    this.http.get(this.baseUrl + 'getsingleuser/' + id).pipe(
      map((data: any) => {

      // console.log("chatid",chatid);
      this.chatUser$.pipe(take(1)).subscribe(datas => {

        if (!datas.some((user) => user.id == data.id)) {
          data.chatid = chatid;
          this.chatUser.next([...datas, data])
        }

      })

      //console.log(this.messagedUser)



    })).subscribe();
  }

  stopHubConnection() {
    if (this.socket) {
      this.socket.disconnect();
      this.chatUser.next([])
    }
  }




}
