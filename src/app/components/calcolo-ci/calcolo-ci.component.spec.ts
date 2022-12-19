import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcoloCIComponent } from './calcolo-ci.component';

describe('CalcoloCIComponent', () => {
  let component: CalcoloCIComponent;
  let fixture: ComponentFixture<CalcoloCIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcoloCIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalcoloCIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
