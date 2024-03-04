import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { Comment } from '../../../core/models/comment.model';
import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [
    trigger('listItem', [
      state('default', style({
        transform: 'scale(1)',
        backgroundColor: 'white',
        zIndex: 1
      })),
      state('raised', style({
        transform: 'scale(1.05)',
        backgroundColor: 'rgb(201, 157, 242)',
        zIndex: 2
      })),
      state('delete', style({
        transform: 'scale(1.05)',
        backgroundColor: 'rgb(255, 77, 77)',
        zIndex: 2
      })),
      state('deleted', style({
        transform: 'translateX(100%)',
        opacity: 0
      })),
      transition('default => raised', [
        animate('100ms ease-in-out')
      ]),
      transition('raised => default', [
        animate('500ms ease-in-out')
      ]),
      transition('* => delete', [
        animate('2000ms ease-in-out')
      ]),
      transition('delete => *', [
        animate('200ms')
      ]),
      transition(':enter', [
        style({
          transform: 'translateX(-100%)',
          opacity: 0,
          backgroundColor: 'rgb(201, 157, 242)'
        }),
        animate('250ms ease-out', style({
          transform: 'translateX(0)',
          opacity: 1,
          backgroundColor: 'white',
        }))
      ])
    ])
  ]
})
export class CommentsComponent implements OnInit {

  commentCtrl!: UntypedFormControl;
  @Input() comments!: Comment[];
  @Output() commentSubmitted = new EventEmitter<string>();
  raisedIndex = -1;
  animationStatuses: { [key: number]: 'raised' | 'default' | 'delete' | 'deleted' } = {};
  deleteTimer!: number;

  constructor(private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.initFormControl();
    this.setAnimationStatuses();
  }

  setAnimationStatuses() {
    for (let i in this.comments) {
      this.animationStatuses[i] = 'default';
    }
  }

  initFormControl() {
    this.commentCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(10)]);
  }

  createComment(commentText: string): Comment {
    const newId = [...this.comments].sort((a, b) => a.id - b.id)[this.comments.length -1].id + 1;
    return {
      id: newId,
      comment: commentText,
      createdDate: new Date().toISOString(),
      userId: 1
    };
  }

  onLeaveComment(): void {
    if (this.commentCtrl.invalid) {
      return;
    }
    this.comments.unshift(this.createComment(this.commentCtrl.value));
    this.commentSubmitted.emit(this.commentCtrl.value);
    this.commentCtrl.reset();
  }

  onMouseEnterComment(index: number) {
    this.animationStatuses[index] = 'raised';
  }

  onMouseLeaveComment(index: number) {
    this.animationStatuses[index] = 'default';
  }

  getFormError(): string {
    if (this.commentCtrl.hasError('required')) {
      return 'Vous devez écrire quelque chose !'
    } else if (this.commentCtrl.hasError('minlength')) {
      return 'Votre commentaire doit faire au moins 10 caractères.'
    } else {
      return 'Erreur inconnue !';
    }
  }

  deleteComment(index: number) {
    this.comments.splice(index, 1);
  }

  startDeleteComment(index: number) {
    this.animationStatuses[index] = 'delete';
   /* this.deleteTimer = setTimeout(() => {
      this.animationStatuses[index] = 'deleted';
    }, 2000);**/
  }

  stopDeleteComment(index: number) {
    if (this.animationStatuses[index] === 'delete') {
      this.animationStatuses[index] = 'raised';
      //clearTimeout(this.deleteTimer);
    }
  }

  onDeletedAnimationEnd(animationEvent: AnimationEvent, index: number) {
    if (animationEvent.toState !== 'deleted') {
      return;
    }
    this.deleteComment(index);
    this.setAnimationStatuses();
  }
}
