import { DomSanitizer } from '@angular/platform-browser';
import { EditorComponent } from '../../ui';
import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: 'comment.component.html',
  styleUrls: ['comment.component.css'],
  entryComponents: [EditorComponent]
})
export class CommentComponent {
  @HostBinding('attr.class') class = 'comment';
  @Input() time;

  @Input() user;

  @Input() content;

  @Output() commentEdited = new EventEmitter();

  constructor(private domSanitizer: DomSanitizer) {
  }
  onEditSaved(content) {
    this.commentEdited.next(content);
  }

}
