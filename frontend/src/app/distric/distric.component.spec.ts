import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistricComponent } from './distric.component';

describe('DistricComponent', () => {
  let component: DistricComponent;
  let fixture: ComponentFixture<DistricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistricComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
