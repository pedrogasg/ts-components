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
import {ActivityService} from '../../activities';
import { limitWithEllipsis } from '../../utilities/string-utilities';

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
  @Input() activitySubject;
  constructor(private userService: UserService, private activityService: ActivityService) {
  }

  ngOnChanges(changes) {
    if (changes.comments && changes.comments.currentValue === undefined) {
      this.comments = [];
    }
  }

  addNewComment() {
    const comments = this.comments.slice();
    const content = this.newCommentEditor.getEditableContent();
    comments.splice(0, 0, {
      user: this.userService.currentUser,
      time: +new Date(),
      content: content
    });

    this.commentsUpdated.next(comments);

    this.newCommentEditor.setEditableContent('');
    this.activityService.logActivity(
      this.activitySubject.id,
      'comments',
      'New comment was added',
      `The comment "${limitWithEllipsis(content, 30)}" was added to #${this.activitySubject.document.data._id}`
    );
  }

  onCommentEdited(comment, content) {
    const comments = this.comments.slice();
    let oldComment: any, action: string;
    if (content.length === 0) {
      action = 'Comment edited';
      oldComment = comments.splice(comments.indexOf(comment), 1)[0];
    } else {
      action = 'Comment deleted';
      oldComment = comments.splice(comments.indexOf(comment), 1, {
        user: comment.user,
        time: comment.time,
        content
      })[0];
    }
    this.activityService.logActivity(
      this.activitySubject.id,
      'comments',
      action,
      `The comment "${limitWithEllipsis(oldComment.content, 30)}" on #${this.activitySubject.document.data._id} was edited.`
    );
    this.commentsUpdated.next(comments);
  }
}
