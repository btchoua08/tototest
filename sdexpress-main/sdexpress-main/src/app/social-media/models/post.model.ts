import { Comment } from '../../core/models/comment.model';

export class Post {
  id!: number;
  userId!: number;
  title!: string;
  content!: string;
  createdDate!: string;
  imageUrl?: string;
  comments!: Comment[];
}
