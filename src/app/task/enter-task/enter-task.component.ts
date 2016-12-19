import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-enter-task',
  templateUrl: 'enter-task.component.html',
  styleUrls: ['enter-task.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EnterTaskComponent {
  @Output() taskEntered = new EventEmitter();
  enterTask(titleInput: HTMLInputElement) {
    this.taskEntered.next(titleInput.value);
    titleInput.value = '';
    titleInput.focus();
  }
onKeyDown(event) {
    if (event.keyCode === 13) {
      this.enterTask(event.target);
    }
  }

}
