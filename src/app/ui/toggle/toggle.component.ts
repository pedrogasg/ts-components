import { Component, OnInit, HostBinding, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: 'toggle.component.html',
  styleUrls: ['toggle.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ToggleComponent implements OnInit {
 @Input() buttonList: string[];
 @Input() selectedButton: string;
 @HostBinding('attr.class') class = 'toogle';
 @Output() selectedButtonChange = new EventEmitter();

  ngOnInit() {
     if (this.selectedButton === undefined) {
      this.selectedButton = this.buttonList[0];
    }
  }

  onButtonActivate(button) {
    this.selectedButton = button;
    this.selectedButtonChange.next(button);
  }
}
