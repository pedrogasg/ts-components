import {Component, OnInit, forwardRef, Inject} from '@angular/core';
import {ProjectComponent} from '../project/project.component';

@Component({
  selector: 'app-project-comments',
  templateUrl: './project-comments.component.html',
  styleUrls: ['./project-comments.component.css']
})
export class ProjectCommentsComponent {

  constructor(@Inject(forwardRef(() => ProjectComponent)) private project) { }
  updateComments(comments) {
    this.project.updateComments(comments);
  }
}
