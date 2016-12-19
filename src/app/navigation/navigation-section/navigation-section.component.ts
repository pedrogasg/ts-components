import { NavigationItemComponent } from '../navigation-item/navigation-item.component';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navigation-section',
  templateUrl: 'navigation-section.component.html',
  styleUrls: ['navigation-section.component.css'],
  entryComponents: [NavigationItemComponent]
})
export class NavigationSectionComponent{
  @Input() title;
  @Input() items;
}
