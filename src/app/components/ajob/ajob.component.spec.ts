import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjobComponent } from './ajob.component';

describe('AjobComponent', () => {
  let component: AjobComponent;
  let fixture: ComponentFixture<AjobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
