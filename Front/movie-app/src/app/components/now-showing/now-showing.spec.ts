import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NowShowing } from './now-showing';

describe('NowShowing', () => {
  let component: NowShowing;
  let fixture: ComponentFixture<NowShowing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NowShowing],
    }).compileComponents();

    fixture = TestBed.createComponent(NowShowing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
