import { Pipe, PipeTransform } from '@angular/core';
import * as Moment from 'moment';

@Pipe({
  name: 'calendarTime'
})
export class CalendarTimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value && (value instanceof Date || typeof value === 'number')) {
      return Moment(value).calendar();
    }
  }

}
