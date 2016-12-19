import { ChangeDetectionStrategy, Component, HostBinding, Input, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { CheckboxComponent } from '../../ui';


@Component({
  selector: 'app-task',
  templateUrl: 'task.component.html',
  styleUrls: ['task.component.css'],
  entryComponents: [CheckboxComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent {
  @HostBinding('attr.class') class = 'task';
  @Input() title;
  @Input() @HostBinding('class.task--done') done;
  @Output() taskUpdated = new EventEmitter();
  @Output() taskDeleted = new EventEmitter();
  markDone(checked) {
    this.done = checked;
    this.taskUpdated.next({
      title: this.title,
      done: this.done
    });
  }
  onEditSaved(content) {
    this.title = content;
    this.taskUpdated.next({
      title: this.title,
      done: this.done
    });
  }
  deleteTask() {
    this.taskDeleted.next();
  }
}
