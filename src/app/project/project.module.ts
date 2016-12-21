import { CommonModule }   from '@angular/common';
import { NgModule }       from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { ProjectTasksComponent } from './project-tasks/project-tasks.component';
import { TabsComponent } from '../tabs';
import { ToggleComponent, CheckboxComponent, EditorComponent  } from '../ui';
import { TaskListComponent, TaskComponent, EnterTaskComponent, TaskService } from '../task';
import { CommentsComponent, CommentComponent } from '../comments';
import { FromNowPipe, CalendarTimePipe } from '../pipes';
import { ProjectCommentsComponent } from './project-comments/project-comments.component';
import { ProjectActivitiesComponent } from './project-activities/project-activities.component';
import { ActivitiesComponent, ActivityService, ActivitySliderComponent, ActivityComponent } from '../activities';


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
    CalendarTimePipe,
    ProjectTasksComponent,
    ProjectCommentsComponent,
    ProjectActivitiesComponent,
    ActivitiesComponent,
    ActivitySliderComponent,
    ActivityComponent
  ],
  providers: [
    TaskService,
    ActivityService
  ],
})
export class ProjectModule {}
