import { AccountService } from './account.service';
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

  private url = environment.socketUrl;

  baseUrl = environment.apiUrl;

  private isOnline = new BehaviorSubject<Online[]>([]);
  isOnline$ = this.isOnline.asObservable();

  public chatUser = new BehaviorSubject<Conversation[]>([]);
  chatUser$ = this.chatUser.asObservable();

  public fchatUser = new BehaviorSubject<Conversation[]>([]);
  fchatUser$ = this.fchatUser.asObservable();

  public userMessage = new BehaviorSubject<Message[]>([]);
  userMessage$ = this.userMessage.asObservable();

  constructor(private http: HttpClient,private router: Router,private accountService: AccountService) { }

  activechat : number = null

  createHubConnection(userId) {

    this.socket = io(this.url, {transports: ['websocket', 'polling', 'flashsocket']});
    this.socket.emit("new-user-add", userId);


    this.socket.on("get-users", (users) => {
      this.isOnline.next(users);
      //console.log("isOnline", this.isOnline);
    });

    this.socket.on("recieve-message", (data) => {


      console.log("recieve-message",data);


      this.userMessage$.pipe(take(1)).subscribe(datas => {

       if (datas.some((msg) => msg.chatid == data.chatid)) {
          this.userMessage.next([...datas, data])
       }
      })
      this.chatUser$.pipe(take(1)).subscribe(datas => {
        var index = datas.findIndex(x => x.chatid == data.chatid);
        // console.log("this.activechat load",this.activechat );
        if(index !== -1 && this.activechat !== data.chatid){
          datas[index].date = data.date;
          datas[index].unread++;
        }
        const newdata = datas.sort(
        (objA, objB) => Math.floor(new Date(objB.date).getTime()/ 1000) - Math.floor(new Date(objA.date).getTime()/ 1000),
        );
        this.chatUser.next(newdata)
      })

      if(this.activechat == data.chatid){
        this.http.post(this.baseUrl + 'makezero', {chatid:data.chatid,userid:userId}).subscribe();
      }

       //console.log("recieve-message",data);
    });
    this.socket.on("chat-get", (data) => {
       this.chatUser$.pipe(take(1)).subscribe(datas => {
        var index = datas.findIndex(x => x.chatid == data.chatid);
        if(index !== -1 ){
          datas[index].date = data.date;
        }
        else{
          console.log(data);
          this.getUsers(data.senderid,data.chatid,data.date,0,1);
        }
        // const newdata = datas.sort(
        // (objA, objB) => Math.floor(new Date(objB.date).getTime()/ 1000) - Math.floor(new Date(objA.date).getTime()/ 1000),
        // );

        // this.chatUser.next(newdata)

      })
    });

  }


  sendmsg(model,receiverId){

    console.log("receiverId",receiverId)

      this.http.post(this.baseUrl + 'createmessege/',model ).pipe(
        map((data: any) => {
            this.userMessage$.pipe(take(1)).subscribe(datas => {
                this.userMessage.next([...datas, data])
                this.socket.emit("send-message", {...data,receiverId});
                this.socket.emit("chat-send", {...data,receiverId});
            });

            // this.chatUser$.pipe(take(1)).subscribe(datas => {
            //   var index = datas.findIndex(x => x.chatid == model.chatid);
            //   if(index !== -1){
            //     datas[index].date = data.date;
            //   }
            //   const newdata = datas.sort(
            //   (objA, objB) => Math.floor(new Date(objB.date).getTime()/ 1000) - Math.floor(new Date(objA.date).getTime()/ 1000),
            //   );
            //   this.chatUser.next(newdata);
            // })
        })
      ).subscribe();


  }

  nullmessage(){
    this.userMessage.next([]);
  }

  async loadmessage(chatid,userid,page = 1){
    console.log("message load-----");
    this.userMessage.next([]);
    this.activechat = chatid;

    return this.http.get(this.baseUrl + 'getmessages/' + chatid + '/' + userid + '/' + page).pipe(
      map((data: Message[]) => {

        const newdata = [...data].sort((a, b) => a.id - b.id);

          if(page == 1){
            newdata.forEach( e => {
              this.userMessage$.pipe(take(1)).subscribe(datas => {
              this.userMessage.next([...datas,e]);
            });
            });
          }else{
            newdata.forEach( e => {
              this.userMessage$.pipe(take(1)).subscribe(datas => {
              this.userMessage.next([e,...datas]);
            });
            });
          }

        this.chatUser$.pipe(take(1)).subscribe(datas => {
          var index = datas.findIndex(x => x.chatid == chatid);
          // console.log(data);
          if(index !== -1){
            datas[index].unread = 0;
          }
        })

        return data;
      })
    ).subscribe();
  }

  ploadmessage(chatid,userid,page){
    this.activechat = chatid;
    return this.http.get(this.baseUrl + 'getmessages/' + chatid + '/' + userid + '/' + page).pipe(
      map((data: Message[]) => {

        const newdata = [...data].sort((a, b) => a.id - b.id);

          if(page == 1){
            newdata.forEach( e => {
              this.userMessage$.pipe(take(1)).subscribe(datas => {
              this.userMessage.next([...datas,e]);
            });
            });
          }else{
            newdata.forEach( e => {
              this.userMessage$.pipe(take(1)).subscribe(datas => {
              this.userMessage.next([e,...datas]);
            });
            });
          }

        this.chatUser$.pipe(take(1)).subscribe(datas => {
          var index = datas.findIndex(x => x.chatid == chatid);
          // console.log(data);
          if(index !== -1){
            datas[index].unread = 0;
          }
        })

        return data;

      })
    );
  }


  // isUserOnline(id){
  //   var  online = false;
  //   this.isOnline$.subscribe( x => {
  //     online = x.find((user) => user.userId == id) ? true : false ;
  //   });
  //   return online;
  // }

  flagchat(model){
    console.log(model);
    return this.http.post(this.baseUrl + 'flagchat/',model ).pipe(
      map((data: any) => {

        console.log("flagdata",data);

        if(data.flaged == true){
          this.chatUser$.pipe(take(1)).subscribe(datas => {
            var index = datas.findIndex(x => x.chatid == model.chatid);
            if(index !== -1){
              datas[index].flag = 1;
            }
          })
          this.fchatUser$.pipe(take(1)).subscribe(datas => {
            var index = datas.findIndex(x => x.chatid == model.chatid);
            if(index !== -1){
              datas[index].flag = 1;
            }
          })
        }

      })
    ).subscribe();;
  }

  unflagchat(model){
    console.log(model);
    return this.http.post(this.baseUrl + 'unflagchat/',model ).pipe(
      map((data: any) => {

        console.log("unflaged",data);

        if(data.unflaged == true){
          this.chatUser$.pipe(take(1)).subscribe(datas => {
            var index = datas.findIndex(x => x.chatid == model.chatid);
            if(index !== -1){
              datas[index].flag = 0;
            }
          });
          this.fchatUser$.pipe(take(1)).subscribe(datas => {
            var index = datas.findIndex(x => x.chatid == model.chatid);
            if(index !== -1){
              datas[index].flag = 0;
            }
          })
        }

      })
    ).subscribe();;
  }


  createchat(model){
    //console.log(model);
    return this.http.post(this.baseUrl + 'createchat/',model ).pipe(
      map((data: any) => {

        // const newdata = [...data].sort((a, b) => a.id - b.id);

        // this.userMessage.next(newdata);
        //console.log(data,"data")
        return data;

      })
    );
  }

  haschat(model){
    return this.http.post<any>(this.baseUrl + 'haschat/',model );
  }

  //getting conversition
  getConversation(id,page = 1){
    this.chatUser.next([])
    this.http.get(this.baseUrl + 'getchats/' + id + '/' + page).pipe(
      map((data: any) => {
       console.log("chat---",data);
        data.forEach(e => {
          const receiverid = e.senderid == id ? e.receiverid : e.senderid;

          this.getUsers(receiverid,e.id,e.date,e.flag,e.unread);
        });

      })
    ).subscribe();
  }

  pgetConversation(id,page){
    return this.http.get(this.baseUrl + 'getchats/' + id + '/' + page).pipe(
      map((data: any) => {
        data.forEach(e => {
          const receiverid = e.senderid == id ? e.receiverid : e.senderid;

          this.getUsers(receiverid,e.id,e.date,e.flag,e.unread);
        });

        return data;
      })
    );
  }

  getflagConversation(id,page = 1){
    console.log("getting flag chats.........");
    this.fchatUser.next([])
    this.http.get(this.baseUrl + 'getflagchats/' + id + '/' + page).pipe(
      map((data: any) => {
        console.log("fchat---",data);
        console.log("getting flag chats.........",data);

        data.forEach(e => {
          const receiverid = e.senderid == id ? e.receiverid : e.senderid;
          this.fgetUsers(receiverid,e.id,e.date,e.flag,e.unread);
        });
      })
    ).subscribe();
  }
  pgetflagConversation(id,page = 1){
    return this.http.get(this.baseUrl + 'getflagchats/' + id + '/' + page).pipe(
      map((data: any) => {
        data.forEach(e => {
          const receiverid = e.senderid == id ? e.receiverid : e.senderid;
          this.fgetUsers(receiverid,e.id,e.date,e.flag,e.unread);
        });

        return data;
      })
    );
  }

  getUsers(id,chatid,date,flag,unread){
    this.http.get(this.baseUrl + 'getsingleuser/' + id).pipe(
      map((data: any) => {
      this.chatUser$.pipe(take(1)).subscribe(datas => {
        if (!datas.some((user) => user?.id == data?.id)) {
          data.chatid = chatid;
          data.date = date;
          data.flag = flag;
          data.unread = unread;
          data.date = date;
          this.chatUser.next([...datas, data])
        }
      })

      this.chatUser$.pipe(take(1)).subscribe(datas => {

          const newdata = datas.sort(
            (objA, objB) => Math.floor(new Date(objB.date).getTime()/ 1000) - Math.floor(new Date(objA.date).getTime()/ 1000),
            );

          this.chatUser.next(newdata)

          // datas.forEach( res =>{
          //   console.log("name",res.name,"asasas", new Date(res.date).getSeconds());
          // });

      })

    })).subscribe();
  }

  //flaged user getting
  fgetUsers(id,chatid,date,flag,unread){
    this.http.get(this.baseUrl + 'getsingleuser/' + id).pipe(
      map((data: any) => {
      this.fchatUser$.pipe(take(1)).subscribe(datas => {
        if (!datas.some((user) => user?.id == data?.id)) {
          data.chatid = chatid;
          data.date = date;
          data.flag = flag;
          data.unread = unread;
          data.date = date;
          this.fchatUser.next([...datas, data])
        }
      })

      this.fchatUser$.pipe(take(1)).subscribe(datas => {

          const newdata = datas.sort(
            (objA, objB) => Math.floor(new Date(objB.date).getTime()/ 1000) - Math.floor(new Date(objA.date).getTime()/ 1000),
            );

          this.fchatUser.next(newdata)

          // datas.forEach( res =>{
          //   console.log("name",res.name,"asasas", new Date(res.date).getSeconds());
          // });

      })

    })).subscribe();
  }





  getChatUsers(id){
    return this.http.get(this.baseUrl + 'getsingleuser/' + id);
  }

  stopHubConnection() {
    if (this.socket) {
      this.socket.disconnect();
      this.chatUser.next([])
    }
  }




}
