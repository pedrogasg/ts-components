import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnChanges,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: 'editor.component.html',
  styleUrls: ['editor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditorComponent implements OnChanges, AfterViewInit {
@HostBinding('attr.class') class = 'editor';
@Input() @HostBinding('class.editor--edit-mode') editMode;
@Input() showControls;
@Output() editSaved = new EventEmitter();
@Output() editableInput = new EventEmitter();

@Input() content;
@ViewChild('editableContentElement') editableContentElement: HTMLElement;
  constructor(private elementRef: ElementRef) {
  }

  ngOnChanges() {
    if (this.editableContentElement && this.content){
      this.setEditableContent(this.content);
    }
  }
  ngAfterViewInit() {
    this.editableContentElement = this.elementRef.nativeElement.querySelector('.editor__editable-content');
    this.setEditableContent(this.content);
  }

  getEditableContent() {
    return this.editableContentElement.textContent;
  }
  setEditableContent(content) {
    this.editableContentElement.textContent = content;
  }
  @HostListener('click')
  focusEditableContent() {
    if(this.editMode) {
      this.editableContentElement.focus();
    }
  }
  onInput() {
    this.editableInput.next(this.getEditableContent());
  }
  save() {
    this.content = this.getEditableContent();
    this.editSaved.next(this.content);
    this.editMode = false;
  }
  cancel() {
    this.setEditableContent(this.content);
    this.editableInput.next(this.getEditableContent());
    this.editMode = false;
  }
  edit() {
    this.editMode = true;
  }


}
