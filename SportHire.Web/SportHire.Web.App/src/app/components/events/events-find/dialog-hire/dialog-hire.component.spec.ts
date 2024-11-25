import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHireComponent } from './dialog-hire.component';

describe('DialogHireComponent', () => {
  let component: DialogHireComponent;
  let fixture: ComponentFixture<DialogHireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogHireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogHireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
