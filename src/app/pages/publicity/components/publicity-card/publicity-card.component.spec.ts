import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicityCardComponent } from './publicity-card.component';

describe('PublicityCardComponent', () => {
  let component: PublicityCardComponent;
  let fixture: ComponentFixture<PublicityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicityCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
