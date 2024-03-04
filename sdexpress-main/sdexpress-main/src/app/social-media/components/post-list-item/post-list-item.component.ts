import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostCommentEvent } from '../../models/post-comment-event.model';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

  @Input() post!: Post;
  @Output() postCommented = new EventEmitter<PostCommentEvent>();

  constructor() { }

  ngOnInit(): void {
  }

  onPostCommented(comment: string): void {
    this.postCommented.emit({
      comment,
      postId: this.post.id
    });
  }

}
