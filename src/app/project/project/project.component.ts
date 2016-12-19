import { ReplaySubject } from 'rxjs';
import { DataProvider } from '../../data-access/data-provider.service';
import 'rxjs/add/operator/switchMap';
import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

class LiveDocument {
  data: any;
  change: ReplaySubject<any>;

  subscription?: any;
  constructor(private dataProvider: DataProvider) {
    this.dataProvider = dataProvider;
    this.data = {};
    this.change = new ReplaySubject(1);
  }
  newQuery(query) {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.dataProvider.getLiveChanges()
      .map((change) => change.doc)
      .filter((document) => Object.keys(query).every((property) => document[property] === query[property]))
      .subscribe((data) => {
        this.data = data;
        this.change.next(data);
      });
      return this.subscription;
  }
  unsubscribe() {
    this.subscription.unsubscribe();
  }

  persist() {
    if (this.data) {
      this.dataProvider.createOrUpdateDocument(this.data);
    }
  }
}

@Component({
  selector: 'app-project',
  templateUrl: 'project.component.html',
  styleUrls: ['project.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ProjectComponent implements OnInit, OnDestroy {
  title;
  description;
  tasks;
  comments;
  tabItems: any[];
  @HostBinding('attr.class') class = 'project';
  document: LiveDocument;
  constructor(private dataProvider: DataProvider, private route: ActivatedRoute) {
    this.document = new LiveDocument(this.dataProvider);
    this.tasks = [];
    this.comments = [];
    this.route.params.subscribe(params => {
      this.document.newQuery({
        type: 'project',
        _id: 'projects/' + params['projectId']
      });
    });
    this.document.change.subscribe((data) => {
      this.title = data.title;
      this.description = data.description;
      this.tasks = data.tasks;
      this.comments = data.comments;
    });
    this.tabItems = [
      {title: 'Tasks', link: 'tasks'},
      {title: 'Comments', link: 'comments'}
    ];
  }
  ngOnInit() {
    this.route.params
    .switchMap((params: Params) => {
      console.log(params);
      return this.document.newQuery({
        type: 'project',
        _id: params['projectId']
      });
    });
  }

  updateTasks(tasks) {
    this.document.data.tasks = tasks;
    this.document.persist();
  }
  updateComments(comments) {
    this.document.data.comments = comments;
    this.document.persist();
  }
  ngOnDestroy() {
    this.document.unsubscribe();
  }
}
