import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {IPost} from "./posts.interface";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) {
  }

  get(): Observable<IPost[]> {
    return this.http
      .get<IPost[]>('https://jsonplaceholder.typicode.com/posts')
      .pipe(
        catchError(()=>{
          console.log('some error');
          return of([]);
        })
      );
  }
  get2(): Observable<IPost[]> {
    return this.http
      .get<IPost[]>('https://jsonplaceholder.typicode.com/posts')
      .pipe();
  }
}
