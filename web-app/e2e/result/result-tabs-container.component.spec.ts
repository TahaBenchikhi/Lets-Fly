import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultTabsContainerComponent } from './result-tabs-container.component';

describe('ResultTabsContainerComponent', () => {
  let component: ResultTabsContainerComponent;
  let fixture: ComponentFixture<ResultTabsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultTabsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultTabsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
