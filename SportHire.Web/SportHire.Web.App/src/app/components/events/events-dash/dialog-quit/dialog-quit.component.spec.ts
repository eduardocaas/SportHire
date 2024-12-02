import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogQuitComponent } from './dialog-quit.component';

describe('DialogQuitComponent', () => {
  let component: DialogQuitComponent;
  let fixture: ComponentFixture<DialogQuitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogQuitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogQuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
