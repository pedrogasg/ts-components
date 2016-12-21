import { EnterTaskComponent } from '../enter-task/enter-task.component';
import { ToggleComponent } from '../../ui';
import { TaskComponent } from '../task/task.component';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {ActivityService} from '../../activities';
import { limitWithEllipsis } from '../../utilities/string-utilities';
@Component({
  selector: 'app-task-list',
  templateUrl: 'task-list.component.html',
  styleUrls: ['task-list.component.css'],
  entryComponents: [ToggleComponent, TaskComponent, EnterTaskComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnChanges {
@Input() tasks;
@Output() tasksUpdated = new EventEmitter<any>();
@Input() activitySubject;
@HostBinding('attr.class') class = 'task-list';


taskFilterList: string[];
selectedTaskFilter: string;
filteredTasks: any[];
  constructor(private activityService: ActivityService) {
    this.taskFilterList = ['all', 'open', 'done'];
    this.selectedTaskFilter = 'all';
   }
  getFilteredTasks():  any[] {
    return this.tasks.filter(task => {
      if (this.selectedTaskFilter === 'all') {
        return true;
      } else if (this.selectedTaskFilter === 'open') {
        return !task.done;
      } else {
        return task.done;
      }
    });
  }

  ngOnChanges(changes) {
    if (changes.tasks) {
      this.taskFilterChange(this.selectedTaskFilter);
    }
  }
  onTaskDeleted(task) {
    const tasks = this.tasks.slice();
    let removed =  tasks.splice(this.tasks.indexOf(task), 1)[0];
    this.tasksUpdated.next(tasks);
    this.activityService.logActivity(
      this.activitySubject.id,
      'tasks',
      'A task was deleted',
      `The task "${limitWithEllipsis(removed.title, 30)}" was deleted from ${this.activitySubject.document.data._id}.`
    );
  }
  onTaskUpdated(task, updatedData) {
    const tasks = this.tasks.slice();
    let oldTask = tasks.splice(tasks.indexOf(task), 1, Object.assign({}, task, updatedData))[0];
    console.log(oldTask);
    this.tasksUpdated.next(tasks);
    this.activityService.logActivity(
      this.activitySubject.id,
      'tasks',
      'A task was updated',
      `The task "${limitWithEllipsis(oldTask.title, 30)}" was updated on #${this.activitySubject.document.data._id}.`
    );
  }
  taskFilterChange(filter) {
    this.selectedTaskFilter = filter;
    this.filteredTasks = this.getFilteredTasks();
  }

  addTask(title: string) {
     const tasks = this.tasks.slice();
    tasks.splice(this.tasks.length, 0, {
      title: title,
      done: false
    });
    this.tasksUpdated.next(tasks);
    this.activityService.logActivity(
      this.activitySubject.id,
      'tasks',
      'A task was added',
      `A new task "${limitWithEllipsis(title, 30)}" was added to ${this.activitySubject.document.data._id}.`
    );
   }
}
