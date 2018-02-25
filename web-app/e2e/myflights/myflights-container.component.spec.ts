import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyflightsContainerComponent } from './myflights-container.component';

describe('MyflightsContainerComponent', () => {
  let component: MyflightsContainerComponent;
  let fixture: ComponentFixture<MyflightsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyflightsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyflightsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
