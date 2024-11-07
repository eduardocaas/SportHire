import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsDashComponent } from './events-dash.component';

describe('EventsDashComponent', () => {
  let component: EventsDashComponent;
  let fixture: ComponentFixture<EventsDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventsDashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventsDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
