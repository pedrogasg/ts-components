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
  ViewEncapsulation, Inject, forwardRef, OnInit
} from '@angular/core';
import {ProjectComponent} from '../../project';

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

@HostBinding('attr.class') class = 'task-list';


taskFilterList: string[];
selectedTaskFilter: string;
filteredTasks: any[];
  constructor() {
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
    tasks.splice(this.tasks.indexOf(task), 1);
    this.tasksUpdated.next(tasks);
  }
  onTaskUpdated(task, taskData) {
    const tasks = this.tasks.slice();
    tasks.splice(this.tasks.indexOf(task), 1, taskData);
    this.tasksUpdated.next(tasks);
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
   }
}
