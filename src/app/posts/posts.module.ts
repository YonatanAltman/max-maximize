import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PostsComponent} from "./posts.component";
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [PostsComponent],
  exports: [
    PostsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class PostsModule { }
