import { UserService } from '../../user';
import { CommentComponent } from '../comment/comment.component';
import { EditorComponent } from '../../ui';
import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: 'comments.component.html',
  styleUrls: ['comments.component.css'],
  entryComponents: [CommentComponent, EditorComponent]
})
export class CommentsComponent implements OnChanges {
  @HostBinding('attr.class') class = 'comments';
  @Output() commentsUpdated = new EventEmitter();
  @ViewChild(EditorComponent) newCommentEditor;
  @Input() comments: any[];
  constructor(private userService: UserService) {
  }

  ngOnChanges(changes) {
    if (changes.comments && changes.comments.currentValue === undefined) {
      this.comments = [];
    }
  }

  addNewComment() {
    const comments = this.comments.slice();
    comments.splice(0, 0, {
      user: this.userService.currentUser,
      time: +new Date(),
      content: this.newCommentEditor.getEditableContent()
    });

    this.commentsUpdated.next(comments);

    this.newCommentEditor.setEditableContent('');
  }

  onCommentEdited(comment, content) {
    const comments = this.comments.slice();

    if (content.length === 0) {
      comments.splice(comments.indexOf(comment), 1);
    } else {

      comments.splice(comments.indexOf(comment), 1, {
        user: comment.user,
        time: comment.time,
        content
      });
    }

    this.commentsUpdated.next(comments);
  }
}
