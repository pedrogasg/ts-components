import {Component, OnInit, Inject, forwardRef} from '@angular/core';
import {ProjectComponent} from '../project/project.component';
import {ActivitiesComponent} from '../../activities';

@Component({
  selector: 'app-project-activities',
  templateUrl: 'project-activities.component.html',
  styleUrls: ['project-activities.component.css'],
  entryComponents: [ActivitiesComponent]
})
export class ProjectActivitiesComponent implements OnInit {

  constructor(@Inject(forwardRef(() => ProjectComponent)) private project) { }

  ngOnInit() {
  }

}
