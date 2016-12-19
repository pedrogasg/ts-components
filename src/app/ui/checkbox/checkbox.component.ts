import { Component, Input, Output, EventEmitter, ViewEncapsulation, HostBinding } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: 'checkbox.component.html',
  styleUrls: ['checkbox.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CheckboxComponent {
  @HostBinding('attr.class') class = 'checkbox';
  @Input() label: string;
  @Input() checked: boolean;
  @Output() checkedChange = new EventEmitter();

  onCheckedChange(checked: boolean) {
    this.checkedChange.next(checked);
  }
}
