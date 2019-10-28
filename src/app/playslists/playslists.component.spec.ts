import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayslistsComponent } from './playslists.component';

describe('PlayslistsComponent', () => {
  let component: PlayslistsComponent;
  let fixture: ComponentFixture<PlayslistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayslistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayslistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
