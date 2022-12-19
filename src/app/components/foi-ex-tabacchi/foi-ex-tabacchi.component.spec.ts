import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoiExTabacchiComponent } from './foi-ex-tabacchi.component';

describe('FoiExTabacchiComponent', () => {
  let component: FoiExTabacchiComponent;
  let fixture: ComponentFixture<FoiExTabacchiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoiExTabacchiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoiExTabacchiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
