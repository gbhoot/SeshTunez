import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinSeshComponent } from './join-sesh.component';

describe('JoinSeshComponent', () => {
  let component: JoinSeshComponent;
  let fixture: ComponentFixture<JoinSeshComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinSeshComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinSeshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
