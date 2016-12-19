import { NavigationSectionComponent } from '../navigation-section/navigation-section.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: 'navigation.component.html',
  styleUrls: ['navigation.component.css'],
  entryComponents: [NavigationSectionComponent]
})
export class NavigationComponent {
@Input() activeLink;
@Output() activeLinkChange = new EventEmitter();
@Input() openTasksCount;

}
