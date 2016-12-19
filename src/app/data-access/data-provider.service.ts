import { Injectable, NgZone} from '@angular/core';
import { Observable } from 'rxjs';
import PouchDB from 'pouchdb';

@Injectable()
export class DataProvider {
  private db: any;
  private initialized: Promise<any>;
  constructor(private zone: NgZone) {
    let data = [
  {
    _id: 'projects/project-1',
    type: 'project',
    deleted: false,
    title: 'Your first project',
    description: 'This is your first project in the task management' +
     'system you\'re building within the context of the Angular 2 Components book.',
    tasks: [
      {title: 'Task 1', done: false},
      {title: 'Task 2', done: false},
      {title: 'Task 3', done: true},
      {title: 'Task 4', done: false}
    ]
  },
  {
    _id: 'projects/project-2',
    type: 'project',
    deleted: false,
    title: 'Your second project',
    description: 'This is your second project in the task management' +
     'system you\'re building within the context of the Angular 2 Components book.',
    tasks: [
      {title: 'Task A', done: true},
      {title: 'Task B', done: true},
      {title: 'Task C', done: true},
      {title: 'Task D', done: true},
      {title: 'Task E', done: false}
    ]
  }
]

    this.db = new PouchDB('angular-2-components');
    this.initialized = this.db.info().then(info => this.zone.run(() => {
      if (info.doc_count === 0) {
        return Promise.all(data.map(document => this.db.put(document))).then((_) => this.db.info())
    .then(info => {
      console.log(`Successfully initialized database with ${info.doc_count} documents`);
    })
    .catch(error => {
      console.error('Error while inserting initial data. Please evaluate the error message and contact author if the error is persistent.');
      throw error;
    });;
      } else {
        console.log(`Found existing database with ${info.doc_count} documents.`);
      }
    })).catch(error => this.zone.run(() => {
      console.error('Could not initialize database. Please check the browser compatibility notes within the Angular 2 Components book.');
      throw error;
    }));
  }

  getDatabase() {
    return this.initialized.then(() => this.db);
  }

  getChanges(config) {
    return Observable.create((observer) => {
      const changes = this.db.changes(config)
        .on('change', (change) => this.zone.run(() => observer.next(change)))
        .on('error', (error) => this.zone.run(() => observer.error(error)))
        .on('complete', () => this.zone.run(() => observer.complete()));

      return function () {
        changes.cancel();
      };
    });
  }

  getLiveChanges(sinceNow = false) {
    return this.getChanges({ since: sinceNow ? 'now' : 0, live: true, include_docs: true });
  }

  getAllChanges() {
    return this.getChanges({ since: 0, include_docs: true });
  }

  getDocuments(key) {
    return this.initialized.then(() => {
      if (key instanceof Array) {
        const [startKey, endKey] = key;

        return this.db.allDocs({
          include_docs: true,
          attachments: true,
          startkey: startKey,
          endkey: endKey
        }).then(result => this.zone.run(() => result.rows.map(row => row.doc)));

      } else {
        return this.db.get(key).then(result => this.zone.run(() => result));
      }
    });
  }

  createOrUpdateDocument(document) {
    return this.initialized.then(() => {
      return this.db.put(document)
        .then((response) => this.zone.run(() => response))
        .catch(error => this.zone.run(() => { throw error }));
    });
  }
}
