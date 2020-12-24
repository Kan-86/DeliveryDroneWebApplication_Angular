import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDataComponent } from './dialog-data.component';

describe('DialogDataComponent', () => {
  let component: DialogDataComponent;
  let fixture: ComponentFixture<DialogDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
