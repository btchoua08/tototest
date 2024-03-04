import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { map, Observable } from 'rxjs';
import { Post } from '../../models/post.model';
import { ActivatedRoute, ResolveData } from '@angular/router';
import { PostCommentEvent } from '../../models/post-comment-event.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts$!: Observable<Post[]>

  constructor(private posts: PostsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initPostsObservable();
  }

  initPostsObservable() {
    this.posts$ = this.route.data.pipe(
      map((data: ResolveData) => data['posts'])
    )
  }

  onPostCommented(event: PostCommentEvent) {
    console.log(event);
  }

}
