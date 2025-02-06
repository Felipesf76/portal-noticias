import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificationsListComponent } from './califications-list.component';

describe('CalificationsListComponent', () => {
  let component: CalificationsListComponent;
  let fixture: ComponentFixture<CalificationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalificationsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalificationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
