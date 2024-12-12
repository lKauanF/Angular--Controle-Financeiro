import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarrarolarComponent } from './barrarolar.component';

describe('BarrarolarComponent', () => {
  let component: BarrarolarComponent;
  let fixture: ComponentFixture<BarrarolarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarrarolarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarrarolarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
