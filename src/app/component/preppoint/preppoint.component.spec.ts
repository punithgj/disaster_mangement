import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreppointComponent } from './preppoint.component';

describe('PreppointComponent', () => {
  let component: PreppointComponent;
  let fixture: ComponentFixture<PreppointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreppointComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreppointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
