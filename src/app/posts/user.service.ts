import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, ReplaySubject} from "rxjs";
import {IUser} from "./posts.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user$ = new ReplaySubject<IUser>(1);
  private _currentUser?:IUser;
  private _user$1 = new BehaviorSubject<IUser|null>(null);

  constructor(private http: HttpClient) {
  }

  get user$(): Observable<IUser> {
    return this._user$.asObservable() as Observable<IUser>;
  }

  getUser(id = 2): Observable<IUser> {
    return this.http.get<IUser>('https://jsonplaceholder.typicode.com/users/' + id)
  }
  login(){
    this.http.get<IUser>('https://jsonplaceholder.typicode.com/users/2')
      .subscribe(user=>{
        this.setUser(user);
      })
  }
  private setUser(user:IUser){
    this._currentUser = user;
    this._user$.next(user);
  }
}
