import { TestBed } from '@angular/core/testing';

import { EventService, MockEventService } from './event.service';

describe('EventService', () => {
  let service: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});

describe('MockEventService', () => {
  let mockService: MockEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockEventService]
    });
    mockService = TestBed.inject(MockEventService);
  });

  it('should be created', () => {
    expect(mockService).toBeTruthy();
  });
});
