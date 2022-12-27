import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {label} from "./posts.const";
import {PostsService} from "./posts.service";
import {IPost, IUser} from "./posts.interface";
import {UserService} from "./user.service";
import {combineLatest, delay, map, Observable, switchMap, tap} from "rxjs";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsComponent implements OnInit, AfterViewInit, OnDestroy {
  state: 'close' | 'open' = 'close';
  user$: Observable<IUser>;
  data$: Observable<{
    user: IUser,
    post1: IPost[],
    post2: IPost[],
  }>;

  // can't use because I need the user first
  // posts: IPost[] = [];

  readonly label = label;

  constructor(private postsService: PostsService,
              private userService: UserService,
              // private cdr: ChangeDetectorRef
  ) {
    this.user$ = this.getUser();
    this.data$ = this.user$.pipe(
      delay(3000), // just for mock server call
      switchMap((user: IUser) => {
        console.log(user);
        return combineLatest([
          this.getAllPosts(user.id),
          this.getAllPosts(user.id),
        ]).pipe(
          map(([value1, value2]: [IPost[], IPost[]]) => {
            return {
              user,
              post1: value1,
              post2: value2,
            };
          }),
          tap(() => {
            console.log('do something')
          })
        )
      })
    )
  }

  ngOnInit(): void {
    this.getUser();
    this.getAllPosts(2);

    this.userService.user$.subscribe(user => {
      console.log('Yonatan is here', user.username);
    })
    setTimeout(() => {
      this.userService.login();

    }, 2000)
    // this.user$ =
  }

  toggleState(): void {
    this.state = this.state === 'open' ? 'close' : 'open';
  }

  private getUser(): Observable<IUser> {
    return this.userService.getUser(2);
  }

  private getAllPosts(id: number) {
    return this.postsService.get()
    //   .subscribe(value => {
    //   this.posts = value;
    //   this.cdr.markForCheck();
    // })
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
  }


}
