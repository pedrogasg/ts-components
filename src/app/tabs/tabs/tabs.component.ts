import {
  Component, ViewEncapsulation, HostBinding,
  Input
} from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.component.html',
  styleUrls: ['tabs.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TabsComponent {
  @Input() items;
  @HostBinding('attr.class') class = 'tabs';
}
