import { Subscription } from 'rxjs/Rx';
import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { DataProvider } from './data-access/data-provider.service';
class LinkConverter {
  static getIdFromLink(link) {
    return link.slice(1);
  }

  static getItemModelFromProject(project) {
    if (project) {
      let link = project._id.split('/');
      link[0] = '/' + link[0];
      return {
        title: project.title,
        link: link
      };
    } else {
      return {
        title: '',
        link: '#'
      };
    }
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnDestroy {
  projectSubscription: Subscription;
  projects: any[];
  selectedProjectIndex: number;
  constructor(private dataProvider: DataProvider) {
    this.selectedProjectIndex = 0;
    this.projects = [];
    this.projectSubscription = this.dataProvider.getLiveChanges()

      .map((change) => change.doc)

      .filter((document) => document.type === 'project')

      .subscribe((changedProject) => {

        const projectIndex = this.projects.findIndex((project) => project._id === changedProject._id);
        if (projectIndex === -1) {
          this.projects.push(changedProject);
        } else {
          this.projects.splice(projectIndex, 1, changedProject);
        }
        this.projects.sort((a, b) => a.title > b.title ? 1 : a.title < b.title ? -1 : 0);
      });

  }
getProjectNavigationItems() {
    return this.projects.filter((project) => !project.deleted)
      .map((project) => LinkConverter.getItemModelFromProject(project));
  }
  getSelectedProjectLink() {
    return LinkConverter.getItemModelFromProject(this.getSelectedProject()).link;
  }
   getSelectedProject() {
    return this.projects[this.selectedProjectIndex];
  }
  getOpenTasksCount() {
    return this.projects.reduce((count, project) => count + project.tasks.filter((task) => !task.done).length, 0);
  }
  updateSelectedProject(projectData) {
    const selectedProject = this.getSelectedProject();
    Object.assign(selectedProject, projectData);
    this.dataProvider.createOrUpdateDocument(selectedProject);
  }
  projectNavigationItems() {
    return this.projects
          // We first filter for projects that are not deleted
          .filter((project) => !project.deleted)
          .map((project) => {
            return LinkConverter.getItemModelFromProject(project);
          });
  }
  selectProjectByLink(link) {
    this.selectedProjectIndex = this.projects.findIndex((project) => project._id === LinkConverter.getIdFromLink(link));
  }
  ngOnDestroy() {
    this.projectSubscription.unsubscribe();
  }
}
