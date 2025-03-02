import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidePublicidadComponent } from './slide-publicidad.component';

describe('SlidePublicidadComponent', () => {
  let component: SlidePublicidadComponent;
  let fixture: ComponentFixture<SlidePublicidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlidePublicidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlidePublicidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
