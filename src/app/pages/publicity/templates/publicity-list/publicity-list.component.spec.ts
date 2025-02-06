import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicityListComponent } from './publicity-list.component';

describe('PublicityListComponent', () => {
  let component: PublicityListComponent;
  let fixture: ComponentFixture<PublicityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicityListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
