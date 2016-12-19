import { CommonModule }   from '@angular/common';
import { NgModule }       from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { ProjectTasksComponent } from './project-tasks/project-tasks.component';
import { TabsComponent } from '../tabs';
import { ToggleComponent, CheckboxComponent, EditorComponent  } from '../ui';
import { TaskListComponent, TaskComponent, EnterTaskComponent, TaskService } from '../task';
import { CommentsComponent, CommentComponent } from '../comments';
import { FromNowPipe } from '../pipes';
import { ProjectCommentsComponent } from './project-comments/project-comments.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    ProjectComponent,
    TabsComponent,
    TaskListComponent,
    ToggleComponent,
    TaskComponent,
    EnterTaskComponent,
    CheckboxComponent,
    EditorComponent,
    CommentComponent,
    CommentsComponent,
    FromNowPipe,
    ProjectTasksComponent,
    ProjectCommentsComponent
  ],
  providers: [
    TaskService
  ],
})
export class ProjectModule {}
