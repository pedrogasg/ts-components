import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent, ProjectTasksComponent, ProjectCommentsComponent, ProjectActivitiesComponent } from './project';

const appRoutes: Routes = [
  { path: '', redirectTo: '/projects/project-1',  pathMatch: 'full' },
  {
    path: 'projects',
    children: [
      {
        path: ':projectId',
        component: ProjectComponent,
        children: [
          { path: '',  component: ProjectTasksComponent },
          { path: 'tasks',  component: ProjectTasksComponent },
          { path: 'comments', component: ProjectCommentsComponent },
          { path: 'activities', component: ProjectActivitiesComponent }
        ]
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
