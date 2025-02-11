import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsRatingComponent } from './news-rating.component';

describe('NewsRatingComponent', () => {
  let component: NewsRatingComponent;
  let fixture: ComponentFixture<NewsRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsRatingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
