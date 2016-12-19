import {Component, Inject, forwardRef} from '@angular/core';
import { ProjectComponent } from '../project/project.component';
import {TaskListComponent} from '../../task/';

@Component({
  selector: 'app-project-tasks',
  templateUrl: './project-tasks.component.html',
  styleUrls: ['./project-tasks.component.css'],
  entryComponents: [ TaskListComponent ]
})
export class ProjectTasksComponent {

  constructor(@Inject(forwardRef(() => ProjectComponent)) private project) { }

  updateTasks(tasks) {
    this.project.updateTasks(tasks);
  }
}
