/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EnterTaskComponent } from './enter-task.component';

describe('EnterTaskComponent', () => {
  let component: EnterTaskComponent;
  let fixture: ComponentFixture<EnterTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
