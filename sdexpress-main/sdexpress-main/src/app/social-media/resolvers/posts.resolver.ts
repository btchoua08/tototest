import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Post } from '../models/post.model';
import { Observable } from 'rxjs';
import { PostsService } from '../services/posts.service';

@Injectable({
  providedIn: 'root'
})
export class PostsResolver implements Resolve<Post[]> {

  constructor(private posts: PostsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post[]> {
    return this.posts.getPosts();
  }
}
