import {
  Component, Input, ElementRef, OnChanges, ViewEncapsulation, HostBinding, EventEmitter,
  Output, HostListener
} from '@angular/core';

@Component({
  selector: 'app-activity-slider',
  templateUrl: './activity-slider.component.html',
  styleUrls: ['./activity-slider.component.css'],
  encapsulation: ViewEncapsulation.Native
})
export class ActivitySliderComponent implements OnChanges {
  @Input() activities;
  @Output() selectionChange = new EventEmitter();
  @HostBinding('attr.class') class = 'activity-slider';
  sliderElement: any;
  padding: number;
  timeFirst: number;
  timeLast: number;
  timeSpan: number;
  selection: any;
  ticks: number[];
  modifySelection: boolean;
  constructor(private elementRef: ElementRef) {
    this.sliderElement = elementRef.nativeElement;
    this.padding = 20;
  }

  totalWidth() {
    return this.sliderElement.clientWidth - this.padding * 2;
  }

  projectTime(time) {
    let position = this.padding +
      (time - this.timeFirst) / this.timeSpan * this.totalWidth();
    return Math.floor(position / this.sliderElement.clientWidth * 100);
  }
  ngOnChanges(changes) {
    if (changes.activities && changes.activities.currentValue) {
      const activities = changes.activities.currentValue;
      if (activities.length === 1) {
        this.timeFirst = this.timeLast = activities[0].time;
      } else if (activities.length > 1) {
        this.timeFirst = activities[activities.length - 1].time;
        this.timeLast = activities[0].time;
      } else {
        this.timeFirst = this.timeLast = new Date().getTime();
      }
      this.timeSpan = Math.max(1, this.timeLast - this.timeFirst);
      this.computeTicks();
      this.selection = {
        start: this.timeFirst,
        end: this.timeLast
      };
      this.selectionChange.next(this.selection);
    }
  }
  computeTicks() {
    const count = 5;
    const timeSpanTick = this.timeSpan / count;
    this.ticks = Array.from({length: count}).map((element, index) => {
      return this.timeFirst + timeSpanTick * index;
    });
  }
  projectLength(length) {
    return this.timeFirst + (length - this.padding) / this.totalWidth() * this.timeSpan;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event) {
    this.selection.start = this.selection.end = this.projectLength(event.offsetX);
    this.selectionChange.next(this.selection);
    this.modifySelection = true;
  }
  @HostListener('mousemove', ['$event'])
  onMouseMove(event) {
    if (this.modifySelection) {
      this.selection.end = Math.max(this.selection.start, this.projectLength(event.offsetX));
      this.selectionChange.next(this.selection);
      event.stopPropagation();
      event.preventDefault();
    }
  }

  @HostListener('mouseup')
  onMouseUp() {
    this.modifySelection = false;
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.modifySelection = false;
  }
  @HostListener('dblclick', ['$event'])
  onDoubleClick(event) {
    this.selection = {
      start: this.timeFirst,
      end: this.timeLast
    };
    this.selectionChange.next(this.selection);
    event.stopPropagation();
    event.preventDefault();
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event) {
    event.stopPropagation();
    event.preventDefault();
  }
}
