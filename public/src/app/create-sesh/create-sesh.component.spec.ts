import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSeshComponent } from './create-sesh.component';

describe('CreateSeshComponent', () => {
  let component: CreateSeshComponent;
  let fixture: ComponentFixture<CreateSeshComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSeshComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSeshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
