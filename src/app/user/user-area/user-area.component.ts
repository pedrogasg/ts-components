import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../user-service/user.service';
import { Component, ViewEncapsulation, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-user-area',
  templateUrl: 'user-area.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['user-area.component.css']
})
export class UserAreaComponent {
 @HostBinding('attr.class') class = 'user-area';
 @Input() openTasksCount;
  constructor(private userService: UserService, private domSanitizer: DomSanitizer) { }

}
