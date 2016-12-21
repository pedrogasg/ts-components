import { Injectable } from '@angular/core';
import {DataProvider} from '../../data-access/data-provider.service';
import {UserService} from '../../user';
import {ReplaySubject} from 'rxjs';

@Injectable()
export class ActivityService {
  activities: any[];
  activitiesSubscription: any;
  change: ReplaySubject<any>;
  constructor(private dataProvider: DataProvider, private userService: UserService) {
    this.activities = [];
    this.change = new ReplaySubject(1);
    this.activitiesSubscription = this.dataProvider.getLiveChanges()
      .map((change) => change.doc)
      .filter((document) => document.type === 'activity')
      .subscribe((changedActivity) => {
        this.activities.push(changedActivity);
        this.activities.sort((a, b) => a.time > b.time ? -1 : a.time < b.time ? 1 : 0);
        this.change.next(this.activities);
      });
  }
  logActivity(subject, category, title, message) {
    this.dataProvider.createOrUpdateDocument({
      type: 'activity',
      user: this.userService.currentUser,
      time: new Date().getTime(),
      subject: subject,
      category: category,
      title: title,
      message: message
    });
  }
}
