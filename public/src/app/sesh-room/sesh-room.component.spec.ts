import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeshRoomComponent } from './sesh-room.component';

describe('SeshRoomComponent', () => {
  let component: SeshRoomComponent;
  let fixture: ComponentFixture<SeshRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeshRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeshRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
