import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarAdDetailsComponent } from './car-ad-details.component';

describe('CarAdDetailsComponent', () => {
  let component: CarAdDetailsComponent;
  let fixture: ComponentFixture<CarAdDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarAdDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarAdDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
