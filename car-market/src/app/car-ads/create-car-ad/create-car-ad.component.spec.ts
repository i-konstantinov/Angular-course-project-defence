import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCarAdComponent } from './create-car-ad.component';

describe('CreateCarAdComponent', () => {
  let component: CreateCarAdComponent;
  let fixture: ComponentFixture<CreateCarAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCarAdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCarAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
