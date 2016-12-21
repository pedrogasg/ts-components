import {Component, OnChanges, Input, HostBinding, OnDestroy} from '@angular/core';
import {ActivityService} from '../activity-service/activity.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnChanges, OnDestroy {
  @HostBinding('attr.class') class = 'activities';
  @Input() activitySubject;
  activitiesChangeSubscription: Subscription;
  activities: any[];
  selectedActivities: any[];
  selection: any;
  constructor(private activityService: ActivityService) { }

  ngOnChanges(changes) {
    if (changes.activitySubject){
      if (this.activitiesChangeSubscription){
        this.activitiesChangeSubscription.unsubscribe();
      }
      this.activitiesChangeSubscription = this.activityService.change.subscribe((activities) => {
        this.activities = activities.filter((activity) => activity.subject === this.activitySubject._id);
        this.onSelectionChange();
      });
    }
  }

  onSelectionChange(selection = this.selection) {
    this.selection = selection;
    // Store filtered activities that fall into the date range selection specified by the slider
    this.selectedActivities = this.selection ? this.activities.filter(
      (activity) => activity.time >= this.selection.start && activity.time <= this.selection.end
    ) : this.activities;
  }

  getAlignment(index) {
    return index % 2 === 0 ? 'left' : 'right';
  }

  isFirst(index) {
    return index === 0;
  }

  isLast(index) {
    return index === this.selectedActivities.length - 1;
  }
  ngOnDestroy() {
    this.activitiesChangeSubscription.unsubscribe();
  }

}
