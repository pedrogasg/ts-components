import {Component, ViewEncapsulation, HostBinding, Input} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityComponent {
  @HostBinding('attr.class') class = 'activity';
  @Input() activity;
  // Input that should be a string 'left' or 'right' and will determine the activity alignment using CSS
  @Input() alignment;
  @Input() @HostBinding('class.activity--start-mark') startMark;
  @Input() @HostBinding('class.activity--end-mark') endMark;
  constructor(private domSanitizer: DomSanitizer) { }

  isAlignedRight() {
    return this.alignment === 'right';
  }

}
